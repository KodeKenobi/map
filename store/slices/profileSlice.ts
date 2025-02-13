import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("first_name, avatar_url")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    firstName: null,
    avatarUrl: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.firstName = action.payload.first_name;
        state.avatarUrl = action.payload.avatar_url;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
