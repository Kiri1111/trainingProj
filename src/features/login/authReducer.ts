import { Dispatch } from "redux"
import { AuthDataType, authApi } from "../../api/authApi"
import { changeAppStatus, setAppError } from "../../model/appReducer"

const initialState = {
  isLoggedIn: false,
}

type InitialStateType = typeof initialState
type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>
type ActionsType = SetIsLoggedInActionType

export const authReducer = (
  state: InitialStateType = initialState,
  actions: ActionsType
): InitialStateType => {
  switch (actions.type) {
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: actions.payload.value,
      }
    default:
      return state
  }
}

export const setIsLoggedIn = (value: boolean) => ({
  type: "SET_IS_LOGGED_IN" as const,
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
