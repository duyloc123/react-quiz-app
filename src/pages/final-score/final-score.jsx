import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form"

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { setUser } from '../../redux/dashboard.action';

function FinalScore() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const score = useSelector(state => state.question.score);
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    },
  })
  const onSubmit = (data) => {
    const user = {
      id: Date.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      score
    }
    dispatch(setUser(user));
    navigate('/leaderboard')
  }

  return (
    <>
      <Typography variant="h3" noWrap component="h2" sx={{ marginBottom: 5 }}>
        Final Score: {score}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField 
              fullWidth 
              label="First Name" 
              variant="standard" 
              error={Boolean(errors.firstName)}
              helperText={errors.firstName ? "Please enter first name" : ''}
              {...register("firstName", { required: true })} 
              {...field}  
            />
          )}
        />
        <br /><br />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField 
              fullWidth 
              label="Last Name" 
              variant="standard" 
              error={Boolean(errors.lastName)}
              helperText={errors.lastName ? "Please enter last name" : ''}
              {...register("lastName", { required: true })} 
              {...field}  
            />
          )}
        />
        <br /><br />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField 
              fullWidth 
              label="Email" 
              type="email"
              variant="standard" 
              error={Boolean(errors.email)}
              helperText={errors.email ? "Please enter email" : ''}
              {...register("email", { required: true })} 
              {...field}  
            />
          )}
        />
        <Box sx={{ textAlign: 'right', marginTop: 5 }}>
          <Button type="submit" size="small" variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      </form>
      
    </>
  )
}

export default FinalScore