import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_LOG_IN } from "../../utils/config";
import { showToast } from "../../utils/toastMessage";

export const adminLogIn = createAsyncThunk(
  "login/adminLogIn",
  async (args, thunkAPI) => {
    console.log(args);
    try {
      const res = await fetch(API_LOG_IN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      if (data.status === "fail" || data.status === "error")
        throw new Error(data.message);

      if (data.role !== "admin") throw new Error("user doesn't have authorize");
      return data;
    } catch (e) {
      if (e.message === "failed to fetch") e.message = "can't signIn right now";
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const login = createSlice({
  name: "login",
  initialState: {
    user: "",
    status: "idle", //idle / loading / error
    error: "",
  },
  reducers: {
    loggedIn: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogIn.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(adminLogIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "idle";
      state.error = "";
      showToast(`Wellcome ${action.payload.user}`, "success");
    });
    builder.addCase(adminLogIn.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      showToast(action.payload, "error");
    });
  },
});

export const { loggedIn } = login.actions;

export default login.reducer;
