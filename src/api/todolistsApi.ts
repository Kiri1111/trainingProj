import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '3f0bd518-e3ef-420a-b8dc-d517a6d5a7f7',
  },
})

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  deleteTodolist(idTodolist: string) {
    return instance.delete<ResponseTodolistType>(`todo-lists/${idTodolist}`)
  },
  updateTodolist(idTodolist: string, title: string) {
    return instance.put<ResponseTodolistType>(`todo-lists/${idTodolist}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<ResponseTodolistType<{ item: TodolistType }>>('todo-lists', { title })
  },
}

type TodolistType = {
  id: string
  title: string
  addedDate: Date
  order: number
}

type ResponseTodolistType<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldErrorType[]
  data: T
}

type FieldErrorType = {
  error: string
  field: string
}
