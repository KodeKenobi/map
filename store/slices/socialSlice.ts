import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const fetchHomeCards = createAsyncThunk(
  "social/fetchHomeCards",
  async () => {
    const { data, error } = await supabase.from("home_cards").select("*");
    if (error) throw error;
    return data;
  }
);

export const fetchLikes = createAsyncThunk(
  "social/fetchLikes",
  async (postId: number) => {
    const { data, error } = await supabase
      .from("home_cards")
      .select("likes")
      .eq("id", postId)
      .single();

    if (error) throw error;
    return data.likes;
  }
);

export const fetchComments = createAsyncThunk(
  "social/fetchComments",
  async (postId: number) => {
    const { data, error } = await supabase
      .from("comments")
      .select(
        `
        content,
        user_id,
        first_name,
        last_name,
        avatar_url
      `
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }
);

const socialSlice = createSlice({
  name: "social",
  initialState: {
    homeCards: [],
    likes: {},
    comments: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeCards.fulfilled, (state, action) => {
        state.homeCards = action.payload;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.likes[action.meta.arg] = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments[action.meta.arg] = action.payload;
      });
  },
});

export default socialSlice.reducer;
