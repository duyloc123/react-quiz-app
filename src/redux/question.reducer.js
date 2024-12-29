import { UPDATE_SCORE } from "./question.action"

const initialState = {
  score: 0
}

// 1 -> corrrect + 1
// 2 -> correct + 1
export const questionReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case UPDATE_SCORE: {
      return {
        ...state,
        score: state.score + payload // 1 + 1 => 2
      }
    }
    default: 
      return state
  }
}