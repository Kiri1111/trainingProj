import { v1 } from "uuid"
import { TasksState } from "../App"
import { Todolist } from "../Todolist"

type AddTask = ReturnType<typeof addTask>
type DeleteTask = ReturnType<typeof deleteTask>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitle>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatus>

type ActionsTaskReducer =
  | AddTask
  | DeleteTask
  | ChangeTaskTitle
  | ChangeTaskStatus

export const tasksReducer = (
  state: TasksState,
  action: ActionsTaskReducer
): TasksState => {
  switch (action.type) {
    case "ADD_TASK": {
      const copyState = { ...state }
      const tasks = copyState[action.payload.idTodolist]
      const newTask = { id: v1(), title: action.payload.title, isDone: false }
      const newTasks = [newTask, ...tasks]
      copyState[action.payload.idTodolist] = newTasks
      return copyState
    }
    case "DELETE_TASK": {
      const copyState = { ...state }
      const filteredTasks = copyState[action.payload.idTodolist].filter(
        (t) => t.id !== action.payload.idTask
      )
      copyState[action.payload.idTodolist] = filteredTasks
      return copyState
    }
    case "CHANGE_TASK_TITLE": {
      // const copyState = { ...state }
      //  copyState[action.payload.idTodolist].map(t=>t.id===action.payload.idTask?{...t,title:action.payload.newTitle}:t)
      // return copyState
      return {
        ...state,
        [action.payload.idTodolist]: state[action.payload.idTodolist].map((t) =>
          t.id === action.payload.idTask
            ? { ...t, title: action.payload.newTitle }
            : t
        ),
      }

      // const copyState = { ...state }
      // const tasks = copyState[action.payload.idTodolist]
      // const task = tasks.find((t) => t.id === action.payload.idTask)
      // if (task) {
      // task.title = action.payload.newTitle
      // }
      // return copyState
    }
    case "CHANGE_TASK_STATUS": {
      return {
        ...state,
        [action.payload.idTodolist]: state[action.payload.idTodolist].map((t) =>
          t.id === action.payload.idTask
            ? { ...t, isDone: action.payload.newStatus }
            : t
        ),
      }
    }
    default:
      throw new Error("case not found")
  }
}

export const addTask = (title: string, idTodolist: string) => ({
  type: "ADD_TASK" as const,
  payload: { title, idTodolist },
})
export const deleteTask = (idTask: string, idTodolist: string) => ({
  type: "DELETE_TASK" as const,
  payload: { idTask, idTodolist },
})
export const changeTaskTitle = (
  newTitle: string,
  idTask: string,
  idTodolist: string
) => ({
  type: "CHANGE_TASK_TITLE" as const,
  payload: { idTask, idTodolist, newTitle },
})
export const changeTaskStatus = (
  newStatus: boolean,
  idTask: string,
  idTodolist: string
) => ({
  type: "CHANGE_TASK_STATUS" as const,
  payload: { newStatus, idTask, idTodolist },
})
