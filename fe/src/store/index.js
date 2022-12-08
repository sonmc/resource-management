import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";

import authReducer from "./auth/authSlice";
import layoutReducer from "./layouts/slice";
import authSaga from "./auth/saga";
import layoutSaga from "./layouts/saga";
import employeeReducer from "./employee/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  employee: employeeReducer,
});
const composeEnhancer =
  process.env.NODE_ENV !== "production" && typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
    : compose;
function* rootSaga() {
  try {
    yield all([authSaga(), layoutSaga()]);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.trace(err);
  }
}
const sagaMiddleware = createSagaMiddleware();
const configStore = () => {
  const middleWares = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middleWares)];
  const store = createStore(rootReducer, composeEnhancer(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configStore;
