import { AppState } from "../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSessionValue,
  getSessionValue,
  removeSessionValue,
} from "../../../utils/storage";

import { register } from "../action/register";
import { login } from "../action/login";

export interface AuthState {
  token: string | {};
  status: "idle" | "loading" | "failed";
  error?: null | any;
}

const initialState: AuthState = {
  token: getSessionValue("token") || "",
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "action/register",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await register(data);
      setSessionValue("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "action/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await login(data);
      setSessionValue("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const tokenValue = (state: AppState) => state.auth.token;
export const error = (state: AppState) => state.auth.error;
export default userSlice.reducer;
