import { useSearchParams } from "react-router-dom";

const Pagination = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  const updatePageInUrl = (status) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", status);
    setSearchParams(params);
  };

  return (
    <div className="w-full flex items-center justify-end">
      <ul className="w-full max-w-[320px] flex items-center justify-end gap-1.5">
        <li>
          <button
            type="button"
            className={`bg-gray-300 hover:bg-[var(--primary-bg)] transition-all duration-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium`}
          >
            Previous
          </button>
        </li>
        <button
          type="button"
          onClick={() => updatePageInUrl(1)}
          className="bg-gray-300 hover:bg-[var(--primary-bg)] transition-all duration-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          1
        </button>
        <button
          type="button"
          onClick={() => updatePageInUrl(2)}
          className="bg-gray-300 hover:bg-[var(--primary-bg)] transition-all duration-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          2
        </button>
        <button
          type="button"
          onClick={() => updatePageInUrl(3)}
          className="bg-gray-300 hover:bg-[var(--primary-bg)] transition-all duration-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          3
        </button>
        <button
          type="button"
          onClick={() => updatePageInUrl(4)}
          className="bg-gray-300 hover:bg-[var(--primary-bg)] transition-all duration-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          4
        </button>
        <button
          type="button"
          onClick={() => updatePageInUrl(5)}
          className="bg-gray-300 hover:bg-[var(--primary-bg)] transition-all duration-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          5
        </button>
        <li>
          <button
            type="button"
            className="bg-gray-300 hover:bg-[var(--primary-bg)] transition-all duration-200 hover:text-white px-3 py-2 rounded-lg text-sm font-medium"
          >{`Next`}</button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
