import { useEffect, useState } from 'react'
import './App.module.css'
import { useAppLogic } from './useAppLogic'
import { AddItemForm } from './AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar/'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import { MenuButton } from './MenuButtons.style'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CustomizedSwitches from './Switch'
import { changeTodolistFilter, getTodolistsThunk, setTodolists } from './model/todolistReducer'
import { TaskType } from './api/tasksApi'
import { Todolist } from './Todolist'
import { RootState, useAppDispatch } from './state/store'
import { useSelector } from 'react-redux'
import { ReguestStatusType } from './model/appReducer'

export type FilterValue = 'all' | 'active' | 'completed'

export type TasksState = {
  [key: string]: TaskType[]
}
type ThemeMode = 'dark' | 'light'

export function App() {
  const dispatch = useAppDispatch()

  const appStatus = useSelector<RootState, ReguestStatusType>((state) => state.app.status)

  useEffect(() => {
    dispatch(getTodolistsThunk())
  }, [])

  const {
    addTask,
    addTodolist,
    changeTaskStatus,
    changeTaskTitle,
    changeTitleTodolist,
    deleteTask,
    deleteTodolist,
    tasks,
    todolists,
  } = useAppLogic()

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

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
          {appStatus === 'loading' && (
            <LinearProgress
              style={{ position: 'absolute', top: '62px', width: '100%' }}
              color='success'
            />
          )}
        </AppBar>

        <Container fixed>
          <Grid sx={{ mb: '30px' }} container>
            <AddItemForm addItemCallBack={addTodolist} />
          </Grid>

          <Grid container spacing={4}>
            {todolists.map((tl) => {
              let tasksForTodolist = tasks[tl.id]
              const changeFilterStatus = (value: FilterValue, idTodolist: string) =>
                dispatch(changeTodolistFilter(value, idTodolist))

              return (
                <Grid key={tl.id}>
                  <Paper elevation={6} sx={{ backgroundColor: '#d3d3d3', p: '0 20px 20px 20px' }}>
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
