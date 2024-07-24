import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValue} from "./App";
import {Button} from "./Button";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

type TodolistProps = {
    idTodolist: string
    filterValue: FilterValue
    titleTodo: string
    tasks: Task[]
    deleteTaskCallBack: (id: string, idTodolist: string) => void
    changeFilterStatusCallBack: (value: FilterValue, idTodolist: string) => void
    addTaskCallBack: (newTitle: string, idTodolist: string) => void
    changeTaskStatus: (idTask: string, status: boolean, idTodolist: string) => void
    deleteTodolist: (idTodolist: string) => void
}
export const Todolist = (props: TodolistProps) => {
    const changeAllFilter = () => props.changeFilterStatusCallBack('all', props.idTodolist)
    const changeActiveFilter = () => props.changeFilterStatusCallBack('active', props.idTodolist)
    const changeCompletedFilter = () => props.changeFilterStatusCallBack('completed', props.idTodolist)
    const deleteTodolistHandler = () => props.deleteTodolist(props.idTodolist)

    const addTaskCallBack = (newTaskTitle: string) => props.addTaskCallBack(newTaskTitle, props.idTodolist)

    return (
        <div className={s.todolist}>
            
            <div className={s.titleTask}>
                <h3>{props.titleTodo}</h3>
                <button onClick={deleteTodolistHandler}>X</button>
            </div>
            <AddItemForm addItemCallBack={addTaskCallBack}/>
            <div>
                <ul>
                    {props.tasks.map((t) => {
                        const deleteTaskHandler = () => props.deleteTaskCallBack(t.id, props.idTodolist)
                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.idTodolist)

                        return <li className={t.isDone ? s.completedTask : ''}
                                   key={t.id}>
                            <div className={s.titleTask}>
                                <input type={"checkbox"} onChange={changeStatusHandler} checked={t.isDone}/>
                                <span className={s.titleTask}>{t.title}</span>
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

