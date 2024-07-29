import { v1 } from "uuid"
import { todolistReducer } from "./todolistReducer"
import { TodolistType } from "../App"

test("correct todolist should be delete", () => {
  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const startState: TodolistType[] = [
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ]

  const action = {
    type: "REMOVE_TODOLIST",
    payload: { idTodolist1 },
  }

  const endState = todolistReducer(startState, action)

  expect(endState[0].id === idTodolist2)
})

test("correct todolist should be added", () => {
  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const startState: TodolistType[] = [
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ]

  const action = {
    type: "ADD_TODOLIST",
    payload: { title: "New Todolist" },
  }

  const endState = todolistReducer(startState, action)

  expect(endState[2].title).toBe(action.payload.title)
  expect(endState.length).toBe(3)
})

test("correct todolist should change its name", () => {
  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const startState: TodolistType[] = [
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ]

  const action = {
    type: "CHANGE_TODOLIST_TITLE",
    payload: { newTitle: "New Title", id: idTodolist1 },
  }

  const endState = todolistReducer(startState, action)

  expect(endState[0].title).toBe(action.payload.newTitle)
  expect(endState[1].title).toBe("Second")
})

test("correct todolist should change its filter status", () => {
  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const startState: TodolistType[] = [
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ]

  const action = {
    type: "CHANGE_TODOLIST_FILTER",
    payload: { newFilterStatus: "active", id: idTodolist1 },
  }

  const endState = todolistReducer(startState, action)

  expect(endState[0].filter).toBe(action.payload.newFilterStatus)
  expect(endState[1].filter).toBe("all")
})
