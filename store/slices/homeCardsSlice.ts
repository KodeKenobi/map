import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HomeCard {
  id: number;
  imageUrl: string;
  title: string;
  subtitle: string;
  cta: string;
  backgroundColor: string;
  textColor: string;
  description: string;
  tag: string;
}

interface HomeCardsState {
  cards: HomeCard[];
  loading: boolean;
}

const initialState: HomeCardsState = {
  cards: [],
  loading: true,
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
