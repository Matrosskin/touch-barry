import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DataToShow } from '../interfaces/DataToShow'
import { CPU_MAX_USAGE_HISTORY } from '../constants/cpu'
import { BatteryState } from '../constants/BatteryState'

const initialState: DataToShow = {
  cpu: {
    usage: new Array(CPU_MAX_USAGE_HISTORY).fill([]),
    amountOfCores: 0
  },
  battery: {
    state: BatteryState.NA,
    percentage: 0,
  },
}

// TODO: Do I really need to share this slice? Once I created reducers - situation looks differently.
// At front I need only big 'set' action, and at back - a lot of smaller setters.
// So looks like I need to share interfaces and probably initial state.
export const dataToShow = createSlice({
  name: 'data/dataToShow',
  initialState,
  reducers: {
    // Frontend
    setDataToShow: (state, action: PayloadAction<DataToShow>) => {
      state.cpu = action.payload.cpu
      state.battery = action.payload.battery
    },

    // Backend
    pushCpuUsage: (state, action: PayloadAction<number[]>) => {
      state.cpu.usage.push(action.payload)
      state.cpu.usage.shift()
    },
    setCpuCores: (state, action: PayloadAction<DataToShow["cpu"]["amountOfCores"]>) => { state.cpu.amountOfCores = action.payload },
    setBattery: (state, action: PayloadAction<DataToShow["battery"]>) => { state.battery = action.payload },
  },
})

// Action creators are generated for each case reducer function
export const { setDataToShow, pushCpuUsage, setCpuCores, setBattery } = dataToShow.actions

export const dataToShowReducer = dataToShow.reducer
