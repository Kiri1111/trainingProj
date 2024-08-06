import { combineReducers, createStore } from 'redux'
import { tasksReducer } from '../model/tasksReducer'
import { todolistReducer } from '../model/todolistReducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store
