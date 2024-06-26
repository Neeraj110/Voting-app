/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
const token = userInfo?.data.token || "";


const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers) => {
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
