import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  content: string;
  user_id: string;
  users: {
    profiles: {
      first_name: string;
      last_name: string;
      avatar_url: string;
    };
  };
}

interface SocialState {
  // Define your state structure here
  data: any[];
  likes: number;
  comments: Comment[];
}

const initialState: SocialState = {
  data: [],
  likes: 0,
  comments: [],
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any[]>) {
      state.data = action.payload;
    },
    setLikes: (state, action: PayloadAction<number>) => {
      state.likes = action.payload;
    },
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    toggleLike: (state, action: PayloadAction<boolean>) => {
      state.likes += action.payload ? 1 : -1;
    },
    // Add other reducers as needed
  },
});

export const { setData, setLikes, setComments, addComment, toggleLike } =
  socialSlice.actions;
export default socialSlice.reducer;
