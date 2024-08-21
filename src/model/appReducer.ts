export type ReguestStatusType = 'loading' | 'succes'
type InitialStateType = typeof initialState
type ChangeStatusType = ReturnType<typeof changeAppStatus>
type SetAppErrorType = ReturnType<typeof setAppError>
type AppReducerActionsType = ChangeStatusType | SetAppErrorType
export type ErrorMessageType = string | null
const initialState = {
  status: 'succes' as ReguestStatusType,
  error: null as ErrorMessageType,
}

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppReducerActionsType
): InitialStateType => {
  switch (action.type) {
    case 'CHANGE_APP_STATUS': {
      return { ...state, status: action.payload.newStatus }
    }
    case 'SET_APP_ERROR': {
      return { ...state, error: action.payload.errorMesage }
    }
    default:
      return state
  }
}

export const changeAppStatus = (newStatus: ReguestStatusType) => ({
  type: 'CHANGE_APP_STATUS' as const,
  payload: { newStatus },
})

export const setAppError = (errorMesage: ErrorMessageType) => ({
  type: 'SET_APP_ERROR' as const,
  payload: { errorMesage },
})
