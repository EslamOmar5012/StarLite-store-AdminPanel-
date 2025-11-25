import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle", //idle / loading / error
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default users.reducer;
