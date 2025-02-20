import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
}

const initialState: ProfileState = {
  firstName: null,
  lastName: null,
  avatarUrl: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<ProfileState>) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.avatarUrl = action.payload.avatarUrl;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
