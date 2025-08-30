import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = `${import.meta.env.VITE_TMDB_API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (category: string) => {
    const res = await fetch(
      `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await res.json();
    return { category, results: data.results };
  }
);

// 🔥 Search movies
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query: string) => {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
        query
      )}&page=1&include_adult=false`
    );
    const data = await res.json();
    return data.results || [];
  }
);

interface MoviesState {
  moviesByCategory: {
    [key: string]: any[];
  };
  searchResults: any[];
  myList: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  moviesByCategory: {
    popular: [],
    top_rated: [],
    upcoming: [],
    now_playing: [],
  },
  searchResults: [],
  myList: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
    },
    addToMyList: (state, action) => {
      const exists = state.myList.find((m) => m.id === action.payload.id);
      if (!exists) state.myList.push(action.payload);
    },
    removeFromMyList: (state, action) => {
      state.myList = state.myList.filter((m) => m.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesByCategory[action.payload.category] =
          action.payload.results;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch movies";
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to search movies";
      });
  },
});

export const { clearSearch, addToMyList, removeFromMyList } =
  moviesSlice.actions;
export default moviesSlice.reducer;
