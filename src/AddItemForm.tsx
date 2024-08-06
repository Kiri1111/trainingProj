import { ChangeEvent, KeyboardEvent, useState } from 'react'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import TextField from '@mui/material/TextField'
import React from 'react'

type AddItemFormProps = {
  addItemCallBack: (newTitle: string) => void
}
export const AddItemForm = React.memo(({ addItemCallBack }: AddItemFormProps) => {
  const [newItemTitle, setNewItemTitle] = useState('')
  const [error, setError] = useState<null | string>(null)

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newItemTitle.trim() !== '') {
      addItemCallBack(newItemTitle.trim())
      setNewItemTitle('')
    }
    if (e.key === 'Enter' && newItemTitle.trim() === '') setError('Title is required')
  }
  const addTaskHandler = () => {
    if (newItemTitle.trim() !== '') {
      addItemCallBack(newItemTitle.trim())
    } else {
      setError('Title is required')
    }
    setNewItemTitle('')
  }
  const setNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    setNewItemTitle(e.currentTarget.value)
  }
  console.log('ADD ITEM FORM')
  return (
    <div>
      <div>
        <TextField
          value={newItemTitle}
          onKeyUp={onKeyUpHandler}
          onChange={setNewTaskTitleHandler}
          error={!!error}
          helperText={error}
          size='small'
          label='Enter text'
          variant='outlined'
        />

        <Button
          sx={{ ml: '10px' }}
          color='inherit'
          variant={'contained'}
          endIcon={<SendIcon />}
          onClick={addTaskHandler}
        >
          ADD
        </Button>
      </div>
    </div>
  )
})
