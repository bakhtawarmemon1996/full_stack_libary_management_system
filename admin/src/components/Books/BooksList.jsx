import { GoTrash } from "react-icons/go";
import { RiEditLine } from "react-icons/ri";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetBooksQuery } from "../../services/books/books.service";
import { useEffect } from "react";
import PageLoader from "../Global/PageLoader";
import { formatDate } from "../../utils/formatDate";
import ErrorPage from "../Global/ErrorPage";

const BooksList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetBooksQuery(
    { search: searchTerm },
    {
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  if (error) return <ErrorPage />;

  return (
    <div className="w-full bg-white rounded-xl p-6 min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h2 className="section-heading">All Books</h2>
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/books/add-book"
            className="text-sm font-medium text-white primary-bg px-3 py-2 rounded-lg"
          >
            + Add New Book
          </Link>
        </div>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="relative overflow-x-auto my-5">
          <table className="w-full text-sm text-left rtl:text-righ">
            <thead className="text-xs text-[#3A354E] bg-[#F8F8FF]">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Author
                </th>
                <th scope="col" className="px-6 py-4">
                  Genre
                </th>
                <th scope="col" className="px-6 py-4">
                  Date Created
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.books?.map((book, index) => (
                <tr
                  className="bg-white border-b border-gray-200 cursor-pointer"
                  key={index}
                  onClick={() => navigate(`/books/${book?._id}`)}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap flex items-center gap-2 max-w-[300px]"
                  >
                    <img
                      src={book?.bookImages[0]}
                      alt="book01"
                      className="w-[29px] object-contain"
                    />
                    <span className="text-wrap">{book?.bookTitle}</span>
                  </td>
                  <td className="px-6 py-4">{book?.author}</td>
                  <td className="px-6 py-4">{book?.genre}</td>
                  <td className="px-6 py-4">
                    {formatDate(book?.createdAt, { month: "long" })}
                  </td>
                  <td className="px-6 text-center flex gap-2">
                    <button type="button">
                      <RiEditLine className="text-[17px] text-blue-500" />
                    </button>
                    <button type="button">
                      <GoTrash className="text-base text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BooksList;
