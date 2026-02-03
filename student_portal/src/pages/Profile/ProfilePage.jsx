import { useGetProfileQuery } from "../../services/authApi";
import BorrowdBookList from "./BorrowdBookList";
import UserInfo from "./UserInfo";
import PageLoader from "../../components/common/PageLoader";

const ProfilePage = () => {
  const { data, isLoading, isError, error } = useGetProfileQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="w-full py-10 md:py-20 padding-x">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 2xl:gap-x-20">
        <div className="w-full">
          <UserInfo student={data} />
        </div>
        <div className="w-full">
          <BorrowdBookList />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
