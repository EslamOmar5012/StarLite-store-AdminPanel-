import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_DELETE_USER, API_GET_USERS } from "../../utils/config";
import { showToast } from "../../utils/toastMessage";

//get pages and first load of users

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (args, thunkAPI) => {
    const { pageNum } = args;
    try {
      const res = await fetch(API_GET_USERS(pageNum), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await res.json();

      if (
        data.status === "fail" ||
        data.status === "error" ||
        !data.data.length
      )
        throw new Error("can't get users right now");

      return data;
    } catch (err) {
      if (err.message === "failed to fetch")
        err.message("can't get  users right now");

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteUser = createAsyncThunk("", async (args, thunkAPI) => {
  console.log(args);
  try {
    const res = await fetch(API_DELETE_USER, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
      credentials: "include",
    });

    const data = await res.json();

    if (data.status === "fail" || data.status === "error")
      throw new Error(data.message);

    return data.message;
  } catch (err) {
    if (err.message === "failed to fetch")
      err.message("can't get  users right now");

    console.log(err.message);

    return thunkAPI.rejectWithValue(err.message);
  }
});

const users = createSlice({
  name: "users",
  initialState: {
    users: [],
    totalUsers: 0,
    totalPages: 40,
    currentPage: 0,
    status: "idle", //idle / loading / error
    deleting: "idle", //idle / loading / error
    error: "",
  },

  extraReducers: (builder) => {
    //getUsers
    builder.addCase(getUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.status = "idle";
      state.users = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.totalUsers = action.payload.totalUsers;
      state.error = "";
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      showToast(action.payload, "error");
    });

    //delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.deleting = "loading";
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.deleting = "idle";
      showToast(action.payload, "success");
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.deleting = "error";
      showToast(action.payload, "error");
    });
  },
});

export const usersReducer = users.reducer;
