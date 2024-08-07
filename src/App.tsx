import React, { useState } from 'react'
import './App.module.css'
import { Task, Todolist } from './Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar/'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import { MenuButton } from './MenuButtons.style'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CustomizedSwitches from './Switch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './state/store'
import {
  addNewTask,
  changeTaskStatusAction,
  changeTaskTitleAction,
  deleteTaskAction,
} from './model/tasksReducer'
import {
  addTodolistAction,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
} from './model/todolistReducer'

export type FilterValue = 'all' | 'active' | 'completed'
export type TodolistType = {
  id: string
  title: string
  filter: FilterValue
}
export type TasksState = {
  [key: string]: Task[]
}
type ThemeMode = 'dark' | 'light'

export function App() {
  const tasks = useSelector<RootState, TasksState>((state) => state.tasks)
  const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists)
  const dispatch = useDispatch()

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const addTask = (title: string, idTodolist: string) => dispatch(addNewTask(title, idTodolist))

  const deleteTask = (idTask: string, idTodolist: string) => {
    dispatch(deleteTaskAction(idTask, idTodolist))
  }
  const changeTaskStatus = (idTask: string, status: boolean, idTodolist: string) => {
    dispatch(changeTaskStatusAction(status, idTask, idTodolist))
  }
  const deleteTodolist = (idTodolist: string) => {
    dispatch(removeTodolist(idTodolist))
  }
  const addTodolist = (newTodolistTitle: string) => {
    const idTodolist = v1()
    dispatch(addTodolistAction(newTodolistTitle, idTodolist))
  }
  const changeTitleTodolist = (editTitle: string, idTodolist: string) => {
    dispatch(changeTodolistTitle(editTitle, idTodolist))
  }
  const changeTaskTitle = (editTitle: string, idTodolist: string, idTask: string) => {
    dispatch(changeTaskTitleAction(editTitle, idTask, idTodolist))
  }
  const changeModeHandler = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light')

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#ffffff',
      },
    },
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar color='success' sx={{ opacity: '0.8', mb: '30px' }} position='static'>
          <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Todolists
            </Typography>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton>Faq</MenuButton>
            <CustomizedSwitches onChange={changeModeHandler} />
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid sx={{ mb: '30px' }} container>
            <AddItemForm addItemCallBack={addTodolist} />
          </Grid>

          <Grid container spacing={4}>
            {todolists.map((tl) => {
              let tasksForTodolist = tasks[tl.id]
              // if (tl.filter === 'completed') {
              //   tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
              // }
              // if (tl.filter === 'active') {
              //   tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
              // }
              const changeFilterStatus = (value: FilterValue, idTodolist: string) =>
                dispatch(changeTodolistFilter(value, idTodolist))

              return (
                <Grid key={tl.id}>
                  <Paper elevation={6} sx={{ p: '0 20px 20px 20px' }}>
                    <Todolist
                      idTodolist={tl.id}
                      titleTodo={tl.title}
                      filterValue={tl.filter}
                      tasks={tasksForTodolist}
                      deleteTaskCallBack={deleteTask}
                      changeFilterStatusCallBack={changeFilterStatus}
                      addTaskCallBack={addTask}
                      changeTaskStatus={changeTaskStatus}
                      deleteTodolist={deleteTodolist}
                      editTodolistTitle={changeTitleTodolist}
                      changeTaskTitle={changeTaskTitle}
                    />
                  </Paper>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}
