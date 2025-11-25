import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { useGetUsersQuery } from "../../services/users/authApi";
import { formatDate } from "../../utils/formatDate";
import PageLoader from "../Global/PageLoader";
import Search from "../Global/Search";
import ErrorPage from "../Global/ErrorPage";

const UserList = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const { data, error, isError, isLoading, refetch } = useGetUsersQuery({
    search: searchTerm,
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorPage />;

  return (
    <div className="w-full bg-white min-h-screen rounded-xl p-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="section-heading">All Users</h2>
      </div>

      {data && data?.data?.length > 0 ? (
        <div className="relative overflow-x-auto my-5">
          <table className="w-full text-sm text-left rtl:text-righ">
            <thead className="text-xs text-[#3A354E] bg-[#F8F8FF]">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Date Joined
                </th>
                <th scope="col" className="px-6 py-4">
                  Role
                </th>
                <th scope="col" className="px-6 py-4">
                  Books Borrowed
                </th>
                <th scope="col" className="px-6 py-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-4">
                  ID Card
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.data?.map((user, index) => (
                  <tr className="bg-white border-b border-gray-200" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowrap flex items-center gap-2"
                    >
                      <img
                        src={
                          user?.profilePicture
                            ? user?.profilePicture
                            : "/user-profile-picture-placeholder.png"
                        }
                        alt="profile01"
                        className={`w-[40px] h-[40px] rounded-full object-cover`}
                      />
                      <div className="flex flex-col items-start">
                        <span>{user?.name}</span>
                        <span className="secondary-text font-normal">
                          {user?.email}
                        </span>
                      </div>
                    </th>
                    <td className="px-6 py-4">{formatDate(user?.createdAt)}</td>
                    <td className="px-6 py-4">
                      {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                    </td>
                    <td className="px-6 py-4">{user?.booksBorrowedCount}</td>
                    <td className="px-6 py-4">{user?.idNumber}</td>
                    <td className="px-6 py-4">
                      <Link to={`/`} className="text-blue-500 font-medium">
                        View Card
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button type="button">
                        <GoTrash className="text-base text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full bg-white rounded-xl p-6">
          <div className="w-full flex items-center justify-center text-center min-h-screen px-4">
            <p className="text-sm text-gray-500">No users found.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
