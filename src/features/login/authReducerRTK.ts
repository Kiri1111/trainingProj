import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AuthDataType, authApi } from "../../api/authApi"
import { appActions } from "../../model/appReducerRTK"

export type ErrorMessageType = string | null

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

//thunks

const logout = createAsyncThunk("auth/logout", async (data, thunkApi) => {
  const { dispatch } = thunkApi
  dispatch(appActions.changeAppStatus({ status: "loading" }))
  const res = await authApi.logout()
  dispatch(appActions.changeAppStatus({ status: "succes" }))
  return { res }
})

const login = createAsyncThunk(
  "auth/login",
  async (data: AuthDataType, thunkApi) => {
    const { dispatch } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    const res = await authApi.login(data)
    dispatch(appActions.changeAppStatus({ status: "succes" }))
    return { res }
  }
)

const initializedApp = createAsyncThunk(
  "auth/initializedApp",
  async (initialState, thunkApi) => {
    const { dispatch } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    const res = await authApi.me()
    const errorMessage = res.data.messages[0]
    dispatch(appActions.changeAppStatus({ status: "succes" }))
    return { res, errorMessage }
  }
)

const slice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializedApp.fulfilled, (state, action) => {
        // if (action.payload.res.data.resultCode === 0) {
        state.isLoggedIn = true
        state.isInitialized = true
        // }
      })
      .addCase(initializedApp.rejected, (error, thunkApi) => {})
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.res.data.resultCode === 0) {
          state.isLoggedIn = true
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        if (action.payload.res.data.resultCode === 0) {
          state.isLoggedIn = false
        }
      })
  },
})

export const authReducer = slice.reducer

export const authThunks = { initializedApp, login, logout }
