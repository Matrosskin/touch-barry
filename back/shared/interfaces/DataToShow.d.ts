import { BatteryState } from '../constants/BatteryState'

export interface DataToShow {
  cpu: {
    usage: (number[])[]
    amountOfCores: number
  },
  battery: {
    state: BatteryState
    percentage: number
  },
}
