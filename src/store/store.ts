import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import moviesReducer from "./moviesSlice";
import watchlistReducer from "./watchlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
    watchlist: watchlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
