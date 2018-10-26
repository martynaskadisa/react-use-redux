import { createStore, combineReducers } from "redux";

const store = createStore(
  combineReducers({
    form: combineReducers({
      value: (state = "", action) =>
        action.type === "SET_FORM_VALUE" ? action.payload : state
    })
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

window.store = store;

export default store;
