import { authApi } from "./authApi";

const URL = `/api/v1/users`;

// console.log(URL);

export const UserAuthApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `${URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${URL}/logout`,
        method: "GET",
      }),
    }),
    profile: builder.mutation({
      query: () => ({
        url: `${URL}/profile`,
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${URL}/update-profile`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useProfileMutation,
  useUpdateProfileMutation,
} = authApi;
