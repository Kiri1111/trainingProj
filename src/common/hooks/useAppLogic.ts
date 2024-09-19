import { TaskStatuses } from "../../api/tasksApi"
import { todolistThunks } from "../../features/todolist/todolistReducerRTK"
import {
  tasksActions,
  tasksThunks,
} from "../../features/todolist/ui/tasks/tasksReducerRTK"
import { useAppDispatch } from "./useAppDispatch"
import { useAppSelector } from "./useAppSelector"

export const useAppLogic = () => {
  const tasks = useAppSelector((state) => state.tasks)
  const todolists = useAppSelector((state) => state.todolists)
  const dispatch = useAppDispatch()

  const addTask = (title: string, todolistId: string): any =>
    dispatch(tasksThunks.addTask({ title, todolistId }))

  const deleteTask = (taskId: string, todolistId: string): any => {
    dispatch(tasksThunks.deleteTask({ taskId, todolistId }))
  }

  const changeTaskStatus = (
    taskId: string,
    status: TaskStatuses,
    todolistId: string
  ) => {
    dispatch(tasksThunks.updateTaskStatus({ taskId, todolistId, status }))
  }

  const deleteTodolist = (todolistId: string) => {
    dispatch(todolistThunks.deleteTodolist(todolistId))
  }

  const addTodolist = (newTodolistTitle: string) => {
    dispatch(todolistThunks.addTodolist(newTodolistTitle))
  }

  const changeTitleTodolist = (newTitle: string, todolistId: string) => {
    dispatch(todolistThunks.updateTodolist({ todolistId, newTitle }))
  }

  const changeTaskTitle = (
    newTitle: string,
    todolistId: string,
    taskId: string
  ) => {
    dispatch(tasksThunks.updateTaskTitle({ taskId, todolistId, newTitle }))
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
