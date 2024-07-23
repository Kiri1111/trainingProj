import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import {Button} from "./Button";
import s from "./Todolist.module.css"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    idTodolist: string
    filterValue: FilterValueType
    titleTodo: string
    tasks: TaskType[]
    deleteTaskCallBack: (id: string, idTodolist: string) => void
    changeFilterStatusCallBack: (value: FilterValueType, idTodolist: string) => void
    addTaskCallBack: (newTitle: string, idTodolist: string) => void
    changeTaskStatus: (idTask: string, status: boolean, idTodolist: string) => void
    deleteTodolist: (idTodolist: string) => void
}
export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<null | string>(null)
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTaskCallBack(newTaskTitle.trim(), props.idTodolist)
        } else {
            setError('Title is required')
        }
        setNewTaskTitle('')
    }
    const setNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTaskTitle.trim() !== '') {
            props.addTaskCallBack(newTaskTitle.trim(), props.idTodolist)
            setNewTaskTitle('')
        }
        if (e.key === 'Enter' && newTaskTitle.trim() === '')
            setError('Title is required')
    }
    const changeAllFilter = () => props.changeFilterStatusCallBack('all', props.idTodolist)
    const changeActiveFilter = () => props.changeFilterStatusCallBack('active', props.idTodolist)
    const changeCompletedFilter = () => props.changeFilterStatusCallBack('completed', props.idTodolist)
    const deleteTodolistHandler = () => props.deleteTodolist(props.idTodolist)

    return (
        <div className={s.todolist}>
            <h3>{props.titleTodo}</h3>
            <button onClick={deleteTodolistHandler}>X</button>
            <div className={s.addTaskBlock}>
                <input className={error ? s.errorInput : ''} onKeyUp={onKeyUpHandler} value={newTaskTitle}
                       onChange={setNewTaskTitleHandler}/>
                <Button title={'+'} callBack={addTaskHandler}/>
            </div>
            {error && <div className={s.errorText}>{error}</div>}
            <div>
                <ul>
                    {props.tasks.map((t) => {
                        const deleteTaskHandler = () => props.deleteTaskCallBack(t.id, props.idTodolist)
                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.idTodolist)

                        return <li className={t.isDone ? s.completedTask : ''}
                                   key={t.id}>
                            <div className={s.title}>
                                <input type={"checkbox"} onChange={changeStatusHandler} checked={t.isDone}/>
                                <span className={s.title}>{t.title}</span>
                                <Button title={'X'} callBack={deleteTaskHandler}/>
                            </div>
                        </li>
                    })}
                </ul>
                <div className={s.filterButtons}>
                    <Button className={props.filterValue === 'all' ? 'active-button' : undefined} title={'ALL'}
                            callBack={changeAllFilter}/>
                    <Button className={props.filterValue === "active" ? 'active-button' : undefined} title={'ACTIVE'}
                            callBack={changeActiveFilter}/>
                    <Button className={props.filterValue === "completed" ? 'active-button' : undefined}
                            title={'COMPLETED'}
                            callBack={changeCompletedFilter}/>
                </div>
            </div>
        </div>
    );
};

