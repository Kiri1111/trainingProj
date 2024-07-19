import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    titleTodo: string
    tasks: TaskType[]
    deleteTaskCallBack: (id: string) => void
    changeFilterStatusCallBack: (value: FilterValueType) => void
    addTaskCallBack: (newTitle: string) => void
}
export const Todolist = (props: TodolistPropsType) => {

    const {} = props

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTaskHandler = () => {
        props.addTaskCallBack(newTaskTitle)
        setNewTaskTitle('')
    }

    const setNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTaskCallBack(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const changeAllFilter = () => props.changeFilterStatusCallBack('all')
    const changeActiveFilter = () => props.changeFilterStatusCallBack('active')
    const changeCompletedFilter = () => props.changeFilterStatusCallBack('completed')

    return (
        <div>
            <h3>{props.titleTodo}</h3>
            <div>
                <input onKeyPress={onKeyPressHandler} value={newTaskTitle} onChange={setNewTaskTitleHandler}/>
                <button onClick={addTaskHandler}>+
                </button>
            </div>
            <div>
                <ul>
                    {props.tasks.map(t => <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.deleteTaskCallBack(t.id)
                        }}>X
                        </button>
                    </li>)}
                </ul>
                <button onClick={changeAllFilter}>ALL
                </button>
                <button onClick={changeActiveFilter}>ACTIVE
                </button>
                <button onClick={changeCompletedFilter}>COMPLETED
                </button>
            </div>
        </div>
    );
};

