import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTeachersForPaginations } from "../../services/apiTeachers";
import { getAllTeachers } from "../../services/apiTeachers";

export const fetchAllTeachers = createAsyncThunk(
  "allTeachers/fetchAllTeachers",
  async (_, thunkAPI) => {
    try {
      const data = await getAllTeachers();

      const items = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      return items;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchTeachersForPagination = createAsyncThunk(
  "teachers/fetchTeachersForPagination",
  async (lastKey, thunkAPI) => {
    try {
      const data = await getTeachersForPaginations(lastKey);

      const items = Object.entries(data)
        .map(([key, value]) => ({
          id: key,
          ...value,
        }))
        .slice(-4);

      return items;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
