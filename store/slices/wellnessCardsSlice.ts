import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WellnessCard {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  description?: string;
  tag?: string;
  cta: string;
}

interface WellnessCardsState {
  cards: WellnessCard[];
  loading: boolean;
}

const initialState: WellnessCardsState = {
  cards: [],
  loading: false,
};

const wellnessCardsSlice = createSlice({
  name: "wellnessCards",
  initialState,
  reducers: {
    setWellnessCards: (state, action: PayloadAction<WellnessCard[]>) => {
      state.cards = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setWellnessCards, setLoading } = wellnessCardsSlice.actions;
export default wellnessCardsSlice.reducer;
