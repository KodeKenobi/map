import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeCard {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  description?: string;
  tag?: string;
  cta: string;
}

interface HomeCardsState {
  cards: HomeCard[];
  loading: boolean;
}

const initialState: HomeCardsState = {
  cards: [],
  loading: false,
};

const homeCardsSlice = createSlice({
  name: "homeCards",
  initialState,
  reducers: {
    setHomeCards: (state, action: PayloadAction<HomeCard[]>) => {
      state.cards = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setHomeCards, setLoading } = homeCardsSlice.actions;
export default homeCardsSlice.reducer;
