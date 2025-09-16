import { useMemo } from "react";
import { X } from "lucide-react";

function StashToastUi({ type, onClose, message, icon }) {
  const toastTypeClass = useMemo(() => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "loginFalse":
        return "bg-red-500";
      default:
        return "bg-white";
    }
  }, [type]);

  return (
    <div
      onClick={onClose}
      style={{
        boxShadow:
          "0 -2px 8px rgba(0, 0, 0, 0.05), 0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05)",
      }}
      className="bg-bg-light-primary z-[9999999] mb-2 flex items-center max:w-[19.3rem] h-13 box-border rounded-lg px-3 py-2 "
    >
      <div
        className={`${toastTypeClass} w-6.5 h-6.5 rounded-full flex justify-center items-center text-text-dark-primary `}
      >
        {icon}
      </div>
      <span className="ml-3 text-text-light-secondary">{message}</span>
      <span className="ml-4">
        <X strokeWidth={2} size={15} />
      </span>
    </div>
  );
}

export default StashToastUi;
