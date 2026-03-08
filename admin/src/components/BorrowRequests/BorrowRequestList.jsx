import { useGetRequestsQuery } from "../../services/requests/requestApi";
import ErrorPage from "../Global/ErrorPage";
import PageLoader from "../Global/PageLoader";
import RequestTable from "./RequestTable";

const BorrowRequestList = () => {
  const { data, isLoading, isError, refetch } = useGetRequestsQuery(undefined);

  const requests = data?.data;

  if (isLoading) return <PageLoader />;

  if (isError) return <ErrorPage refetch={refetch} />;

  return (
    <div className="w-full bg-white rounded-xl p-6 min-h-screen">
      <div className="w-full flex items-center justify-between">
        <h2 className="section-heading">Borrow Book Requests</h2>
        <div className="flex items-center justify-between gap-4">
          {requests?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="secondary-text text-sm">Oldest to Recent</span>
              <img
                src="/arrow-swap.png"
                alt="filter icon"
                className="w-[16px] h-[16px]"
              />
            </div>
          )}
        </div>
      </div>
      {requests?.length > 0 ? (
        <RequestTable requests={requests} />
      ) : (
        <div className="w-full bg-white rounded-xl p-6">
          <div className="w-full flex items-center justify-center text-center min-h-screen px-4">
            <p className="text-base text-gray-500">
              There are no requests available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowRequestList;
