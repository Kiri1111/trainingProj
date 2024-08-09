import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '3f0bd518-e3ef-420a-b8dc-d517a6d5a7f7',
  },
})

export const todolistApi = {
  getTodolists() {
    return instance.get('todo-lists')
  },
  deleteTodolist(idTodolist: string) {
    return instance.delete(`todo-lists/${idTodolist}`)
  },
  updateTodolist(idTodolist: string, title: string) {
    return instance.put(`todo-lists/${idTodolist}`, { title })
  },
  createTodolist(title: string) {
    return instance.post('todo-lists', { title })
  },
}
