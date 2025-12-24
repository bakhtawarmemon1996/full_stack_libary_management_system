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
      query: ({ search, page, limit, skip, status }) => {
        const params = new URLSearchParams();

        if (search) params.append(`search`, search);
        if (status) params.append("status", status);
        if (limit) params.append("limit", limit);
        if (page) params.append("page", page);
        if (skip) params.append("skip", skip);

        return {
          url: `/users?${params.toString()}`,
        };
      },
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/approveUserProfile/${userId}`,
        method: "PUT",
        body: { status },
      }),
    }),
    deleteUserAccount: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetUsersQuery,
  useUpdateUserStatusMutation,
  useDeleteUserAccountMutation,
} = authApi;
