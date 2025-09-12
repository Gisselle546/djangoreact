// src/redux/reducer/userSlice.ts
import { AppState } from "../store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSessionValue,
  getSessionValue,
  removeSessionValue,
} from "../../utils/storage";

import { register } from "../action/register";
import { login } from "../action/login";

export interface AuthState {
  token: string; // always a string here
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Normalize anything we might have stored previously (object/string/undefined)
const readInitialToken = (): string => {
  const raw = getSessionValue("token");
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  try {
    // if you previously stored { token: "..." }
    return (raw as any)?.token ?? "";
  } catch {
    return "";
  }
};

const initialState: AuthState = {
  token: readInitialToken(),
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await register(data);
      const tok = response?.data?.token ?? "";
      setSessionValue("token", tok);
      return { token: tok };
    } catch (error: any) {
      return rejectWithValue(error?.message ?? "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await login(data);
      const tok = response?.data?.token ?? "";
      setSessionValue("token", tok);
      return { token: tok };
    } catch (error: any) {
      return rejectWithValue(error?.message ?? "Login failed");
    }
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = "";
      state.status = "idle";
      state.error = null;
      removeSessionValue("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token ?? "";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Registration failed";
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token ?? "";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) ?? "Login failed";
      });
  },
});

/* ---------------- Selectors ---------------- */
export const selectAuthState = (state: AppState) => state.auth;
export const selectAuthToken = (state: AppState) => state.auth.token;
export const selectIsAuthenticated = (state: AppState) =>
  Boolean(state.auth.token);
export const selectAuthError = (state: AppState) => state.auth.error;
export const selectAuthStatus = (state: AppState) => state.auth.status;

// (kept for backward compatibility if you used tokenValue/error before)
export const tokenValue = selectAuthToken;
export const error = selectAuthError;

/* ---------------- Exports ---------------- */
export const { logout } = userSlice.actions;
export default userSlice.reducer;
