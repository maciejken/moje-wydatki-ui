import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { BasicAuth, fetchToken, TokenClaims } from "features/auth/authAPI";

export interface AuthState {
  token: string;
  claims: TokenClaims | null;
  error: string;
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  token: "",
  claims: null,
  error: "",
  status: "idle",
};

export const fetchAuthToken = createAsyncThunk(
  "auth/fetchAuthToken",
  async (auth: BasicAuth) => {
    try {
      const { token, claims } = await fetchToken(auth);
      // The value we return becomes the `fulfilled` action payload
      return { token, claims };
    } catch (e) {
      throw e;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.token = "";
      state.claims = null;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthToken.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchAuthToken.fulfilled, (state, action) => {
        const { token, claims } = action.payload;
        state.status = "idle";
        state.token = token;
        state.claims = claims;
        state.error = "";
      })
      .addCase(fetchAuthToken.rejected, (state, action) => {
        state.status = "failed";
        state.token = "";
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
        }
      });
  },
});

export const { clearAuth } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthStatus = createSelector(
  selectAuth,
  (auth) => auth.status
);

export default authSlice.reducer;
