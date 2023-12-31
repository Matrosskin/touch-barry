import { configureStore } from '@reduxjs/toolkit'
import { dataToShowReducer } from '@touch-barry/shared/slices/dataToShow'
import { webSocketStatusReducer } from './slices/websocket-status'

export const store = configureStore({
  reducer: {
    webSocketStatus: webSocketStatusReducer,
    dataToShow: dataToShowReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
