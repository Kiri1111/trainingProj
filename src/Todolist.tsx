import React, {ChangeEvent} from 'react';
import {FilterValue} from "./App";
import {ButtonCustom} from "./Button";
import s from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    editTodolistTitle: (editTitle: string, idTodolist: string) => void
    changeTaskTitle: (editTitle: string, idTodolist: string, idTask: string) => void
}
export const Todolist = (props: TodolistProps) => {
    const changeAllFilter = () => props.changeFilterStatusCallBack('all', props.idTodolist)
    const changeActiveFilter = () => props.changeFilterStatusCallBack('active', props.idTodolist)
    const changeCompletedFilter = () => props.changeFilterStatusCallBack('completed', props.idTodolist)
    const deleteTodolistHandler = () => props.deleteTodolist(props.idTodolist)
    const addTaskCallBack = (newTaskTitle: string) => props.addTaskCallBack(newTaskTitle, props.idTodolist)
    const changeTitleTodolist = (newTodolistTitle: string) => props.editTodolistTitle(newTodolistTitle, props.idTodolist)

    return (
        <div className={s.todolist}>

            <div className={s.titleTask}>
                {/*<h3>{props.titleTodo}</h3>*/}
                <h3>
                    <EditableSpan title={props.titleTodo} callBack={changeTitleTodolist}/>
                </h3>
                <button onClick={deleteTodolistHandler}>X</button>
            </div>
            <AddItemForm addItemCallBack={addTaskCallBack}/>
            <div>
                <ul>
                    {props.tasks.map((t) => {
                        const deleteTaskHandler = () => props.deleteTaskCallBack(t.id, props.idTodolist)
                        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.idTodolist)
                        const changeTaskTitle = (newTitleTask: string) => props.changeTaskTitle(newTitleTask, props.idTodolist, t.id)


                        return <li className={t.isDone ? s.completedTask : ''}
                                   key={t.id}>
                            <div className={s.titleTask}>
                                <input type={"checkbox"} onChange={changeStatusHandler} checked={t.isDone}/>
                                <EditableSpan title={t.title} callBack={changeTaskTitle}/>
                                <ButtonCustom title={'X'} callBack={deleteTaskHandler}/>
                            </div>
                        </li>
                    })}
                </ul>
                <div className={s.filterButtons}>
                    <ButtonCustom className={props.filterValue === 'all' ? 'active-button' : undefined} title={'ALL'}
                                  callBack={changeAllFilter}/>
                    <ButtonCustom className={props.filterValue === "active" ? 'active-button' : undefined}
                                  title={'ACTIVE'}
                                  callBack={changeActiveFilter}/>
                    <ButtonCustom className={props.filterValue === "completed" ? 'active-button' : undefined}
                                  title={'COMPLETED'}
                                  callBack={changeCompletedFilter}/>
                </div>
            </div>
        </div>
    );
};

