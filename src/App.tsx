import React, {useState} from 'react';
import './App.module.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export function App() {

    const idTodolist1 = v1()
    const idTodolist2 = v1()

    const [tasks, setTasks] = useState({
            [idTodolist1]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'HTML', isDone: false},
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'HTML', isDone: false}
            ],
            [idTodolist2]: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'HTML', isDone: false}
            ]
        }
    )

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: idTodolist1, title: 'First', filter: 'all'},
        {id: idTodolist2, title: 'Second', filter: 'active'},
    ])

    const addTask = (title: string, idTodolist: string) => setTasks({
        ...tasks,
        [idTodolist]: [{id: v1(), title, isDone: false}, ...tasks[idTodolist]]
    })
    const deleteTask = (idTask: string, idTodolist: string) => setTasks({
        ...tasks,
        [idTodolist]: tasks[idTodolist].filter(t => t.id !== idTask)
    })
    const changeFilterStatus = (value: FilterValueType, idTodolist: string) => {
        setTodolists(todolists.map(tl => (tl.id === idTodolist ? {...tl, filter: value} : tl)))
    }
    const changeTaskStatus = (idTask: string, status: boolean, idTodolist: string) => {
        setTasks({...tasks, [idTodolist]: tasks[idTodolist].map(t => t.id === idTask ? {...t, isDone: status} : t)})
    }
    const deleteTodolist = (idTodolist: string) => {
        setTodolists(todolists.filter(tl => tl.id !== idTodolist))
        delete tasks[idTodolist]
        setTasks({...tasks})
    }

    return (
        <div>
            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                }
                return <Todolist
                    idTodolist={tl.id}
                    key={tl.id}
                    titleTodo={tl.title}
                    filterValue={tl.filter}
                    tasks={tasksForTodolist}
                    deleteTaskCallBack={deleteTask}
                    changeFilterStatusCallBack={changeFilterStatus}
                    addTaskCallBack={addTask}
                    changeTaskStatus={changeTaskStatus}
                    deleteTodolist={deleteTodolist}
                />


            })}

        </div>
    );
}

