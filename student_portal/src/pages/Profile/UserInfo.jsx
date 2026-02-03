import StudentCard from "./StudentCard";
import { LiaUserEditSolid } from "react-icons/lia";

const UserInfo = ({ student }) => {
  const accountStatus = student?.status;
  return (
    <div className="w-full max-w-[566px] bg-[#232839] rounded-[10px] p-8 flex flex-col items-start gap-5 sticky top-10">
      <div className="w-full flex items-start md:items-center gap-4 flex-col md:flex-row">
        <div className="w-[100px] h-[100px] relative">
          <img
            src={"/profile-image.png"}
            className=""
            alt="profile-image"
            width={99}
            height={99}
          />
          <button
            type="button"
            className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center absolute bottom-2 right-2"
          >
            <LiaUserEditSolid color="#000" />
          </button>
        </div>
        <div className="flex flex-col items-start">
          <p
            className={`text-sm ${
              accountStatus === "pending"
                ? "text-orange-500"
                : accountStatus === "rejected"
                ? "text-red-500"
                : accountStatus === "accepted"
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {accountStatus === "accepted"
              ? "Verified Student"
              : accountStatus.charAt(0).toUpperCase() + accountStatus?.slice(1)}
          </p>
          <p className="font-semibold">{student?.name}</p>
          <p className="text-gray-400">{student?.email}</p>
        </div>
      </div>
      <div className="w-full">
        <p className="text-gray-400 font-medium">University</p>
        <h2 className="font-semibold">Iqra University</h2>
      </div>
      <div className="w-full">
        <p className="text-gray-400 font-medium">Student ID</p>
        <h2 className="font-semibold">{student?.idNumber}</h2>
      </div>

      <StudentCard student={student} />
    </div>
  );
};

export default UserInfo;
