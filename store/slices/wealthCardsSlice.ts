import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WealthCard {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  description?: string;
  tag?: string;
  cta: string;
}

interface WealthCardsState {
  cards: WealthCard[];
  loading: boolean;
}

const initialState: WealthCardsState = {
  cards: [],
  loading: false,
};

const wealthCardsSlice = createSlice({
  name: "wealthCards",
  initialState,
  reducers: {
    setWealthCards: (state, action: PayloadAction<WealthCard[]>) => {
      state.cards = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setWealthCards, setLoading } = wealthCardsSlice.actions;
export default wealthCardsSlice.reducer;
