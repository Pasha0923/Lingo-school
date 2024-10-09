import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.favorite = [...state.favorite, action.payload];
    },
    deleteFavorite(state, action) {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addFavorite, deleteFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
