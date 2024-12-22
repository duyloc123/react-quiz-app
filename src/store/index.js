import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import { dashboardReducer } from "../redux/dashboard.reducer";

const rootReducers = combineReducers({
  dashboard: dashboardReducer
})

export const store = createStore(rootReducers, composeWithDevTools());