import { v1 } from 'uuid'
import { TasksState } from '../App'
import { Todolist } from '../Todolist'
import { AddTodolistType, idTodolist1, idTodolist2, RemoveTodolistType } from './todolistReducer'
import { TaskForUpdateType, TaskPriority, tasksApi, TaskStatuses, TaskType } from '../api/tasksApi'
import { Dispatch } from 'redux'
import { log } from 'console'
import { RootState } from '../state/store'
import { changeAppStatus, setAppError } from './appReducer'

type AddTask = ReturnType<typeof addNewTask>
type DeleteTask = ReturnType<typeof deleteTaskAction>
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAction>
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAction>
type SetTasks = ReturnType<typeof setTasks>

type ActionsTaskReducer =
  | AddTask
  | DeleteTask
  | ChangeTaskTitle
  | ChangeTaskStatus
  | AddTodolistType
  | RemoveTodolistType
  | SetTasks

const initialState: TasksState = {
  // [idTodolist1]: [
  //   {
  //     id: v1(),
  //     title: 'HTML',
  //     status: TaskStatuses.Completed,
  //     addedDate: '',
  //     deadline: null,
  //     description: null,
  //     order: 0,
  //     priority: TaskPriority.Later,
  //     startDate: null,
  //     todoListId: idTodolist1,
  //   },
  //   {
  //     id: v1(),
  //     title: 'HTML',
  //     status: TaskStatuses.Completed,
  //     addedDate: '',
  //     deadline: null,
  //     description: null,
  //     order: 0,
  //     priority: TaskPriority.Later,
  //     startDate: null,
  //     todoListId: idTodolist1,
  //   },
  // ],
  // [idTodolist2]: [
  //   {
  //     id: v1(),
  //     title: 'HTML',
  //     status: TaskStatuses.Completed,
  //     addedDate: '',
  //     deadline: null,
  //     description: null,
  //     order: 0,
  //     priority: TaskPriority.Later,
  //     startDate: null,
  //     todoListId: idTodolist2,
  //   },
  // ],
}

export const tasksReducer = (
  state: TasksState = initialState,
  action: ActionsTaskReducer
): TasksState => {
  switch (action.type) {
    case 'SET_TASKS': {
      return { ...state, [action.payload.idTodolist]: action.payload.tasks }
    }
    case 'ADD_TASK': {
      // const copyState = { ...state }
      // const tasks = copyState[action.payload.idTodolist]
      // const newTask = {
      //   id: v1(),
      //   title: action.payload.title,
      //   description: null,
      //   todoListId: action.payload.idTodolist,
      //   order: 0,
      //   status: TaskStatuses.New,
      //   priority: TaskPriority.Low,
      //   startDate: null,
      //   deadline: null,
      //   addedDate: '',
      // }
      // const newTasks = [newTask, ...tasks]
      // copyState[action.payload.idTodolist] = newTasks
      return {
        ...state,
        [action.payload.task.todoListId]: [
          action.payload.task,
          ...state[action.payload.task.todoListId],
        ],
      }
    }
    case 'DELETE_TASK': {
      const copyState = { ...state }
      const filteredTasks = copyState[action.payload.idTodolist].filter(
        (t) => t.id !== action.payload.idTask
      )
      copyState[action.payload.idTodolist] = filteredTasks
      return copyState
    }
    case 'CHANGE_TASK_TITLE': {
      // const copyState = { ...state }
      //  copyState[action.payload.idTodolist].map(t=>t.id===action.payload.idTask?{...t,title:action.payload.newTitle}:t)
      // return copyState
      return {
        ...state,
        [action.payload.idTodolist]: state[action.payload.idTodolist].map((t) =>
          t.id === action.payload.idTask ? { ...t, title: action.payload.newTitle } : t
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
    case 'CHANGE_TASK_STATUS': {
      return {
        ...state,
        [action.payload.idTodolist]: state[action.payload.idTodolist].map((t) =>
          t.id === action.payload.idTask ? { ...t, status: action.payload.newStatus } : t
        ),
      }
    }
    case 'ADD_TODOLIST': {
      return { ...state, [action.payload.idTodolist]: [] }
    }
    case 'REMOVE_TODOLIST': {
      delete state[action.payload.id]
      return { ...state }
    }
    default:
      return state
  }
}

export const addNewTask = (task: TaskType) => ({
  type: 'ADD_TASK' as const,
  payload: { task },
})
export const deleteTaskAction = (idTask: string, idTodolist: string) => ({
  type: 'DELETE_TASK' as const,
  payload: { idTask, idTodolist },
})
export const changeTaskTitleAction = (newTitle: string, idTask: string, idTodolist: string) => ({
  type: 'CHANGE_TASK_TITLE' as const,
  payload: { idTask, idTodolist, newTitle },
})
export const changeTaskStatusAction = (
  newStatus: TaskStatuses,
  idTask: string,
  idTodolist: string
) => ({
  type: 'CHANGE_TASK_STATUS' as const,
  payload: { newStatus, idTask, idTodolist },
})

export const setTasks = (tasks: any, idTodolist: string) => ({
  type: 'SET_TASKS' as const,
  payload: { tasks, idTodolist },
})

export const getTasks = (idTodolist: string) => (dispatch: Dispatch) => {
  dispatch(changeAppStatus('loading'))
  tasksApi
    .getTasks(idTodolist)
    .then((res) => {
      dispatch(setTasks(res.data.items, idTodolist))
      dispatch(changeAppStatus('succes'))
    })
    .catch((e) => dispatch(setAppError(e.toString())))
    .finally(() => dispatch(changeAppStatus('succes')))
}
export const removeTask = (idTodolist: string, idTask: string) => (dispatch: Dispatch) => {
  dispatch(changeAppStatus('loading'))
  tasksApi
    .deleteTask(idTodolist, idTask)
    .then(() => dispatch(deleteTaskAction(idTask, idTodolist)))
    .catch((e) => dispatch(setAppError(e.toString())))
    .finally(() => dispatch(changeAppStatus('succes')))
}

export const createNewTask = (idTodolist: string, title: string) => (dispatch: Dispatch) => {
  dispatch(changeAppStatus('loading'))
  tasksApi
    .createTask(idTodolist, title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addNewTask(res.data.data.item))
      }
      dispatch(setAppError(res.data.messages[0]))
    })
    .catch((e) => dispatch(setAppError(e.toString())))
    .finally(() => dispatch(changeAppStatus('succes')))
}

export const updateTaskStatus =
  (idTask: string, idTodolist: string, status: TaskStatuses) =>
  (dispatch: Dispatch, getState: () => RootState) => {
    const rootState = getState()
    const task = rootState.tasks[idTodolist].find((t) => t.id === idTask)

    if (task) {
      const taskForApi: TaskForUpdateType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status,
      }
      dispatch(changeAppStatus('loading'))
      tasksApi
        .updateTask(idTodolist, idTask, taskForApi)
        .then((res) => {
          dispatch(changeTaskStatusAction(status, idTask, idTodolist))
        })
        .catch((e) => dispatch(setAppError(e.toString())))
        .finally(() => dispatch(changeAppStatus('succes')))
    }
  }
