import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    // get all books query (pagination + limit + search)
    getBooks: builder.query({
      query: ({ page, limit, search, department }) => ({
        url: `/books/get-books`,
        params: {
          page,
          limit,
          ...(department && { department }),
          ...(search && { search }),
        },
      }),
      providesTags: ["Books"],
    }),

    // request borrow book
    requestBook: builder.mutation({
      query: ({ bookId }) => ({
        url: `/books/${bookId}`,
        method: "POST",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery, useRequestBookMutation } = bookApi;
