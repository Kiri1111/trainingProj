import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import {Button} from "./Button";

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

    // const {} = props

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const addTaskHandler = () => {
        props.addTaskCallBack(newTaskTitle)
        setNewTaskTitle('')
    }
    const setNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
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
                <input onKeyUp={onKeyUpHandler} value={newTaskTitle} onChange={setNewTaskTitleHandler}/>
                <Button title={'+'} callBack={addTaskHandler}/>
            </div>
            <div>
                <ul>
                    {props.tasks.map((t) => {
                        const deleteTaskHandler = () => {
                            props.deleteTaskCallBack(t.id)
                        }
                        return <li key={t.id}>
                            <input type={"checkbox"} checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button title={'X'} callBack={deleteTaskHandler}/>
                        </li>
                    })}
                </ul>
                <Button title={'ALL'} callBack={changeAllFilter}/>
                <Button title={'ACTIVE'} callBack={changeActiveFilter}/>
                <Button title={'COMPLETED'} callBack={changeCompletedFilter}/>
            </div>
        </div>
    );
};

