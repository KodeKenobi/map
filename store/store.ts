import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import socialReducer from "./slices/socialSlice";
import authReducer from "./slices/authSlice";
import likesCommentsReducer from "./slices/likesCommentsSlice";
import homeReducer from "./slices/homeSlice";
import homeCardsReducer from "./slices/homeCardsSlice";
import wellnessCardsReducer from "./slices/wellnessCardsSlice";
import wisdomCardsReducer from "./slices/wisdomCardsSlice";
import wealthCardsReducer from "./slices/wealthCardsSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    social: socialReducer,
    auth: authReducer,
    likesComments: likesCommentsReducer,
    home: homeReducer,
    homeCards: homeCardsReducer,
    wellnessCards: wellnessCardsReducer,
    wisdomCards: wisdomCardsReducer,
    wealthCards: wealthCardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
