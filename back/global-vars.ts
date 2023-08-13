import { DataToShow } from '@common/interfaces/DataToShow';

const globalVars: {
  isDeviceConnected: boolean
  activeWSConnections: any[]
  dataToShow: DataToShow
  isNgrokEnabled: boolean
} = {
  isDeviceConnected: true,
  activeWSConnections: [],
  dataToShow: {
    cpu: {
      usage: [],
      amountOfCores: 0,
    },
    battery: {
      state: '',
      percentage: 0,
    }
  },
  isNgrokEnabled: false,
}

export default globalVars
