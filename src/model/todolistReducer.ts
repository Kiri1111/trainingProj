import { v1 } from "uuid"
import { TodolistType } from "../App"

type AddTodolistType = {
  type: string
  payload: any
}

type RemoveTodolistType = {
  type: string
  payload: any
}

type ActionsTypes = AddTodolistType | RemoveTodolistType

const idTodolist1 = v1()
const idTodolist2 = v1()

const initialState: TodolistType[] = [
  { id: idTodolist1, title: "First", filter: "all" },
  { id: idTodolist2, title: "Second", filter: "all" },
]

export const todolistReducer = (
  state: TodolistType[] = initialState,
  action: ActionsTypes
): any => {
  switch (action.type) {
    case "ADD_TODOLIST": {
      return [
        ...state,
        { id: v1(), title: action.payload.title, filter: "all" },
      ]
    }
    case "REMOVE_TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id)
    }
    case "CHANGE_TODOLIST_TITLE": {
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, title: action.payload.newTitle }
          : tl
      )
    }
    case "CHANGE_TODOLIST_FILTER": {
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, filter: action.payload.newFilterStatus }
          : tl
      )
    }
    default:
      throw new Error("Not valid type")
  }
}

export const addTodolist = (title: string) => ({
  type: "ADD_TODOLIST" as const,
  payload: { title },
})
export const removeTodolist = (id: string) => ({
  type: "REMOVE_TODOLIST" as const,
  payload: { id },
})
export const changeTodolistTitle = (newTitle: string, id: string) => ({
  type: "CHANGE_TODOLIST_TITLE" as const,
  payload: { newTitle, id },
})
export const changeTodolistFilter = (newFilterStatus: string, id: string) => ({
  type: "CHANGE_TODOLIST_FILTER" as const,
  payload: { newFilterStatus, id },
})
