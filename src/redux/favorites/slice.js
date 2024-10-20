import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const exists = state.favorite.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favorite.push(action.payload); // Добавляет элемент только если его еще нет
      }
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
