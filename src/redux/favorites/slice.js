import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: JSON.parse(localStorage.getItem("favorite")) || [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.favorite = action.payload;
    },
    addFavorite(state, action) {
      const exists = state.favorite.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favorite.push(action.payload);
        localStorage.setItem("favoriteItems", JSON.stringify(state.favorite));
      }
    },
    deleteFavorite(state, action) {
      state.favorite = state.favorite.filter(
        (item) => item?.id !== action.payload
      );
      localStorage.setItem("favoriteItems", JSON.stringify(state.favorite));
    },
    clearFavorites(state) {
      state.favorite = [];
    },
  },
});

export const { addFavorite, deleteFavorite, clearFavorites, setFavorites } =
  favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
