import os from 'os'
import globalVars from '../global-vars'

const MEASURE_INTERVAL = 1500 // msec
const INTERVAL_TO_SHOW = 60 * 1000
const MAX_USAGE_HISTORY = Math.round(INTERVAL_TO_SHOW / MEASURE_INTERVAL)

export const monitorCpuUsage = () => {
  const cores = os.cpus()
  globalVars.dataToShow.cpu.amountOfCores = cores.length
  globalVars.dataToShow.cpu.usage = new Array(MAX_USAGE_HISTORY).fill([])

  let cpus0: any = null
  setInterval(() => {
    if (!cpus0) {
      cpus0 = os.cpus()
      return
    }
    const cores = os.cpus()

    const coresUsage = cores.map((time, i) => {
      const user = time.times.user - cpus0[i].times.user
      const nice = time.times.nice - cpus0[i].times.nice
      const sys = time.times.sys - cpus0[i].times.sys
      const idle = time.times.idle - cpus0[i].times.idle
      const irq = time.times.irq - cpus0[i].times.irq
      const total = user + nice + sys + idle + irq

      return Math.round((1 - idle / total) * 1000)/10
    })
    cpus0 = cores

    globalVars.dataToShow.cpu.usage.push(coresUsage)
    const actualHistoryLength = globalVars.dataToShow.cpu.usage.length
    const lengthToRemove = actualHistoryLength - MAX_USAGE_HISTORY

    if (lengthToRemove <= 0) {
      // Actually such situation should not happen.
      throw new Error('CPU usage history smaller than expected')
    }

    globalVars.dataToShow.cpu.usage.splice(0, lengthToRemove)
  }, MEASURE_INTERVAL)
}
