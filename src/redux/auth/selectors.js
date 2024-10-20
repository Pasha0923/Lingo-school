export const selectAuthUser = (state) => state.auth.user;
export const selectAuthIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectAuthRefreshing = (state) => state.auth.isRefresh;

export const selectAuthIsLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
