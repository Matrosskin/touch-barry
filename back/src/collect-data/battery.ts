import child_process from 'child_process'
import { store } from '../store';
import { setBattery } from '../../shared/slices/dataToShow';
import { BatteryState, isBatteryState } from '../../shared/constants/BatteryState';

let batteryDeviceId: string | undefined

const Commands = {
  POWER_DEVICES: 'upower -e',
  POWER_DEVICE_INFO: (deviceId = batteryDeviceId) => {
    if (!deviceId) throw new Error('Devide id was not provided.');

    return `upower -i ${deviceId}`
  },
  WATCH_UPDATES: ['upower', ['--monitor']] as [string, string[]]
}

const batteryRegExp = /battery/img
const stateRegExp = /state:/img
const timeToRegExp = /(fully-charged|time to empty:|time to full:)/img
const percentageRegExp = /percentage:/img

function isDeviceCompatible(deviceInfo: string): boolean {
  return (
    batteryRegExp.test(deviceInfo) &&
    stateRegExp.test(deviceInfo) && // state: charging, discharging, fully-charged
    timeToRegExp.test(deviceInfo) &&
    percentageRegExp.test(deviceInfo)
  )
}

function debounce(func: () => void, timeout = 100){
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, timeout);
  };
}

const handleUpdatedStatus = debounce(() => {
  const deviceInfoBuff = child_process.execSync(Commands.POWER_DEVICE_INFO())
  const deviceInfo = deviceInfoBuff.toString('utf-8').split('\n')
  const state = deviceInfo.find((line) => stateRegExp.test(line))!.replace(stateRegExp, '').trim()
  const percentage = deviceInfo.find((line) => percentageRegExp.test(line))!.replace(percentageRegExp, '').trim().replace('%', '')

  if (!isBatteryState(state)) {
    throw new Error('Unknown battery state value.');
  }
  store.dispatch(setBattery({ state, percentage: parseFloat(percentage) }))
})

export function monitorBattery() {
  const listOfPowerDevicesBuff = child_process.execSync(Commands.POWER_DEVICES)
  batteryDeviceId = listOfPowerDevicesBuff
    .toString('utf-8')
    .split('\n')
    .find((deviceId) => {
      if (!deviceId) return false

      const deviceInfoBuff = child_process.execSync(Commands.POWER_DEVICE_INFO(deviceId))
      if (!isDeviceCompatible(deviceInfoBuff.toString('utf-8'))) return false

      return true
    })

  if (!batteryDeviceId) {
    throw new Error('Battery device was not found.')
  }

  handleUpdatedStatus()

  const batteryWatcher = child_process.spawn(...Commands.WATCH_UPDATES)
  batteryWatcher.stdout.on('data', (updatedDevicesBuff: Buffer) => {
    const updatedDevices = updatedDevicesBuff.toString('utf8')
    const isBatteryInfoChanged = new RegExp(batteryDeviceId!, 'igm').test(updatedDevices)
    if (!isBatteryInfoChanged) {
      return
    }

    handleUpdatedStatus()
  })
}
