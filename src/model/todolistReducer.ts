import { v1 } from "uuid";
import { TodolistType } from "../App";

type AddTodolistType = {
    type: string,
    payload:any
}

type ActionsTypes=AddTodolistType

  const idTodolist1 = v1()
  const idTodolist2 = v1()


const initialState:TodolistType[]=[
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },]

const todolistReducer = (state: TodolistType[]=initialState, action: ActionsTypes): any => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            
        }
        case 'REMOVE_TODOLIST': {
            
        }
        default:
            throw new Error ('Not valid type')
    }
}

const addTodolist = (title: string) =>({
    type: 'ADD_TODOLIST' as const,
        payload:{title}
})
