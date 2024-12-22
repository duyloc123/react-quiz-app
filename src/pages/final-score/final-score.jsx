import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function FinalScore() {
  return (
    <>
      <Typography variant="h3" noWrap component="h2" sx={{ marginBottom: 5 }}>
        Final Score: 0
      </Typography>

      <TextField fullWidth label="First Name" variant="standard" /> <br /><br />
      <TextField fullWidth label="Last Name" variant="standard" /><br /><br />
      <TextField fullWidth label="Email Name" variant="standard" />

      <Box sx={{ textAlign: 'right', marginTop: 5 }}>
        <Button size="small" variant="contained">Submit</Button>
      </Box>
    </>
  )
}

export default FinalScore