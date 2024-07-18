import React from 'react';
import {FilterValueType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    titleTodo: string
    tasks: TaskType[]
    deleteTask: (id: number) => void
    changeFilterStatus: (value: FilterValueType) => void
}
export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.titleTodo}</h3>
            <div>
                <ul>
                    {props.tasks.map(t => <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.deleteTask(t.id)
                        }}>X
                        </button>
                    </li>)}
                </ul>
                <button onClick={() => {
                    props.changeFilterStatus('all')
                }}>ALL
                </button>
                <button onClick={() => {
                    props.changeFilterStatus('active')
                }}>ACTIVE
                </button>
                <button onClick={() => {
                    props.changeFilterStatus('completed')
                }}>COMPLETED
                </button>
            </div>
        </div>
    );
};

