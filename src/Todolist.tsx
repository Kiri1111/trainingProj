import React, { ChangeEvent, useCallback } from 'react'
import { FilterValue } from './App'
import s from './Todolist.module.css'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import { TaskView } from './Task'

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
export const Todolist = React.memo((props: TodolistProps) => {
  const changeAllFilter = () => props.changeFilterStatusCallBack('all', props.idTodolist)

  const changeActiveFilter = () => props.changeFilterStatusCallBack('active', props.idTodolist)

  const changeCompletedFilter = () =>
    props.changeFilterStatusCallBack('completed', props.idTodolist)

  const deleteTodolistHandler = () => props.deleteTodolist(props.idTodolist)

  const addTaskCallBack = useCallback(
    (newTaskTitle: string) => props.addTaskCallBack(newTaskTitle, props.idTodolist),
    []
  )

  const changeTitleTodolist = (newTodolistTitle: string) =>
    props.editTodolistTitle(newTodolistTitle, props.idTodolist)

  let tasksForTodolist = props.tasks

  if (props.filterValue === 'completed') {
    tasksForTodolist = props.tasks.filter((t) => t.isDone)
  }
  if (props.filterValue === 'active') {
    tasksForTodolist = props.tasks.filter((t) => !t.isDone)
  }

  return (
    <div>
      <div className={s.titleTodo}>
        <h3>
          <EditableSpan title={props.titleTodo} callBack={changeTitleTodolist} />
        </h3>
        <IconButton size='small' onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItemCallBack={addTaskCallBack} />
      <div>
        <List>
          {tasksForTodolist.map((t) => {
            return (
              <TaskView
                deleteTaskCallBack={props.deleteTaskCallBack}
                changeTaskTitle={props.changeTaskTitle}
                changeTaskStatus={props.changeTaskStatus}
                idTask={t.id}
                key={t.id}
                task={t}
                idTodolist={props.idTodolist}
              />
            )
          })}
        </List>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ButtonGroup color='inherit' size='large'>
            <Button
              onClick={changeAllFilter}
              variant={props.filterValue === 'all' ? 'contained' : 'text'}
            >
              All
            </Button>
            <Button
              onClick={changeActiveFilter}
              variant={props.filterValue === 'active' ? 'contained' : 'text'}
            >
              Active
            </Button>
            <Button
              onClick={changeCompletedFilter}
              variant={props.filterValue === 'completed' ? 'contained' : 'text'}
            >
              Completed
            </Button>
          </ButtonGroup>
        </Box>
      </div>
    </div>
  )
})
