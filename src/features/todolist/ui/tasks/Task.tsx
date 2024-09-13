import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { filterButtonsContainerSx, getListItemSx } from "./task.style"
import Box from "@mui/material/Box"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { TaskStatuses, TaskType } from "../../../../api/tasksApi"
import { EditableSpan } from "../../../../common/components/EditableSpan"

type TaskProps = {
  deleteTaskCallBack: (idTask: string, idTodolist: string) => void
  changeTaskStatus: (
    idTask: string,
    checked: TaskStatuses,
    idTodolist: string
  ) => void
  changeTaskTitle: (title: string, idTodolist: string, idTask: string) => void
  idTodolist: string
  idTask: string
  task: TaskType
}

export const TaskView = ({
  deleteTaskCallBack,
  changeTaskStatus,
  changeTaskTitle,
  idTask,
  idTodolist,
  task,
}: TaskProps) => {
  const deleteTaskHandler = () => deleteTaskCallBack(idTask, idTodolist)
  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let value = TaskStatuses.InProgress
    if (e.currentTarget.checked) {
      value = TaskStatuses.Completed
    }
    changeTaskStatus(idTask, value, idTodolist)
  }
  const changeTaskTitleHandler = (newTitleTask: string) =>
    changeTaskTitle(newTitleTask, idTodolist, idTask)

  return (
    <ListItem
      sx={getListItemSx(task.status === TaskStatuses.Completed)}
      disableGutters
      disablePadding
      key={task.id}>
      <Box sx={filterButtonsContainerSx}>
        <Checkbox
          color='success'
          checked={task.status === TaskStatuses.Completed}
          onChange={changeStatusHandler}
        />
        <EditableSpan title={task.title} callBack={changeTaskTitleHandler} />
      </Box>
      <IconButton size='small' onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
