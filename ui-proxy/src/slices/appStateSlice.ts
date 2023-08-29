import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppPage } from '../constants/AppPages'
import { IMachine } from '../interfaces/IMachine'

interface IAppState {
  page: AppPage,
  selectedMachine: IMachine | null,
}

const initialState: IAppState = {
  page: AppPage.UserOptions,
  selectedMachine: null
}

export const appStateSlice = createSlice({
  name: 'app/state',
  initialState,
  reducers: {
    setAppPage: (state, action: PayloadAction<AppPage>) => {
      state.page = action.payload
    },
    selectMachine: (state, action: PayloadAction<IMachine | null>) => {
      state.selectedMachine = action.payload
    }
  },
})

export const { setAppPage, selectMachine } = appStateSlice.actions

export const appStateReducer = appStateSlice.reducer
