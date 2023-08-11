import { DataToShow } from "@common/interfaces/DataToShow"
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IDataToShowState {
  value: DataToShow
}

const initialState: IDataToShowState = {
  value: {
    cpu: {
      usage: [],
      amountOfCores: 0
    }
  },
}

export const dataToShow = createSlice({
  name: 'data/dataToShow',
  initialState,
  reducers: {
    setDataToShow: (state, action: PayloadAction<DataToShow>) => { state.value = action.payload},
  },
})

// Action creators are generated for each case reducer function
export const { setDataToShow } = dataToShow.actions

export const dataToShowReducer = dataToShow.reducer
