import { useAppLogic } from "../../../common/hooks/useAppLogic"
import { AddItemForm } from "../../../common/components/AddItemForm"
import Grid from "@mui/material/Unstable_Grid2"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist"
import { FilterValue } from "../../../App"
import { Link, Navigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch } from "../../../common/hooks/useAppDispatch"
import { useAppSelector } from "../../../common/hooks/useAppSelector"
import { todolistThunks, todolistsActions } from "../todolistReducerRTK"

type TodolistsListPropsType = {}

export const TodolistsList = ({}: TodolistsListPropsType) => {
  const dispatch = useAppDispatch()

  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  useEffect(() => {
    dispatch(todolistThunks.getTodolists())
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
        {todolists.map((tl: any) => {
          let tasksForTodolist = tasks[tl.id]
          const changeFilterStatus = (value: FilterValue, idTodolist: string) =>
            dispatch(
              todolistsActions.changeTodolistFilter({
                idTodolist,
                filter: value,
              })
            )

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
    </>
  )
}
