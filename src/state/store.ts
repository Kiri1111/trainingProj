import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { tasksReducer } from '../model/tasksReducer'
import { todolistReducer } from '../model/todolistReducer'
import { thunk, ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
})
//@ts-ignore
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

//@ts-ignore
window.store = store
