import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Question() {
  return (
    <>
      <Typography variant="h3" noWrap component="h2" sx={{ textAlign: 'center', marginBottom: 5 }}>
        Question
      </Typography>

      <Typography noWrap component="div" sx={{ marginBottom: 5 }}>
        Who wrote and directed the 1986 film 'Platoon'?
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <Button fullWidth variant="contained">Tony</Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Button fullWidth variant="contained">Loc</Button>
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <Button fullWidth variant="contained">Hoa</Button>
      </Box>

      <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between'}}>
        <Typography noWrap component="div" sx={{  }}>
          Score: 2/2
        </Typography>
        <Typography noWrap component="div" sx={{  }}>
          Timer: 0:30
        </Typography>
      </Box>
    </>
  )
}

export default Question