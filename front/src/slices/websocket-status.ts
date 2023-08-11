import { createSlice } from '@reduxjs/toolkit'

export enum WebSocketStatus {
  WAITING,
  OPEN,
  CLOSED
}

interface IWebSocketStatusState {
  value: WebSocketStatus
}

const initialState: IWebSocketStatusState = {
  value: WebSocketStatus.CLOSED,
}

export const webSocketStatusSlice = createSlice({
  name: 'websocket/status',
  initialState,
  reducers: {
    setWSStatusWaiting: (state) => {state.value = WebSocketStatus.WAITING},
    setWSStatusOpen: (state) => {state.value = WebSocketStatus.OPEN},
    setWSStatusClosed: (state) => {state.value = WebSocketStatus.CLOSED},
  },
})

// Action creators are generated for each case reducer function
export const { setWSStatusWaiting, setWSStatusOpen, setWSStatusClosed } = webSocketStatusSlice.actions

export const webSocketStatusReducer = webSocketStatusSlice.reducer
