import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://lingo-school-a8368-default-rtdb.firebaseio.com";
const API_TEACHERS_ENDPOINT = "/.json";

export const teachersApi = createApi({
  reducerPath: "teachers",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Teachers"],
  endpoints: (builder) => ({
    getAllTeachers: builder.query({
      query: () => API_TEACHERS_ENDPOINT,
      providesTags: ["Teachers"],
    }),
  }),
});
export const { useGetAllTeachersQuery } = teachersApi;
