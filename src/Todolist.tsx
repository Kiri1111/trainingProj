import React, { ChangeEvent } from "react"
import { FilterValue } from "./App"
import s from "./Todolist.module.css"
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import Checkbox from "@mui/material/Checkbox"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

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
  changeTaskStatus: (
    idTask: string,
    status: boolean,
    idTodolist: string
  ) => void
  deleteTodolist: (idTodolist: string) => void
  editTodolistTitle: (editTitle: string, idTodolist: string) => void
  changeTaskTitle: (
    editTitle: string,
    idTodolist: string,
    idTask: string
  ) => void
}
export const Todolist = (props: TodolistProps) => {
  const changeAllFilter = () =>
    props.changeFilterStatusCallBack("all", props.idTodolist)
  const changeActiveFilter = () =>
    props.changeFilterStatusCallBack("active", props.idTodolist)
  const changeCompletedFilter = () =>
    props.changeFilterStatusCallBack("completed", props.idTodolist)
  const deleteTodolistHandler = () => props.deleteTodolist(props.idTodolist)
  const addTaskCallBack = (newTaskTitle: string) =>
    props.addTaskCallBack(newTaskTitle, props.idTodolist)
  const changeTitleTodolist = (newTodolistTitle: string) =>
    props.editTodolistTitle(newTodolistTitle, props.idTodolist)

  return (
    <div className={s.todolist}>
      <div className={s.titleTask}>
        {/*<h3>{props.titleTodo}</h3>*/}
        <h3>
          <EditableSpan
            title={props.titleTodo}
            callBack={changeTitleTodolist}
          />
        </h3>
        <button onClick={deleteTodolistHandler}>X</button>
      </div>
      <AddItemForm addItemCallBack={addTaskCallBack} />
      <div>
        <List>
          {props.tasks.map((t) => {
            const deleteTaskHandler = () =>
              props.deleteTaskCallBack(t.id, props.idTodolist)
            const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
              props.changeTaskStatus(
                t.id,
                e.currentTarget.checked,
                props.idTodolist
              )
            const changeTaskTitle = (newTitleTask: string) =>
              props.changeTaskTitle(newTitleTask, props.idTodolist, t.id)

            return (
              <ListItem
                disableGutters
                disablePadding
                className={t.isDone ? s.completedTask : ""}
                key={t.id}
              >
                <div className={s.titleTask}>
                  <Checkbox
                    color="success"
                    checked={t.isDone}
                    onChange={changeStatusHandler}
                  />

                  <EditableSpan title={t.title} callBack={changeTaskTitle} />

                  <IconButton size="small" onClick={deleteTaskHandler}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </ListItem>
            )
          })}
        </List>
        <div className={s.filterButtons}>
          <ButtonGroup
            color="inherit"
            size="large"
            aria-label="Basic button group"
          >
            <Button
              onClick={changeAllFilter}
              variant={props.filterValue === "all" ? "contained" : "text"}
            >
              All
            </Button>
            <Button
              onClick={changeActiveFilter}
              variant={props.filterValue === "active" ? "contained" : "text"}
            >
              Active
            </Button>
            <Button
              onClick={changeCompletedFilter}
              variant={props.filterValue === "completed" ? "contained" : "text"}
            >
              Completed
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}
