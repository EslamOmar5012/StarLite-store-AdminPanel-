import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/logIn/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});
