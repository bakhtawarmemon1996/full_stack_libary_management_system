const UploadedImageList = ({ images, onRemove }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full flex items-center gap-5 flex-wrap mt-2">
      {images?.map((file, index) => {
        // const preview = URL.createObjectURL(file);

        return (
          <div key={index} className="relative">
            <img
              src={file}
              alt="uploaded"
              className="w-20 h-20 object-cover rounded-md border"
            />

            {/* Remove button */}
            <button
              type="button"
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              onClick={() => onRemove(index)}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UploadedImageList;
