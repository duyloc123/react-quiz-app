import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { decode } from "html-entities";

import { useSelector, useDispatch } from "react-redux";
import { updateScore } from "../../redux/question.action";
import { useNavigate } from "react-router-dom";

import { DIFFICULTY_TIME } from "../../configs/index";
import { formatTime } from "../../utils/formatTime";

// get questions: https://opentdb.com/api.php?amount=2&category=11&difficulty=easy&type=multiple

function Question() {
  const { categoryId, difficulty, type, amount } = useSelector(
    (state) => state.dashboard
  );
  const score = useSelector((state) => state.question.score);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [questions, setQuestion] = React.useState([]);
  const [dataSource, setDataSource] = React.useState([]);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [countTime, setCountTime] = React.useState(0);

  React.useEffect(() => {
    async function fetchQuestion() {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=${type}`
      );
      const data = await response.json();
      const question = data.results[questionIndex];
      const answer = [...question.incorrect_answers];
      answer.splice(Math.floor(Math.random() * 4), 0, question.correct_answer);
      setQuestion(answer);
      setDataSource(data.results);
      setCountTime(DIFFICULTY_TIME[difficulty]);
    }
    if (!categoryId || !difficulty || !type || !amount) return;
    fetchQuestion();
  }, [categoryId, difficulty, type, amount]);

  // Timer
  React.useEffect(() => {
    if (questions.length === 0) return;

    const timer = setInterval(() => {
      setCountTime((prevState) => {
        if (prevState > 0) {
          return prevState - 1;
        } else {
          const answer = questions[Math.floor(Math.random() * 4)];
          handleAnswer(answer);
          return DIFFICULTY_TIME[difficulty];
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [questions]);

  // Next question
  React.useEffect(() => {
    if (questionIndex > 0) {
      const question = dataSource[questionIndex];
      const answer = [...question.incorrect_answers];
      answer.splice(Math.floor(Math.random() * 4), 0, question.correct_answer);
      setQuestion(answer);
    }
  }, [questionIndex, dataSource]);

  function handleAnswer(answer) {
    const question = dataSource[questionIndex];
    const correct_answer = question.correct_answer;

    if (answer === correct_answer) {
      dispatch(updateScore(1));
    }

    if (questionIndex + 1 === dataSource.length) {
      navigate("/final-score");
      return;
    }

    setQuestionIndex((prevState) => prevState + 1);
    setCountTime(DIFFICULTY_TIME[difficulty]);
  }

  return (
    <>
      <Typography
        variant="h3"
        noWrap
        component="h2"
        sx={{ textAlign: "center", marginBottom: 5 }}
      >
        Question {questionIndex + 1}
      </Typography>

      <Typography noWrap component="div" sx={{ marginBottom: 5 }}>
        {decode(dataSource[questionIndex]?.question)}
      </Typography>

      {questions.map((item) => (
        <React.Fragment key={item}>
          <Box sx={{ marginBottom: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleAnswer(item)}
            >
              {decode(item)}
            </Button>
          </Box>
        </React.Fragment>
      ))}

      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography noWrap component="div" sx={{}}>
          Score: {score}/{dataSource.length}
        </Typography>

        {countTime > 0 && (
          <Typography
            noWrap
            component="div"
            sx={{
              color: countTime < 10 ? "red" : "black",
            }}
          >
            Timer: {formatTime(countTime)}
          </Typography>
        )}
      </Box>
    </>
  );
}

export default Question;
