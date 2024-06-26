import { authApi } from "./authApi";

const URL = `/api/v1/candidate`;

export const candidateApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    createCandidate: builder.mutation({
      query: (data) => ({
        url: `${URL}/create-candidate`,
        method: "POST",
        body: data,
      }),
    }),
    getCandidate: builder.mutation({
      query: () => ({
        url: `${URL}/getallcandidates`,
        method: "GET",
      }),
    }),
    updateCandidate: builder.mutation({
      query: (data) => ({
        url: `${URL}/update-candidate/${data.candidateId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    voting: builder.mutation({
      query: (candidateId) => ({
        url: `${URL}/voting/${candidateId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateCandidateMutation,
  useGetCandidateMutation,
  useUpdateCandidateMutation,
  useVotingMutation,
} = authApi;
