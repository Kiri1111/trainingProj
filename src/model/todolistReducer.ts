import { v1 } from "uuid";
import { FilterValue, TodolistType } from "../App";

export type AddTodolistType = ReturnType<typeof addTodolistAction>;
export type RemoveTodolistType = ReturnType<typeof removeTodolist>;
type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitle>;
type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilter>;

type ActionsTypes =
  | AddTodolistType
  | RemoveTodolistType
  | ChangeTodolistTitle
  | ChangeTodolistFilter;

export const idTodolist1 = v1();
export const idTodolist2 = v1();

const initialState: TodolistType[] = [
  { id: idTodolist1, title: "First", filter: "all" },
  { id: idTodolist2, title: "Second", filter: "all" },
];

export const todolistReducer = (
  state: TodolistType[] = initialState,
  action: ActionsTypes
): TodolistType[] => {
  switch (action.type) {
    case "ADD_TODOLIST": {
      return [
        {
          id: action.payload.idTodolist,
          title: action.payload.title,
          filter: "all",
        },
        ...state,
      ];
    }
    case "REMOVE_TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.id);
    }
    case "CHANGE_TODOLIST_TITLE": {
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, title: action.payload.newTitle }
          : tl
      );
    }
    case "CHANGE_TODOLIST_FILTER": {
      return state.map((tl) =>
        tl.id === action.payload.id
          ? { ...tl, filter: action.payload.newFilterStatus }
          : tl
      );
    }
    default:
      return state;
  }
};

export const addTodolistAction = (title: string, idTodolist: string) => ({
  type: "ADD_TODOLIST" as const,
  payload: { title, idTodolist },
});
export const removeTodolist = (id: string) => ({
  type: "REMOVE_TODOLIST" as const,
  payload: { id },
});
export const changeTodolistTitle = (newTitle: string, id: string) => ({
  type: "CHANGE_TODOLIST_TITLE" as const,
  payload: { newTitle, id },
});
export const changeTodolistFilter = (
  newFilterStatus: FilterValue,
  id: string
) => ({
  type: "CHANGE_TODOLIST_FILTER" as const,
  payload: { newFilterStatus, id },
});
