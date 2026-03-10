const ProfilePhotoUploader = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full mx-auto">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center rounded-full w-[150px] h-[150px] bg-neutral-secondary-medium border border-dashed border-gray-600 rounded-base cursor-pointer hover:bg-neutral-tertiary-medium bg-[#232839]"
        >
          <div className="flex flex-col items-center justify-center">
            <svg
              className="w-8 h-8 mb-1 secondary-text"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
              />
            </svg>
            <p className="text-xs text-center secondary-text">
              <span className="font-medium">
                Click to upload <br /> profile pciture
              </span>
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default ProfilePhotoUploader;
