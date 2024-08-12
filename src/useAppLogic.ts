import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from './state/store'
import {
  addNewTask,
  changeTaskStatusAction,
  changeTaskTitleAction,
  createNewTask,
  removeTask,
} from './model/tasksReducer'
import {
  addTodolistAction,
  changeTodolistTitle,
  removeTodolist,
  TodolistDomainType,
} from './model/todolistReducer'
import { v1 } from 'uuid'
import { TasksState } from './App'
import { TaskStatuses } from './api/tasksApi'

export const useAppLogic = () => {
  const tasks = useSelector<RootState, TasksState>((state) => state.tasks)
  const todolists = useSelector<RootState, TodolistDomainType[]>((state) => state.todolists)
  const dispatch = useAppDispatch()

  const addTask = (title: string, idTodolist: string): any =>
    dispatch(createNewTask(idTodolist, title))

  const deleteTask = (idTask: string, idTodolist: string): any => {
    dispatch(removeTask(idTodolist, idTask))
  }

  const changeTaskStatus = (idTask: string, status: TaskStatuses, idTodolist: string) => {
    dispatch(changeTaskStatusAction(status, idTask, idTodolist))
  }

  const deleteTodolist = (idTodolist: string) => {
    dispatch(removeTodolist(idTodolist))
  }

  const addTodolist = (newTodolistTitle: string) => {
    const idTodolist = v1()
    dispatch(addTodolistAction(newTodolistTitle, idTodolist))
  }

  const changeTitleTodolist = (editTitle: string, idTodolist: string) => {
    dispatch(changeTodolistTitle(editTitle, idTodolist))
  }

  const changeTaskTitle = (editTitle: string, idTodolist: string, idTask: string) => {
    dispatch(changeTaskTitleAction(editTitle, idTask, idTodolist))
  }

  return {
    tasks,
    todolists,
    deleteTask,
    changeTaskStatus,
    deleteTodolist,
    addTodolist,
    changeTitleTodolist,
    changeTaskTitle,
    addTask,
  }
}
