import { TaskStatuses } from "./api/tasksApi"
import { useAppDispatch } from "./common/hooks/useAppDispatch"
import { useAppSelector } from "./common/hooks/useAppSelector"
import {
  addTodolistThunk,
  deleteTodolistThunk,
  updateTodolistThunk,
} from "./features/todolist/todolistReducerReactRedux"
import {
  changeTaskTitleAction,
  createNewTask,
  removeTask,
  updateTaskStatus,
} from "./features/todolist/ui/tasks/tasksReducerReactRedux"

export const useAppLogic = () => {
  const tasks = useAppSelector((state) => state.tasks)
  const todolists = useAppSelector((state) => state.todolists)
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
