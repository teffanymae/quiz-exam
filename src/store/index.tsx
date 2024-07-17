import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api.slice";
import appReducer from "./app.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),

  devTools: true,
});
