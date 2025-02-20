import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  // Define your state structure here
  isAuthenticated: boolean;
  user: any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    // Add other reducers as needed
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
