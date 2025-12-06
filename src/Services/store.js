import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/logIn/loginSlice";
import { usersReducer } from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
  },
});
