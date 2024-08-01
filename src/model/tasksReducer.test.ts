import { v1 } from "uuid"
import { TasksState } from "../App"
import {
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  deleteTask,
  tasksReducer,
} from "./tasksReducer"
import { log } from "console"

const idTodolist1 = v1()
const idTodolist2 = v1()

const startState = {
  [idTodolist1]: [
    { id: "1", title: "HTML", isDone: true },
    { id: "2", title: "HTML", isDone: true },
    { id: "3", title: "HTML", isDone: false },
    { id: "4", title: "HTML", isDone: true },
    { id: "5", title: "HTML", isDone: false },
  ],
  [idTodolist2]: [
    { id: "1", title: "HTML", isDone: true },
    { id: "2", title: "HTML", isDone: true },
    { id: "3", title: "HTML", isDone: false },
  ],
}

test("correct task should be added", () => {
  const endState = tasksReducer(startState, addTask("Hello", idTodolist1))

  expect(endState[idTodolist1].length).toBe(6)
  expect(endState[idTodolist2].length).toBe(3)
  expect(endState[idTodolist1][0].title).toBe("Hello")
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(startState, deleteTask("2", idTodolist1))

  expect(endState[idTodolist1].length).toBe(4)
  expect(endState[idTodolist2].length).toBe(3)
  expect(endState[idTodolist1].every((t) => t.id !== "2")).toBeTruthy()
})

test("correct task tittle should be changed", () => {
  const endState = tasksReducer(
    startState,
    changeTaskTitle("Hello", "1", idTodolist1)
  )

  expect(endState[idTodolist1][0].title).toBe("Hello")
})

test("correct task status should be changed", () => {


  const endState = tasksReducer(
    startState,
    changeTaskStatus(false, "1", idTodolist1)
  )

  expect(endState[idTodolist1][0].isDone).toBe(false)
})
