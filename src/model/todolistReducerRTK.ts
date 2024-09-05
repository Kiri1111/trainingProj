import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { TodolistType } from "../api/todolistsApi"
import { FilterValue } from "../App"
import { v1 } from "uuid"

export type TodolistDomainType = TodolistType & { filter: FilterValue }
type InitialStateType = typeof initialState

export const idTodolist1 = v1()
export const idTodolist2 = v1()

const initialState: TodolistDomainType[] = []

//thunks

const slice = createSlice({
  name: "todolist",
  initialState,

  reducers: {
    addTodolist: (
      state: InitialStateType,
      action: PayloadAction<{ todolist: TodolistDomainType }>
    ) => {
      state.unshift({ ...action.payload.todolist, filter: "all" })
    },
    changeTodolistTitle: (
      state,
      action: PayloadAction<{ idTodolist: string; title: string }>
    ) => {
      const todo = state.find((t) => t.id === action.payload.idTodolist)
      if (todo) {
        todo.title = action.payload.title
      }
    },
    setTodolists: (
      state,
      action: PayloadAction<{ todolists: TodolistType[] }>
    ) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
    },
  },
  extraReducers: (builder) => {},
})

export const todolistReducer = slice.reducer

export const todolistThunks = {}
