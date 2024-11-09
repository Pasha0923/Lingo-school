import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTeachers, fetchTeachersForPagination } from "./operations";

const initialState = {
  items: [],
  lastKey: null,
  loading: false,
  error: null,

  selectedLangOption: null,
  selectedLevelOption: null,
  selectedPriceOption: null,
  filteredItems: [],
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setSelectedLangOption(state, action) {
      state.selectedLangOption = action.payload;
    },
    setSelectedLevelOption(state, action) {
      state.selectedLevelOption = action.payload;
    },
    setSelectedPriceOption(state, action) {
      state.selectedPriceOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchTeachersForPagination.pending, handlePending)
      .addCase(fetchTeachersForPagination.fulfilled, (state, action) => {
        state.loading = false;

        state.items = [...state.items, ...action.payload];
        state.lastKey = action.payload[action.payload.length - 1].id;
      })
      .addCase(fetchTeachersForPagination.rejected, handleRejected)

      .addCase(fetchAllTeachers.pending, handlePending)
      .addCase(fetchAllTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredItems = action.payload;
      })
      .addCase(fetchAllTeachers.rejected, handleRejected);
  },
});

export const teachersReducer = teachersSlice.reducer;
export const {
  setSelectedLangOption,
  setSelectedLevelOption,
  setSelectedPriceOption,
} = teachersSlice.actions;
