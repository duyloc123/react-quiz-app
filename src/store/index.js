import { combineReducers, createStore } from "redux";
import { dashboardReducer } from "../redux/dashboard.reducer";
import { questiondReducer } from "../redux/question.reducer";

import { composeWithDevTools } from '@redux-devtools/extension';

const rootReduce = combineReducers({
  dashboard: dashboardReducer,
  question: questiondReducer,
});

export const store = createStore(rootReduce, composeWithDevTools());