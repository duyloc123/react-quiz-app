export const UPDATE_SCORE = "QUESTION/UPDATE_SCORE";

export const updateScore = (score) => {
  return {
    type: UPDATE_SCORE,
    payload: score,
  };
};
