import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WisdomCard {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  description?: string;
  tag?: string;
  cta: string;
}

interface WisdomCardsState {
  cards: WisdomCard[];
  loading: boolean;
}

const initialState: WisdomCardsState = {
  cards: [],
  loading: false,
};

const wisdomCardsSlice = createSlice({
  name: "wisdomCards",
  initialState,
  reducers: {
    setWisdomCards: (state, action: PayloadAction<WisdomCard[]>) => {
      state.cards = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setWisdomCards, setLoading } = wisdomCardsSlice.actions;
export default wisdomCardsSlice.reducer;
