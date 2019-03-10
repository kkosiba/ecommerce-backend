import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import storeReducer from "./storeReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  store: storeReducer,
  form: formReducer
});
