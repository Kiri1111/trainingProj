import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  UnknownAction,
} from "redux"
import { tasksReducer } from "../model/tasksReducer"
import { todolistReducer } from "../model/todolistReducer"
import thunkMiddleware, { ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { appReducer } from "../model/appReducerReactRedux"
import { authReducer } from "../features/login/authReducerReactRedux"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
  app: appReducer,
  auth: authReducer,
})
//@ts-ignore
export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().prepend(thunkMiddleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

//@ts-ignore
window.store = store
