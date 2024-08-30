import { Dispatch } from "redux"
import { AuthDataType, authApi } from "../../api/authApi"
import { changeAppStatus, setAppError } from "../../model/appReducer"

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

type InitialStateType = typeof initialState
type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>
type SetIsInitializedActionType = ReturnType<typeof setIsInitialized>
type ActionsType = SetIsLoggedInActionType | SetIsInitializedActionType

export const authReducer = (
  state: InitialStateType = initialState,
  actions: ActionsType
): InitialStateType => {
  switch (actions.type) {
    case "SET_IS_LOGGED_IN": {
      return {
        ...state,
        isLoggedIn: actions.payload.value,
      }
    }
    case "SET_IS_INITIALIZED": {
      return {
        ...state,
        isInitialized: actions.payload.value,
      }
    }
    default:
      return state
  }
}

export const setIsLoggedIn = (value: boolean) => ({
  type: "SET_IS_LOGGED_IN" as const,
  payload: { value },
})

export const setIsInitialized = (value: boolean) => ({
  type: "SET_IS_INITIALIZED" as const,
  payload: { value },
})

export const login = (data: AuthDataType) => (dispatch: Dispatch) => {
  dispatch(changeAppStatus("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn(true))
      } else {
        dispatch(setAppError(res.data.messages[0]))
      }
    })
    .catch((e) => dispatch(setAppError(e.toString())))
    .finally(() => dispatch(changeAppStatus("succes")))
}

export const initializedApp = () => (dispatch: Dispatch) => {
  dispatch(changeAppStatus("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn(true))
      } else {
        dispatch(setAppError(res.data.messages[0]))
      }
    })
    .catch((e) => dispatch(setAppError(e.toString())))
    .finally(() => {
      dispatch(setIsInitialized(true))
      dispatch(changeAppStatus("succes"))
    })
}

export const logout = () => (dispatch: Dispatch) => {
  dispatch(changeAppStatus("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn(false))
      } else {
        dispatch(setAppError(res.data.messages[0]))
      }
    })
    .catch((e) => dispatch(setAppError(e.toString())))
    .finally(() => {
      // dispatch(setIsInitialized(true))
      dispatch(changeAppStatus("succes"))
    })
}
