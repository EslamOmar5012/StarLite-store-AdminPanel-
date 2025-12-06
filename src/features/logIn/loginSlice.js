import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  API_FORGOT_PASSWORD,
  API_LOG_IN,
  API_LOG_OUT,
  API_SEND_OTP,
} from "../../utils/config";
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

      if (data.user.role !== "admin")
        throw new Error("user doesn't have authorize");
      return data;
    } catch (e) {
      if (e.message === "failed to fetch") e.message = "can't signIn right now";
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const forgotPasswordAdmin_SEND_OTP = createAsyncThunk(
  "login/forgotPasswordAdmin_SEND_OTP",
  async (args, thunkAPI) => {
    console.log(args);
    try {
      const res = await fetch(API_SEND_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...args, type: "reset" }),
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);

      if (data.status === "fail" || data.status === "error")
        throw new Error(data.message);

      return data.message;
    } catch (e) {
      console.log(e.message);
      if (e.message === "Failed to fetch")
        e.message = "Can't send OTP right now";

      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const forgotPasswordAdmin = createAsyncThunk(
  "login/forgotPasswordAdmin",
  async (args, thunkAPI) => {
    console.log(args);
    try {
      const res = await fetch(API_FORGOT_PASSWORD, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(args),
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);

      if (data.status === "fail" || data.status === "error")
        throw new Error(data.message);

      return "password has been reseted successfully";
    } catch (e) {
      console.log(e.message);
      if (e.message === "Failed to fetch")
        e.message = "Can't send OTP right now";

      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const adminLogout = createAsyncThunk(
  "login/adminLogout",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(API_LOG_OUT, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();

      if (data.status === "fail" || data.status === "error")
        throw new Error(data.message);

      console.log(data);

      return data;
    } catch (err) {
      console.log(err);
      if (err.message === "Failed to fetch")
        err.message = "Can't log out right now";
      return thunkAPI.rejectWithValue(err.message);
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
    //login admin handlers
    builder.addCase(adminLogIn.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(adminLogIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.status = "idle";
      state.error = "";
      showToast(`Wellcome ${action.payload.user.username}`, "success");
    });
    builder.addCase(adminLogIn.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      showToast(action.payload, "error");
    });

    //forgotpassword
    builder.addCase(forgotPasswordAdmin.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(forgotPasswordAdmin.fulfilled, (state, action) => {
      state.status = "idle";
      showToast(action.payload, "success");
    });
    builder.addCase(forgotPasswordAdmin.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      showToast(action.payload, "error");
    });

    //send otp when forgot password
    builder.addCase(forgotPasswordAdmin_SEND_OTP.pending, (state) => {
      state.status = "loading";
      state.error = "";
    });
    builder.addCase(forgotPasswordAdmin_SEND_OTP.fulfilled, (state, action) => {
      state.status = "idle";
      showToast(action.payload, "success");
    });
    builder.addCase(forgotPasswordAdmin_SEND_OTP.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      showToast(action.payload, "error");
      console.log("action.payload");
    });

    //adminloggedout
    builder.addCase(adminLogout.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(adminLogout.fulfilled, (state, action) => {
      state.status = "idle";
      state.user = null;
      state.error = "";

      showToast(action.payload.message, "success");
    });

    builder.addCase(adminLogout.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      showToast(action.payload.message, "error");
    });
  },
});

export const { loggedIn } = login.actions;

export default login.reducer;
