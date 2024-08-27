import { useAppLogic } from "./useAppLogic"
import { AddItemForm } from "./components/AddItemForm"
import Grid from "@mui/material/Unstable_Grid2"
import Paper from "@mui/material/Paper"
import { changeTodolistFilter } from "./model/todolistReducer"
import { Todolist } from "./Todolist"
import { RootState, useAppDispatch } from "./state/store"
import { FilterValue } from "./App"
import { Link, Navigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

type TodolistsListPropsType = {}

export const TodolistsList = ({}: TodolistsListPropsType) => {
  const dispatch = useAppDispatch()

  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.auth.isLoggedIn
  )

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

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid sx={{ mb: "30px" }} container>
        <AddItemForm addItemCallBack={addTodolist} />
        <Link style={{ padding: "17px" }} to={"/login"}>
          Go to login page
        </Link>
      </Grid>

      <Grid container spacing={4}>
        {todolists.map((tl) => {
          let tasksForTodolist = tasks[tl.id]
          const changeFilterStatus = (value: FilterValue, idTodolist: string) =>
            dispatch(changeTodolistFilter(value, idTodolist))

          return (
            <Grid key={tl.id}>
              <Paper
                elevation={6}
                sx={{ backgroundColor: "#d3d3d3", p: "0 20px 20px 20px" }}>
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
    </>
  )
}
