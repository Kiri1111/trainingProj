type ReguestStatusType = 'loading' | 'succes'
type InitialStateType = typeof initialState
type ChangeStatusType = ReturnType<typeof changeAppStatus>
type AppReducerActionsType = ChangeStatusType
const initialState = {
  status: 'loading' as ReguestStatusType,
}

export const appReducer = (
  state: InitialStateType,
  action: AppReducerActionsType
): InitialStateType => {
  switch (action.type) {
    case 'CHANGE_APP_STATUS': {
      return { ...state, status: action.payload.newStatus }
    }
    default:
      return state
  }
}

export const changeAppStatus = (newStatus: ReguestStatusType) => ({
  type: 'CHANGE_APP_STATUS' as const,
  payload: { newStatus },
})
