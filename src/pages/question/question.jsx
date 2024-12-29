import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { decode } from 'html-entities';
import { useSelector, useDispatch } from 'react-redux';
import { generateAnswer } from '../../utils/generateAnswer';
import { formatTime } from '../../utils/formatTime';

import { updateScore } from '../../redux/question.action';
import { useNavigate } from 'react-router-dom';
import { DIFFICULTY_TIME } from '../../configs';

// get questions: https://opentdb.com/api.php?amount=2&category=11&difficulty=easy&type=multiple

function Question() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, type, difficulty, amount } = useSelector(state => state.dashboard);
  const score = useSelector(state => state.question.score);
  const [dataSource, setDatasource] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [countTime, setCountTime] = React.useState(0);

  // fetch api
  React.useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`)
      const data = await response.json();
      const answer = generateAnswer(data.results, questionIndex)
      setQuestions(answer);
      setDatasource(data.results);
      setCountTime(DIFFICULTY_TIME[difficulty])
    };

    if(!amount || !categoryId || !type || !difficulty) return;
    fetchQuestions();
  }, [amount, categoryId, type, difficulty])

  // next question
  React.useEffect(() => {
    if(questionIndex > 0) {
      const answer = generateAnswer(dataSource, questionIndex)
      setQuestions(answer);
    }
  }, [dataSource, questionIndex])

  // timer
  React.useEffect(() => {
    if(questions.length === 0) return;

    const timer = setInterval(() => {
      setCountTime(prevState => {
        if(prevState > 0) {
          return prevState - 1
        } else {
          // auto next question when time = 0
          const anwser = questions[Math.floor(Math.random() * 4)];
          handleAnswer(anwser);
          return DIFFICULTY_TIME[difficulty]
        }
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [questions])

  function handleAnswer(anwser) {
    const question = dataSource[questionIndex];
    const correct_answer = question.correct_answer;

    // increase score when correct anwser
    if(anwser === correct_answer) {
      dispatch(updateScore(1));
    }

    if(questionIndex + 1 === dataSource.length) {
      navigate('/final-score');
      return;
    }

    // next question
    setQuestionIndex(prevState => prevState + 1);
    setCountTime(DIFFICULTY_TIME[difficulty]);
  }

  return (
    <>
      <Typography variant="h3" noWrap component="h2" sx={{ textAlign: 'center', marginBottom: 5 }}>
        Question {questionIndex + 1}
      </Typography>

      <Typography noWrap component="div" sx={{ marginBottom: 5 }}>
        {decode(dataSource[questionIndex]?.question)}
      </Typography>

      {questions.map(item => (
        <React.Fragment key={item}>
          <Box sx={{ marginBottom: 2 }}>
            <Button fullWidth variant="contained" onClick={() => handleAnswer(item)}>
              {decode(item)}
            </Button>
          </Box>
        </React.Fragment>
      ))}

      <Box sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between'}}>
        <Typography noWrap component="div" sx={{  }}>
          Score: {score}/{dataSource.length}
        </Typography>

        {countTime > 0 && (
          <Typography 
            noWrap 
            component="div" 
            sx={{ 
              color: countTime < 10 ? 'red' : 'black'
            }}
          >
            Timer: {formatTime(countTime)}
          </Typography>
        )}
      </Box>
    </>
  )
}

export default Question