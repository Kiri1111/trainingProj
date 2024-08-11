import { v1 } from 'uuid'
import {
  addTodolistAction,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
  TodolistDomainType,
  todolistReducer,
} from './todolistReducer'

const idTodolist1 = v1()
const idTodolist2 = v1()

const startState: TodolistDomainType[] = [
  { id: idTodolist1, title: 'First', filter: 'all', addedDate: '', order: 0 },
  { id: idTodolist2, title: 'Second', filter: 'all', addedDate: '', order: 0 },
]

test('correct todolist should be delete', () => {
  const endState = todolistReducer(startState, removeTodolist(idTodolist1))

  expect(endState[0].id === idTodolist2)
})

test('correct todolist should be added', () => {
  const idTodolist3 = v1()

  const endState = todolistReducer(startState, addTodolistAction('NewTittttle', idTodolist3))

  expect(endState[2].title).toBe('NewTittttle')
  expect(endState.length).toBe(3)
})

test('correct todolist should change its name', () => {
  const endState = todolistReducer(startState, changeTodolistTitle('My new title', idTodolist1))

  expect(endState[0].title).toBe('My new title')
  expect(endState[1].title).toBe('Second')
})

test('correct todolist should change its filter status', () => {
  const endState = todolistReducer(startState, changeTodolistFilter('completed', idTodolist1))

  expect(endState[0].filter).toBe('completed')
  expect(endState[1].filter).toBe('all')
})
