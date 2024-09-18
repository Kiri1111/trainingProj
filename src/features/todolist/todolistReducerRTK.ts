import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { v1 } from "uuid"
import { TodolistType, todolistsApi } from "../../api/todolistsApi"
import { FilterValue } from "../../App"
import { appActions } from "../../model/appReducerRTK"

export type TodolistDomainType = TodolistType & { filter: FilterValue }
type InitialStateType = typeof initialState
type dataForUpdateTodolistType = { todolistId: string; newTitle: string }

export const idTodolist1 = v1()
export const idTodolist2 = v1()

const initialState: TodolistDomainType[] = []

//thunks

export const getTodolists = createAsyncThunk(
  "todolists/getTodolists",
  async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    try {
      const res = await todolistsApi.getTodolists()
      return { res }
    } catch (e: any) {
      dispatch(appActions.setAppError({ error: e.toString() }))
      rejectWithValue(null)
    } finally {
      dispatch(appActions.changeAppStatus({ status: "succes" }))
    }
  }
)

export const addTodolist = createAsyncThunk(
  "todolist/addTodolist",
  async (title: string, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    try {
      const res = await todolistsApi.createTodolist(title)
      if (res.data.resultCode === 0) {
        return { res }
      } else {
        dispatch(appActions.setAppError({ error: res.data.messages[0] }))
      }
    } catch (e: any) {
      dispatch(appActions.setAppError({ error: e.toString() }))
      rejectWithValue(null)
    } finally {
      dispatch(appActions.changeAppStatus({ status: "succes" }))
    }
  }
)

export const deleteTodolist = createAsyncThunk(
  "todolist/deleteTodolist",
  async (todolistId: string, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    try {
      const res = await todolistsApi.deleteTodolist(todolistId)
      if (res.data.resultCode === 0) {
        return { res, todolistId }
      }
    } catch (e: any) {
      dispatch(appActions.setAppError({ error: e.toString() }))
      rejectWithValue(null)
    } finally {
      dispatch(appActions.changeAppStatus({ status: "succes" }))
    }
  }
)

export const updateTodolist = createAsyncThunk(
  "todolist/updateTodolist",
  async (arg: dataForUpdateTodolistType, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    dispatch(appActions.changeAppStatus({ status: "loading" }))
    try {
      const res = await todolistsApi.updateTodolist(
        arg.todolistId,
        arg.newTitle
      )
      if (res.data.resultCode === 0) {
        return { arg }
      }
    } catch (e: any) {
      dispatch(appActions.setAppError({ error: e.toString() }))
      rejectWithValue(null)
    } finally {
      dispatch(appActions.changeAppStatus({ status: "succes" }))
    }
  }
)

const slice = createSlice({
  name: "todolist",
  initialState,

  reducers: {
    addTodolist: (
      state: InitialStateType,
      action: PayloadAction<{ todolist: TodolistDomainType }>
    ) => {
      state.unshift({ ...action.payload.todolist, filter: "all" })
    },
    changeTodolistFilter: (
      state: InitialStateType,
      action: PayloadAction<{ idTodolist: string; filter: FilterValue }>
    ) => {
      const todo = state.find((t) => t.id === action.payload.idTodolist)
      if (todo) {
        todo.filter = action.payload.filter
      }
    },
    setTodolists: (
      state,
      action: PayloadAction<{ todolists: TodolistType[] }>
    ) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all" }))
    },
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      state.splice(index, 1)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodolists.fulfilled, (state, action) => {
        return action.payload?.res.data.map((tl) => ({ ...tl, filter: "all" }))
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload!.res.data.data.item, filter: "all" })
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tl) => tl.id === action.payload?.todolistId
        )
        state.splice(index, 1)
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const index = state.findIndex(
          (tl) => tl.id === action.payload?.arg.todolistId
        )
        state[index].title = action.payload!.arg.newTitle
      })
  },
})

export const todolistReducer = slice.reducer

export const todolistThunks = {
  getTodolists,
  addTodolist,
  deleteTodolist,
  updateTodolist,
}

export const todolistsActions = slice.actions
