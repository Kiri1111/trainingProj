import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  UnknownAction,
} from "redux"
import { tasksReducer } from "../model/tasksReducer"
import { todolistReducer } from "../model/todolistReducer"
import { thunk, ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { appReducer } from "../model/appReducer"
import { authReducer } from "../features/login/authReducer"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
})
//@ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

//@ts-ignore
window.store = store
