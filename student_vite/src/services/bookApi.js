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
          department,
          ...(search && { search }),
        },
      }),
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
