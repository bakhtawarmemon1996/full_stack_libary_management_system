const BookCard = ({ book }) => {
  return (
    <div className="w-full relative mx-auto">
      <img
        src={book?.bookCoverImage}
        width={160}
        height={293}
        alt="dan-brown-book-image"
        className="object-contain rounded-lg lg:w-[113px] h-[150px] 2xl:w-[133px]"
      />
      <h3 className="font-semibold mt-3 mb-1">
        {book?.bookTitle} - By {book?.author}
      </h3>
      <p className="text-sm text-gray-400 font-medium">{book?.genre}</p>
    </div>
  );
};

export default BookCard;
