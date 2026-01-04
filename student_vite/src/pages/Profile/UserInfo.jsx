const UserInfo = () => {
  return (
    <div className="w-full max-w-[566px] bg-[#232839] rounded-[10px] p-8 flex flex-col items-start gap-5 sticky top-10">
      <div className="w-full flex items-start md:items-center gap-4 flex-col md:flex-row">
        <img
          src={"/profile-image.png"}
          className=""
          alt="profile-image"
          width={99}
          height={99}
        />
        <div className="flex flex-col items-start">
          <p className="text-sm text-gray-400">Verified Student</p>
          <p className="font-semibold">Adrian</p>
          <p className="text-gray-400">smshoaib2001@gmail.com</p>
        </div>
      </div>
      <div className="w-full">
        <p className="text-gray-400 font-medium">University</p>
        <h2 className="font-semibold">Iqra University</h2>
      </div>
      <div className="w-full">
        <p className="text-gray-400 font-medium">Student ID</p>
        <h2 className="font-semibold">394895945u</h2>
      </div>

      <img
        src={"/student-id-card-image.png"}
        alt="student-id-card-image"
        width={486}
        height={287}
        className="w-full object-contain max-w-[486px]"
      />
    </div>
  );
};

export default UserInfo;
