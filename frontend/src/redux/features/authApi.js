/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const token = state.auth?.userInfo?.data?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
