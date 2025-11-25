import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../customBaseQuery";

export const booksAPi = createApi({
  reducerPath: "booksApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ search }) => {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        return {
          url: `/books/get-books?${params.toString()}`,
        };
      },
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `/books/add-book`,
        method: "POST",
        body: data,
      }),
    }),
    editBook: builder.mutation({
      query: (data) => ({
        url: `/books/edit-book`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useAddBookMutation } =
  booksAPi;
