import { SET_AMOUNT, SET_CATEGORY, SET_DIFFICULTY, SET_TYPE } from "./dashboard.action"

const initialState = {
  categoryId: null,
  difficulty: null,
  type: null,
  amount: null
}

export const dashboardReducer = (state = initialState, { type, payload }) => {
  switch(type) {
    case SET_CATEGORY: {
      return {
        ...state,
        categoryId: payload
      }
    }
    case SET_TYPE: {
      return {
        ...state,
        type: payload
      }
    }
    case SET_DIFFICULTY: {
      return {
        ...state,
        difficulty: payload
      }
    }
    case SET_AMOUNT: {
      return {
        ...state,
        amount: payload
      }
    }
    default: 
      return state
  }
}