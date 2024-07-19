import React, {useState} from 'react';
import './App.module.css';
import {TaskType, Todolist} from "./Todolist";
import s from "./App.module.css"
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed'

export function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'HTML', isDone: false}
    ])

    const [filterValue, setFilterValue] = useState<FilterValueType>('all')


    const addTask = (title: string) => setTasks([{id: v1(), title, isDone: false}, ...tasks])
    const deleteTask = (idTask: string) => setTasks(tasks.filter(t => t.id !== idTask))
    const changeFilterStatus = (value: FilterValueType) => setFilterValue(value)

    let tasksForTodolist = tasks
    if (filterValue === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filterValue === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div>
            <Todolist
                titleTodo={'What to learn'}
                tasks={tasksForTodolist}
                deleteTaskCallBack={deleteTask}
                changeFilterStatusCallBack={changeFilterStatus}
                addTaskCallBack={addTask}
            />

        </div>
    );
}

