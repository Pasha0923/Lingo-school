// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isLoggedIn: false,
//   isRefresh: false,
//   loading: false,
//   error: null,
//   auth: null,
//   email: null,
//   token: null,
//   id: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser(state, action) {
//       state.auth = action.payload.auth;
//       state.email = action.payload.email;
//       state.token = action.payload.token;
//       state.id = action.payload.id;
//       state.isLoggedIn = true; // Пользователь залогинен
//     },
//     removeUser(state) {
//       state.auth = null;
//       state.email = null;
//       state.token = null;
//       state.id = null;
//       state.isLoggedIn = false; // Пользователь не залогинен
//     },
//   },
// });

// export const { setUser, removeUser } = authSlice.actions;
// export const userReducer = authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser, refreshUser } from "./operations";

const INITIAL_STATE = {
  user: null,
  isLoggedIn: false,
  isRefresh: false,
  loading: false,
  error: null,
};

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, handlePending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, handleRejected)

      .addCase(loginUser.pending, handlePending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, handleRejected)

      .addCase(logoutUser.pending, handlePending)
      .addCase(logoutUser.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logoutUser.rejected, handleRejected)

      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
        state.isRefresh = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isRefresh = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.isRefresh = false;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;