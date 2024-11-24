import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: JSON.parse(localStorage.getItem("favorite")) || [], // Загрузка данных из localStorage
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorites(state, action) {
      state.favorite = action.payload; // Устанавливаем избранное из данных
    },
    addFavorite(state, action) {
      const exists = state.favorite.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favorite.push(action.payload); // Добавляет элемент только если его еще нет
        localStorage.setItem("favoriteItems", JSON.stringify(state.favorite)); // Сохраняем в localStorage
      }
    },
    deleteFavorite(state, action) {
      state.favorite = state.favorite.filter(
        (item) => item?.id !== action.payload
      );
      localStorage.setItem("favoriteItems", JSON.stringify(state.favorite)); // Сохраняем в localStorage
    },
    clearFavorites(state) {
      // добавляем  action для очистки избранного
      state.favorite = []; // Очистка избранного
    },
  },
});

export const { addFavorite, deleteFavorite, clearFavorites, setFavorites } =
  favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
