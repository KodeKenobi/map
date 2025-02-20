import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: number;
  content: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

interface LikesCommentsState {
  likes: Record<number, number>; // postId -> likes count
  userLikes: Record<number, boolean>; // postId -> user like status
  comments: Record<number, Comment[]>; // postId -> comments array
}

const initialState: LikesCommentsState = {
  likes: {},
  userLikes: {},
  comments: {},
};

const likesCommentsSlice = createSlice({
  name: "likesComments",
  initialState,
  reducers: {
    setLikes(state, action: PayloadAction<{ postId: number; count: number }>) {
      state.likes[action.payload.postId] = action.payload.count;
    },
    setUserLike(
      state,
      action: PayloadAction<{ postId: number; liked: boolean }>
    ) {
      state.userLikes[action.payload.postId] = action.payload.liked;
    },
    setComments(
      state,
      action: PayloadAction<{ postId: number; comments: Comment[] }>
    ) {
      state.comments[action.payload.postId] = action.payload.comments;
    },
  },
});

export const { setLikes, setUserLike, setComments } =
  likesCommentsSlice.actions;
export default likesCommentsSlice.reducer;
