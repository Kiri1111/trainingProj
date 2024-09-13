import { ThunkDispatch } from "redux-thunk"
import { RootState } from "../../state/store"
import { UnknownAction } from "redux"
import { useDispatch } from "react-redux"

export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
