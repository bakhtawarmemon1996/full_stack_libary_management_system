import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => "/users/my-profile",
    }),
    getUsers: builder.query({
      query: ({ search, page, limit, skip }) => {
        const params = new URLSearchParams();

        if (search) params.append(`search`, search);

        return {
          url: `/users?${params.toString()}`,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery, useGetUsersQuery } =
  authApi;
