import { v1 } from "uuid";
import { TasksState } from "../App";
import { Todolist } from "../Todolist";
import {
  AddTodolistType,
  idTodolist1,
  idTodolist2,
  RemoveTodolistType,
} from "./todolistReducer";

type AddTask = ReturnType<typeof addNewTask>;
type DeleteTask = ReturnType<typeof deleteTaskAction>;
type ChangeTaskTitle = ReturnType<typeof changeTaskTitleAction>;
type ChangeTaskStatus = ReturnType<typeof changeTaskStatusAction>;

type ActionsTaskReducer =
  | AddTask
  | DeleteTask
  | ChangeTaskTitle
  | ChangeTaskStatus
  | AddTodolistType
  | RemoveTodolistType;

const initialState = {
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
};

export const tasksReducer = (
  state: TasksState = initialState,
  action: ActionsTaskReducer
): TasksState => {
  switch (action.type) {
    case "ADD_TASK": {
      const copyState = { ...state };
      const tasks = copyState[action.payload.idTodolist];
      const newTask = { id: v1(), title: action.payload.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      copyState[action.payload.idTodolist] = newTasks;
      return copyState;
    }
    case "DELETE_TASK": {
      const copyState = { ...state };
      const filteredTasks = copyState[action.payload.idTodolist].filter(
        (t) => t.id !== action.payload.idTask
      );
      copyState[action.payload.idTodolist] = filteredTasks;
      return copyState;
    }
    case "CHANGE_TASK_TITLE": {
      // const copyState = { ...state }
      //  copyState[action.payload.idTodolist].map(t=>t.id===action.payload.idTask?{...t,title:action.payload.newTitle}:t)
      // return copyState
      return {
        ...state,
        [action.payload.idTodolist]: state[action.payload.idTodolist].map((t) =>
          t.id === action.payload.idTask
            ? { ...t, title: action.payload.newTitle }
            : t
        ),
      };

      // const copyState = { ...state }
      // const tasks = copyState[action.payload.idTodolist]
      // const task = tasks.find((t) => t.id === action.payload.idTask)
      // if (task) {
      // task.title = action.payload.newTitle
      // }
      // return copyState
    }
    case "CHANGE_TASK_STATUS": {
      return {
        ...state,
        [action.payload.idTodolist]: state[action.payload.idTodolist].map((t) =>
          t.id === action.payload.idTask
            ? { ...t, isDone: action.payload.newStatus }
            : t
        ),
      };
    }
    case "ADD_TODOLIST": {
      return { ...state, [action.payload.idTodolist]: [] };
    }
    case "REMOVE_TODOLIST": {
      delete state[action.payload.id];
      return { ...state };
    }
    default:
      return state;
  }
};

export const addNewTask = (title: string, idTodolist: string) => ({
  type: "ADD_TASK" as const,
  payload: { title, idTodolist },
});
export const deleteTaskAction = (idTask: string, idTodolist: string) => ({
  type: "DELETE_TASK" as const,
  payload: { idTask, idTodolist },
});
export const changeTaskTitleAction = (
  newTitle: string,
  idTask: string,
  idTodolist: string
) => ({
  type: "CHANGE_TASK_TITLE" as const,
  payload: { idTask, idTodolist, newTitle },
});
export const changeTaskStatusAction = (
  newStatus: boolean,
  idTask: string,
  idTodolist: string
) => ({
  type: "CHANGE_TASK_STATUS" as const,
  payload: { newStatus, idTask, idTodolist },
});
