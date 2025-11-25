import { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("search") || "";
  const [value, setValue] = useState(searchValue);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (value.trim() === "") {
        searchParams.delete("search");
        setSearchParams(searchParams);
      } else {
        setSearchParams({ search: value });
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [value]);

  return (
    <div className="w-full max-w-[280px] h-[44px] bg-[#F8F8FF] rounded-xl flex items-center px-4 gap-2">
      <IoSearch className="text-xl text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
        className="w-full h-full outline-none bg-transparent text-sm text-gray-500"
      />
      {value && (
        <button type="button" onClick={() => setValue("")}>
          <IoClose />
        </button>
      )}
    </div>
  );
};

export default Search;
