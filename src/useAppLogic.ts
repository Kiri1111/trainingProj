import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "./state/store"
import {
  changeTaskTitleAction,
  createNewTask,
  removeTask,
  updateTaskStatus,
} from "./model/tasksReducer"
import {
  addTodolistThunk,
  deleteTodolistThunk,
  TodolistDomainType,
  updateTodolistThunk,
} from "./model/todolistReducer"
import { TasksState } from "./App"
import { TaskStatuses } from "./api/tasksApi"

export const useAppLogic = () => {
  const tasks = useSelector<RootState, TasksState>((state) => state.tasks)
  const todolists = useSelector<RootState, TodolistDomainType[]>(
    (state) => state.todolists
  )
  const dispatch = useAppDispatch()

  const addTask = (title: string, idTodolist: string): any =>
    dispatch(createNewTask(idTodolist, title))

  const deleteTask = (idTask: string, idTodolist: string): any => {
    dispatch(removeTask(idTodolist, idTask))
  }

  const changeTaskStatus = (
    idTask: string,
    status: TaskStatuses,
    idTodolist: string
  ) => {
    dispatch(updateTaskStatus(idTask, idTodolist, status))
  }

  const deleteTodolist = (idTodolist: string) => {
    dispatch(deleteTodolistThunk(idTodolist))
  }

  const addTodolist = (newTodolistTitle: string) => {
    dispatch(addTodolistThunk(newTodolistTitle))
  }

  const changeTitleTodolist = (editTitle: string, idTodolist: string) => {
    dispatch(updateTodolistThunk(idTodolist, editTitle))
  }

  const changeTaskTitle = (
    editTitle: string,
    idTodolist: string,
    idTask: string
  ) => {
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
