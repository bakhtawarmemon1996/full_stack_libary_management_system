import { useEffect, useRef, useState } from "react";
import { useUpdateRequestStatusMutation } from "../../services/requests/requestApi";
import { enqueueSnackbar } from "notistack";

const REQUESTS_STATUS = [
  { title: "Pending", value: "pending" },
  { title: "Borrowed", value: "borrowed" },
  { title: "Returned", value: "returned" },
  { title: "Late Return", value: "late-return" },
];

const getStatusStyle = (value) => {
  switch (value) {
    case "pending":
      return "text-orange-400 bg-orange-100";
    case "borrowed":
      return "text-purple-400 bg-purple-100";
    case "returned":
      return "text-blue-400 bg-blue-100";
    case "late-return":
      return "text-red-400 bg-red-100";
    default:
      return "text-gray-400 bg-gray-100";
  }
};

const StatusDropdown = ({ defaultValue = "pending", requestId }) => {
  const [selectedStatus, setSelectedStatus] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [updateStatus, { isLoading }] = useUpdateRequestStatusMutation();

  const handleSelect = async (status) => {
    setSelectedStatus(status);
    setOpen(false);

    try {
      await updateStatus({ requestId, status }).unwrap();
      enqueueSnackbar("Request status updated", { variant: "success" });

      console.log("Status updated");
    } catch (error) {}
  };

  const currentStatus = REQUESTS_STATUS.find((s) => s.value === selectedStatus);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
          selectedStatus,
        )}`}
      >
        {currentStatus?.title}
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 w-32 bg-white border rounded-lg shadow-lg z-50 py-3"
        >
          {REQUESTS_STATUS.map((status) => (
            <div
              key={status.value}
              onClick={() => handleSelect(status.value)}
              className={`cursor-pointer px-3 py-2 text-xs bg-white`}
            >
              <span
                className={`${getStatusStyle(status.value)} px-2 py-1 rounded-full font-medium`}
              >
                {status.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
