import { v1 } from "uuid"
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
  todolistReducer,
} from "./todolistReducer"
import { TodolistType } from "../App"

test("correct todolist should be delete", () => {
  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const startState: TodolistType[] = [
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ]

  const endState = todolistReducer(startState, removeTodolist(idTodolist1))

  expect(endState[0].id === idTodolist2)
})

test("correct todolist should be added", () => {
  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const startState: TodolistType[] = [
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ]

  const endState = todolistReducer(startState, addTodolist("NewTittttle"))

  expect(endState[2].title).toBe("NewTittttle")
  expect(endState.length).toBe(3)
})

test("correct todolist should change its name", () => {
  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const startState: TodolistType[] = [
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ]

  const endState = todolistReducer(
    startState,
    changeTodolistTitle("My new title", idTodolist1)
  )

  expect(endState[0].title).toBe("My new title")
  expect(endState[1].title).toBe("Second")
})

test("correct todolist should change its filter status", () => {
  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const startState: TodolistType[] = [
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ]

  const endState = todolistReducer(
    startState,
    changeTodolistFilter("completed", idTodolist1)
  )

  expect(endState[0].filter).toBe("completed")
  expect(endState[1].filter).toBe("all")
})
