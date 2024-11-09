import { createSelector } from "@reduxjs/toolkit";

export const selectTeachersItems = (state) => state.teachers.items;
export const selectTeachersLastKey = (state) => state.teachers.lastKey;

export const selectTeachersLoading = (state) => state.teachers.loading;
export const selectTeachersError = (state) => state.teachers.error;

//-------------------------------- selectsFiltered--------------------------------

export const selectLangOption = (state) => state.teachers.selectedLangOption;
export const selectLevelOption = (state) => state.teachers.selectedLevelOption;
export const selectPriceOption = (state) => state.teachers.selectedPriceOption;
export const selectAllTeachers = (state) => state.teachers.filteredItems;

export const selectFilteredTeachers = createSelector(
  [selectAllTeachers, selectLangOption, selectLevelOption, selectPriceOption],
  (teachers, selectedLangOption, selectedLevelOption, selectedPriceOption) => {
    return teachers.filter((teacher) => {
      const languageMatch = selectedLangOption
        ? teacher.languages.includes(selectedLangOption.value)
        : true;

      const levelMatch = selectedLevelOption
        ? teacher.levels.includes(selectedLevelOption.value)
        : true;

      const priceMatch = selectedPriceOption
        ? Math.round(Number(teacher.price_per_hour) / 10) * 10 ===
          Number(selectedPriceOption.value)
        : true;

      return languageMatch && levelMatch && priceMatch;
    });
  }
);
