import ListItem from '@mui/material/ListItem'
import { ChangeEvent } from 'react'
import { filterButtonsContainerSx, getListItemSx } from './todolist.style'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Task } from './Todolist'

type TaskProps = {
  deleteTaskCallBack: (idTask: string, idTodolist: string) => void
  changeTaskStatus: (idTask: string, checked: boolean, idTodolist: string) => void
  changeTaskTitle: (title: string, idTodolist: string, idTask: string) => void
  idTodolist: string
  idTask: string
  task: Task
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
  const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
    changeTaskStatus(idTask, e.currentTarget.checked, idTodolist)
  const changeTaskTitleHandler = (newTitleTask: string) =>
    changeTaskTitle(newTitleTask, idTodolist, idTask)

  return (
    <ListItem sx={getListItemSx(task.isDone)} disableGutters disablePadding key={task.id}>
      <Box sx={filterButtonsContainerSx}>
        <Checkbox color='success' checked={task.isDone} onChange={changeStatusHandler} />
        <EditableSpan title={task.title} callBack={changeTaskTitleHandler} />
      </Box>
      <IconButton size='small' onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
