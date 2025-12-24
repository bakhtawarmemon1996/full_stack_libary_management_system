import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { booksAPi } from "../services/books/books.service";
import { authApi } from "../services/users/authApi";
import userReducer from "./slices/userSlice";
import { dashboardApi } from "../services/dashboard/dashboard.service";

const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [booksAPi.reducerPath]: booksAPi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dashboardApi.middleware)
      .concat(booksAPi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
