import { UPDATE_SCORE } from "./question.action";

const initialState = {
  score: 0
};
export const questiondReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_SCORE: {
      return {
        ...state,
        score: state.score + payload
      };
    }
    default:
      return state;
  }
};
