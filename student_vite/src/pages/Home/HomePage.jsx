import React from "react";
import Header from "./Header";
import Listing from "./Listing";
import { useGetBooksQuery } from "../../services/bookApi";
import PageLoader from "../../components/common/PageLoader";

const HomePage = () => {
  const page = 1;
  const limit = 10;
  const { data, isLoading, isError, error } = useGetBooksQuery(
    {
      page,
      limit,
      search: "",
    },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const books = data?.data?.books;
  const book = data?.data?.books[0];
  const pagination = data?.data?.pagination;

  if (isLoading) return <PageLoader />;

  return (
    <React.Fragment>
      <Header book={book} />
      {books?.length > 0 && <Listing books={books} />}
    </React.Fragment>
  );
};

export default HomePage;
