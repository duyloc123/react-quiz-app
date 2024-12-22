import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { setAmount, setCategory, setDifficulty, setType } from '../../redux/dashboard.action';

// get questions: https://opentdb.com/api.php?amount=2&category=11&difficulty=easy&type=multiple
// get categories: https://opentdb.com/api_category.php

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const categoryId = useSelector(state => state.dashboard.categoryId);
  // const type = useSelector(state => state.dashboard.type);
  // const difficulty = useSelector(state => state.dashboard.difficulty);
  // const amount = useSelector(state => state.dashboard.amount);
  const { categoryId, type, difficulty, amount } = useSelector(state => state.dashboard);

  const [cateogries, setCategories] = React.useState([]);

  React.useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('https://opentdb.com/api_category.php');
      const data = await response.json();
      setCategories(data.trivia_categories);
    }
    fetchCategories();
  }, [])

  function onChangeCategory(e) {
    dispatch(setCategory(e.target.value))
  }

  function onChangeDifficulty(e) {
    dispatch(setDifficulty(e.target.value))
  }

  function onChangeType(e) {
    dispatch(setType(e.target.value))
  }

  function onChangeAmount(e) {
    dispatch(setAmount(e.target.value))
  }

  function navigateToQuestion() {
    navigate('/question')
  }

  return (
    <>
      <Typography variant="h3" noWrap component="h2" sx={{ textAlign: 'center', marginBottom: 5 }}>
        Quiz App
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Category"
          value={categoryId || ''}
          onChange={onChangeCategory}
        >
          {cateogries.map(cat => (
            <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br /><br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Difficulty"
          value={difficulty || ''}
          onChange={onChangeDifficulty}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type || ''}
          onChange={onChangeType}
        >
          <MenuItem value="multiple">Multiple Choice</MenuItem>
          <MenuItem value="boolean">True/False</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
      <FormControl fullWidth>
        <TextField 
          id="outlined-basic" 
          label="Amount of Question" 
          variant="outlined" 
          defaultValue={amount} 
          onChange={onChangeAmount}
        />
      </FormControl>

      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button variant="contained" onClick={navigateToQuestion}>Get Started</Button>
      </Box>
      
    </>
  )
}

export default Dashboard