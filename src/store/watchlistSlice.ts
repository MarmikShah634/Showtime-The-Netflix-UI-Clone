import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WatchlistState {
  items: any[];
}

const initialState: WatchlistState = {
  items: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<any>) => {
      if (!state.items.find((m) => m.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
