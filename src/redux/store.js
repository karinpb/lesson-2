import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";


const middlewares = [logger];
// This syntax is so that it's easier to just add new middleware to the array
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

