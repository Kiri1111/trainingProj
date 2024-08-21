import * as React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import { useState } from 'react'

interface State {
  open: boolean
}

export function ErrorSnackbar() {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        ContentProps={{
          sx: {
            background: 'red',
          },
        }}
        autoHideDuration={40000}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        open={open}
        onClose={handleClose}
        message='I love snacks'
      />
    </Box>
  )
}
