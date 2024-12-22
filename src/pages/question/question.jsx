import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

// get questions: https://opentdb.com/api.php?amount=2&category=11&difficulty=easy&type=multiple


function Question() {
  const { categoryId, type, difficulty, amount } = useSelector(state => state.dashboard);
  const [questions, setQuestions] = React.useState([]);
  const [questionIndex, setQuestionIndex] = React.useState(0);

  React.useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`)
      const data = await response.json();
      setQuestions(data.results);
    };

    if(!amount || !categoryId || !type || !difficulty) return;
    fetchQuestions();
  }, [amount, categoryId, type, difficulty])


  return (
    <>
      <Typography variant="h3" noWrap component="h2" sx={{ textAlign: 'center', marginBottom: 5 }}>
        Question {questionIndex + 1}
      </Typography>

      <Typography noWrap component="div" sx={{ marginBottom: 5 }}>
        {questions[questionIndex]?.question}
      </Typography>

      {questions[questionIndex]?.incorrect_answers.map(item => (
        <>
          <Box key={item} sx={{ marginBottom: 2 }}>
            <Button fullWidth variant="contained">{item}</Button>
          </Box>
        </>
      ))}

      <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between'}}>
        <Typography noWrap component="div" sx={{  }}>
          Score: 0/{questions.length}
        </Typography>
        <Typography noWrap component="div" sx={{  }}>
          Timer: 0:30
        </Typography>
      </Box>
    </>
  )
}

export default Question