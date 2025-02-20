import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
}

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

interface HomeState {
  posts: Post[];
}

const initialState: HomeState = {
  posts: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    updatePostLikes: (
      state,
      action: PayloadAction<{ postId: number; likes: number }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.likes = action.payload.likes;
      }
    },
    addCommentToPost: (
      state,
      action: PayloadAction<{ postId: number; comment: Comment }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
  },
});

export const { setPosts, updatePostLikes, addCommentToPost } =
  homeSlice.actions;
export default homeSlice.reducer;
