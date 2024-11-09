// import { createSelector } from "@reduxjs/toolkit";

export const selectFavoriteTeachers = (state) => state.favorite.favorite;

export const selectFavoritesLangOption = (state) =>
  state.favorites.favoritesLangOption;

export const selectFavoritesLevelOption = (state) =>
  state.favorites.favoritesLevelOption;

export const selectFavoritesPriceOption = (state) =>
  state.favorites.favoritesPriceOption;

// export const selectFilteredFavoritesTeachers = createSelector(
//   [
//     selectFavoriteTeachers,
//     selectFavoritesLangOption,
//     selectFavoritesLevelOption,
//     selectFavoritesPriceOption,
//   ],
//   (teachers, selectedLangOption, selectedLevelOption, selectedPriceOption) => {
//     return teachers.filter((teacher) => {
//       const languageMatch = selectedLangOption
//         ? teacher.languages.includes(selectedLangOption.value)
//         : true;

//       const levelMatch = selectedLevelOption
//         ? teacher.levels.includes(selectedLevelOption.value)
//         : true;

//       const priceMatch = selectedPriceOption
//         ? Math.round(Number(teacher.price_per_hour) / 10) * 10 ===
//           Number(selectedPriceOption.value)
//         : true;

//       return languageMatch && levelMatch && priceMatch;
//     });
//   }
// );
