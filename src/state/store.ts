import { combineReducers, UnknownAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { useDispatch } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer } from "../model/appReducerRTK"
import { authReducer } from "../features/login/authReducerRTK"
import { tasksReducer } from "../features/todolist/ui/tasks/tasksReducerReactRedux"
import { todolistReducer } from "../features/todolist/todolistReducerReactRedux"

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

//@ts-ignore
window.store = store
