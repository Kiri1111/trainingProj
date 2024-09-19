import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AuthDataType, authApi } from "../../api/authApi"
import { appActions } from "../../model/appReducerRTK"
import { ResultCode } from "../../common/resultCodes"

export type ErrorMessageType = string | null

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

//thunks

const logout = createAsyncThunk("auth/logout", async (_data, thunkApi) => {
  const { dispatch } = thunkApi
  dispatch(appActions.changeAppStatus({ status: "loading" }))
  try {
    const res = await authApi.logout()
    if (res.data.resultCode === ResultCode.Succes) {
      return { res }
    } else {
      dispatch(appActions.setAppError({ error: res.data.messages[0] }))
    }
  } catch (e: any) {
    dispatch(appActions.setAppError({ error: e.toString() }))
  } finally {
    dispatch(appActions.changeAppStatus({ status: "succes" }))
  }
})
const login = createAsyncThunk(
  "auth/login",
  async (data: AuthDataType, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    try {
      const res = await authApi.login(data)
      if (res.data.resultCode === ResultCode.Succes) {
        return { res }
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages[0] }))
      }
    } catch (e: any) {
      dispatch(appActions.setAppError({ error: e.toString() }))
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.changeAppStatus({ status: "succes" }))
    }
  }
)

const initializedApp = createAsyncThunk(
  "auth/initializedApp",
  async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    try {
      const res = await authApi.me()
      if (res.data.resultCode === ResultCode.Succes) {
        return { res }
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages[0] }))
      }
    } catch (e: any) {
      dispatch(appActions.setAppError({ error: e.toString() }))
      return rejectWithValue(null)
    } finally {
      dispatch(appActions.changeAppStatus({ status: "succes" }))
    }
  }
)

const slice = createSlice({
  name: "auth",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializedApp.fulfilled, (state, _action) => {
        state.isLoggedIn = true
        state.isInitialized = true
      })
      .addCase(initializedApp.rejected, (state, _thunkApi) => {
        state.isInitialized = true
      })
      .addCase(login.rejected, (state, _thunkApi) => {
        state.isInitialized = true
        state.isLoggedIn = false
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload?.res)
          if (action.payload.res.data.resultCode === 0) {
            state.isLoggedIn = true
            state.isInitialized = true
          } else {
            state.isLoggedIn = false
            state.isInitialized = true
          }
      })
      .addCase(logout.fulfilled, (state, _action) => {
        state.isLoggedIn = false
      })
  },
})

export const authReducer = slice.reducer

export const authThunks = { initializedApp, login, logout }
