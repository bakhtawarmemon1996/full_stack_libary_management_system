import BookCard from "./BookCard";

const BorrowdBookList = () => {
  return (
    <div className="w-full">
      <h2 className="secondary-text font-semibold text-[32px]">
        Borrowed Books
      </h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 2xl:gap-10 mt-10 2xl:mt-14">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
};

export default BorrowdBookList;
