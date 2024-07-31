import React, { useState } from "react"
import "./App.module.css"
import { Task, Todolist } from "./Todolist"
import { v1 } from "uuid"
import { AddItemForm } from "./AddItemForm"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar/"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import Paper from "@mui/material/Paper"
import { MenuButton } from "./MenuButtons.style"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CustomizedSwitches from "./Switch"

export type FilterValue = "all" | "active" | "completed"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValue
}
export type TasksState = {
  [key: string]: Task[]
}
type ThemeMode = "dark" | "light"

// const titleCar = "101010101-101010-101001-101101"

export function App() {
  // const obj = {
  //   name: "Ali",
  //   age: 23,
  //   [titleCar]: [
  //     { brand: "bmw", volume: 3 },
  //     { brand: "audi", volume: 2 },
  //     { brand: "mini", volume: 1 },
  //   ],
  // }

  // const copy = obj[titleCar].filter((el) => el.volume === 3)

  // console.log(copy)
  // console.log(copy === obj[titleCar])

  // console.log([1, 2, 3, 4, 5])

  const idTodolist1 = v1()
  const idTodolist2 = v1()

  const [tasks, setTasks] = useState<TasksState>({
    [idTodolist1]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "HTML", isDone: false },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "HTML", isDone: false },
    ],
    [idTodolist2]: [
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "HTML", isDone: false },
    ],
  })

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: idTodolist1, title: "First", filter: "all" },
    { id: idTodolist2, title: "Second", filter: "all" },
  ])

  const [themeMode, setThemeMode] = useState<ThemeMode>("light")

  const addTask = (title: string, idTodolist: string) =>
    setTasks({
      ...tasks,
      [idTodolist]: [{ id: v1(), title, isDone: false }, ...tasks[idTodolist]],
    })
  const deleteTask = (idTask: string, idTodolist: string) =>
    setTasks({
      ...tasks,
      [idTodolist]: tasks[idTodolist].filter((t) => t.id !== idTask),
    })
  const changeFilterStatus = (value: FilterValue, idTodolist: string) => {
    setTodolists(
      todolists.map((tl) =>
        tl.id === idTodolist ? { ...tl, filter: value } : tl
      )
    )
  }
  const changeTaskStatus = (
    idTask: string,
    status: boolean,
    idTodolist: string
  ) => {
    setTasks({
      ...tasks,
      [idTodolist]: tasks[idTodolist].map((t) =>
        t.id === idTask ? { ...t, isDone: status } : t
      ),
    })
  }
  const deleteTodolist = (idTodolist: string) => {
    setTodolists(todolists.filter((tl) => tl.id !== idTodolist))
    delete tasks[idTodolist]
    setTasks({ ...tasks })
  }
  const addTodolist = (newTodolistTitle: string) => {
    const idTodolist = v1()
    setTodolists([
      { id: idTodolist, title: newTodolistTitle, filter: "all" },
      ...todolists,
    ])
    setTasks({ ...tasks, [idTodolist]: [] })
  }
  const changeTitleTodolist = (editTitle: string, idTodolist: string) => {
    setTodolists(
      todolists.map((tl) =>
        tl.id === idTodolist ? { ...tl, title: editTitle } : tl
      )
    )
  }
  const changeTaskTitle = (
    editTitle: string,
    idTodolist: string,
    idTask: string
  ) => {
    setTasks({
      ...tasks,
      [idTodolist]: tasks[idTodolist].map((t) =>
        t.id === idTask ? { ...t, title: editTitle } : t
      ),
    })
  }
  const changeModeHandler = () =>
    setThemeMode(themeMode === "light" ? "dark" : "light")

  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#ffffff",
      },
    },
  })

  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar
          color='success'
          sx={{ opacity: "0.8", mb: "30px" }}
          position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Todolist
            </Typography>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton>Faq</MenuButton>
            <CustomizedSwitches onChange={changeModeHandler} />
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid sx={{ mb: "30px" }} container>
            <AddItemForm addItemCallBack={addTodolist} />
          </Grid>

          <Grid container spacing={4}>
            {todolists.map((tl) => {
              let tasksForTodolist = tasks[tl.id]
              if (tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
              }
              if (tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
              }
              return (
                <Grid key={tl.id}>
                  <Paper elevation={6} sx={{ p: "0 20px 20px 20px" }}>
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
