import { v1 } from "uuid"
import { TasksState } from "../App"
import { deleteTask, tasksReducer } from "./tasksReducer"

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
  const endState = tasksReducer(startState, deleteTask("2", idTodolist1))
  expect(endState[0].id === idTodolist2)
})
