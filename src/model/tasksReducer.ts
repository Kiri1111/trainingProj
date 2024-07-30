import { v1 } from "uuid"
import { TasksState } from "../App"

export const tasksReducer = (state: any, action: any): any => {
  switch (action.type) {
      case "ADD_TASK": {
          const copyState = { ...state }
          copyState[action.idTodolist],[{ id: v1(), title:action.title, isDone: false }, ...copyState[action.idTodolist]]
      return copyState
    }
    case "DELETE_TASK": {
      return state
    }
    case "CHANGE_TASK_TITLE": {
      return state
    }
    case "CHANGE_TASK_STATUS": {
      return state
    }
  }
}

export const addTask = (title: string,idTodolist:string) => ({
  type: "ADD_TASK" as const,
  payload: { title,idTodolist },
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
