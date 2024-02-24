import { createStore } from "redux";

const initState = { isComponentVisible: false };

const visibleReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_POPUP":
      return { ...state, isComponentVisible: true };
    case "HIDE_POPUP":
      return { ...state, isComponentVisible: false };
    default:
      return state;
  }
};

const store = createStore(visibleReducer);

export default store;
