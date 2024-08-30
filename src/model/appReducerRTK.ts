import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type ReguestStatusType = "loading" | "succes"
export type ErrorMessageType = string | null

const initialState = {
  status: "succes" as ReguestStatusType,
  error: null as ErrorMessageType,
}

type InitialStateType = typeof initialState

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeAppStatus: (
      state: InitialStateType,
      action: PayloadAction<{ status: ReguestStatusType }>
    ) => {
      state.status = action.payload.status
    },
    setAppError: (
      state: InitialStateType,
      action: PayloadAction<{ error: ErrorMessageType }>
    ) => {
      state.error = action.payload.error
    },
  },
})

export const appReducer = slice.reducer

export const appActions = slice.actions
