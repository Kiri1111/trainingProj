import { v1 } from 'uuid'
import { TasksState } from '../App'
import {
  addNewTask,
  changeTaskStatusAction,
  changeTaskTitleAction,
  deleteTaskAction,
  tasksReducer,
} from './tasksReducer'
import { log } from 'console'
import { TaskPriority, TaskStatuses } from '../api/tasksApi'

const idTodolist1 = v1()
const idTodolist2 = v1()

const startState: TasksState = {
  [idTodolist1]: [
    {
      id: '1',
      title: 'HTML',
      addedDate: '',
      deadline: null,
      order: 0,
      description: null,
      priority: TaskPriority.Low,
      startDate: null,
      status: TaskStatuses.Completed,
      todoListId: idTodolist1,
    },
    {
      id: '2',
      title: 'HTML',
      addedDate: '',
      deadline: null,
      order: 0,
      description: null,
      priority: TaskPriority.Low,
      startDate: null,
      status: TaskStatuses.Completed,
      todoListId: idTodolist1,
    },
    {
      id: '3',
      title: 'HTML',
      addedDate: '',
      deadline: null,
      order: 0,
      description: null,
      priority: TaskPriority.Low,
      startDate: null,
      status: TaskStatuses.Completed,
      todoListId: idTodolist1,
    },
    {
      id: '4',
      title: 'HTML',
      addedDate: '',
      deadline: null,
      order: 0,
      description: null,
      priority: TaskPriority.Low,
      startDate: null,
      status: TaskStatuses.Completed,
      todoListId: idTodolist1,
    },
    {
      id: '5',
      title: 'HTML',
      addedDate: '',
      deadline: null,
      order: 0,
      description: null,
      priority: TaskPriority.Low,
      startDate: null,
      status: TaskStatuses.Completed,
      todoListId: idTodolist1,
    },
  ],
  [idTodolist2]: [
    {
      id: '1',
      title: 'HTML',
      addedDate: '',
      deadline: null,
      order: 0,
      description: null,
      priority: TaskPriority.Low,
      startDate: null,
      status: TaskStatuses.Completed,
      todoListId: idTodolist2,
    },
    {
      id: '2',
      title: 'HTML',
      addedDate: '',
      deadline: null,
      order: 0,
      description: null,
      priority: TaskPriority.Low,
      startDate: null,
      status: TaskStatuses.Completed,
      todoListId: idTodolist2,
    },
    {
      id: '3',
      title: 'HTML',
      addedDate: '',
      deadline: null,
      order: 0,
      description: null,
      priority: TaskPriority.Low,
      startDate: null,
      status: TaskStatuses.Completed,
      todoListId: idTodolist2,
    },
  ],
}

// test('correct task should be added', () => {
//   // const endState = tasksReducer(startState, addNewTask('Hello', idTodolist1))

//   expect(endState[idTodolist1].length).toBe(6)
//   expect(endState[idTodolist2].length).toBe(3)
//   expect(endState[idTodolist1][0].title).toBe('Hello')
// })

test('correct task should be deleted', () => {
  const endState = tasksReducer(startState, deleteTaskAction('2', idTodolist1))

  expect(endState[idTodolist1].length).toBe(4)
  expect(endState[idTodolist2].length).toBe(3)
  expect(endState[idTodolist1].every((t) => t.id !== '2')).toBeTruthy()
})

test('correct task tittle should be changed', () => {
  const endState = tasksReducer(startState, changeTaskTitleAction('Hello', '1', idTodolist1))

  expect(endState[idTodolist1][0].title).toBe('Hello')
})

test('correct task status should be changed', () => {
  const endState = tasksReducer(
    startState,
    changeTaskStatusAction(TaskStatuses.InProgress, '1', idTodolist1)
  )

  // expect(endState[idTodolist1][0].).toBe(false)
})
