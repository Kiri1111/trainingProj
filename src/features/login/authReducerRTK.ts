import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authApi } from "../../api/authApi"
import { appActions } from "../../model/appReducerRTK"
import { error } from "console"

const initialState = {
  isLoggedIn: false,
  isInitialized: true,
}

type InitialStateType = typeof initialState

//thunks

const initializedApp = createAsyncThunk(
  "auth/initializedApp",
  async (initialState, thunkApi) => {
    const { dispatch } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    const res = await authApi.me()
    const errorMessage = res.data.messages[0]
    dispatch(appActions.changeAppStatus({ status: "succes" }))
    return { res, errorMessage }
    //  authApi
    //     .me()
    //     .then((res) => {
    //       if (res.data.resultCode === 0) {
    //         dispatch(authActions.setIsloggedIn({ isLoggedIn: true }))
    //       } else {
    //         dispatch(appActions.setAppError({ error: res.data.messages[0] }))
    //       }
    //     })
    //     .catch((e) => dispatch(appActions.setAppError({ error: e.toString() })))
    //     .finally(() => {
    //       dispatch(authActions.setIsInitialized({ isInitialized: true }))
    //       dispatch(appActions.changeAppStatus({ status: "succes" }))
    //     })
  }
)

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
    // setIsInitialized: (
    //   state: InitialStateType,
    //   action: PayloadAction<{ isInitialized: boolean }>
    // ) => {
    //   state.isInitialized = action.payload.isInitialized
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializedApp.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.isInitialized = true
      })
      .addCase(initializedApp.rejected, (error, thunkApi) => {
    })
  },
})

export const authReducer = slice.reducer

export const authActions = slice.actions

export const authThunks = { initializedApp }
