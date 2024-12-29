import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import { dashboardReducer } from "../redux/dashboard.reducer";
import { questionReducer } from "../redux/question.reducer";

const rootReducers = combineReducers({
  dashboard: dashboardReducer,
  question: questionReducer
})

export const store = createStore(rootReducers, composeWithDevTools());