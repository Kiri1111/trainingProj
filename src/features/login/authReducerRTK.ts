import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

type InitialStateType = typeof initialState

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsloggedIn: (
      state: InitialStateType,
      action: PayloadAction<{ isLoggedIn: boolean }>
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setIsInitialized: (
      state: InitialStateType,
      action: PayloadAction<{ isInitialized: boolean }>
    ) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const authReducer = slice.reducer

export const authActions = slice.actions
