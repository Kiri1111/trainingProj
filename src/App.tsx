import { useEffect, useState } from "react"
import "./App.module.css"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar/"
import LinearProgress from "@mui/material/LinearProgress"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import { MenuButton } from "./MenuButtons.style"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CustomizedSwitches from "./Switch"
import { getTodolistsThunk } from "./model/todolistReducer"
import { TaskType } from "./api/tasksApi"
import { RootState, useAppDispatch } from "./state/store"
import { useSelector } from "react-redux"
import { ReguestStatusType } from "./model/appReducer"
import { ErrorSnackbar } from "./components/errorSnackbar"
import { TodolistsList } from "./TodolistsList"
import { Outlet } from "react-router-dom"

export type FilterValue = "all" | "active" | "completed"

export type TasksState = {
  [key: string]: TaskType[]
}
type ThemeMode = "dark" | "light"

export function App() {
  const dispatch = useAppDispatch()

  const appStatus = useSelector<RootState, ReguestStatusType>(
    (state) => state.app.status
  )

  useEffect(() => {
    dispatch(getTodolistsThunk())
  }, [])

  const [themeMode, setThemeMode] = useState<ThemeMode>("light")

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
              Todolists
            </Typography>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton>Faq</MenuButton>
            <CustomizedSwitches onChange={changeModeHandler} />
          </Toolbar>
          {appStatus === "loading" && (
            <LinearProgress
              style={{ position: "absolute", top: "62px", width: "100%" }}
              color='success'
            />
          )}
        </AppBar>

        <Container fixed>
          <Outlet />
        </Container>
        <ErrorSnackbar />
      </ThemeProvider>
    </div>
  )
}
