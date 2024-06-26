import { configureStore } from "@reduxjs/toolkit";
import authSlices from "../features/authSlices";
import { authApi } from "../features/authApi";

export const store = configureStore({
  reducer: {
    auth: authSlices,
    [authApi.reducerPath]: authApi.reducer, // Add the generated authApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware), // Add the generated authApi middleware
  devTools: true,
});
