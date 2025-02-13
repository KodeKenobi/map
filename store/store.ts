import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import socialReducer from "./slices/socialSlice";

// Custom middleware to log actions and state
const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  console.log("Dispatching action:", action);
  const result = next(action);
  console.log("Next state:", storeAPI.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    social: socialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

// Log the store
console.log("Initial store state:", store.getState());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
