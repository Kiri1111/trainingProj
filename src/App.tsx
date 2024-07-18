import React, {useState} from 'react';
import './App.module.css';
import {TaskType, Todolist} from "./todolist";
import s from "./App.module.css"

export type FilterValueType = 'all' | 'active' | 'completed'

export function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'HTML', isDone: false},
        {id: 4, title: 'HTML', isDone: true},
        {id: 5, title: 'HTML', isDone: false}
    ])

    const [filterValue, setFilterValue] = useState<FilterValueType>('all')

    const deleteTask = (idTask: number) => setTasks(tasks.filter(t => t.id !== idTask))

    const changeFilterStatus = (value: FilterValueType) => setFilterValue(value)

    let tasksForTodolist = tasks
    if (filterValue === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }
    if (filterValue === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className={s.todolist}>
            <Todolist
                titleTodo={'What to learn'}
                tasks={tasksForTodolist}
                deleteTask={deleteTask}
                changeFilterStatus={changeFilterStatus}/>
        </div>
    );
}

