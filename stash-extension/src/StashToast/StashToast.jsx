import { useState } from "react";
import useStashToast from "./useStashToast";
import ReactDom from "react-dom";
import StashToastUi from "./StashToastUi";
import { X, Lock, Check } from "lucide-react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import { useEffect } from "react";

const StashToast = forwardRef(({ autoClose, autoClosrTime = 1500 }, ref) => {
  const [toast, setToast] = useState([]);
  const { loaded, stashToastId } = useStashToast();
  const [removingToast, setRemovingToast] = useState("");
  const removeToast = (id) => {
    setToast(toast.filter((t) => t.id !== id));
  };
  useEffect(() => {
    if (removingToast) {
      setToast((prevToasts) =>
        prevToasts.filter((t) => t.id !== removingToast)
      );
      setRemovingToast("");
    }
  }, [removingToast]);

  useEffect(() => {
    if (autoClose && toast.length) {
      const id = toast[toast.length - 1].id;
      setTimeout(() => {
        setRemovingToast(id);
      }, autoClosrTime);
    }
  }, [toast, autoClosrTime, autoClose]);

  const ICONS = {
    success: <Check strokeWidth={2} size={18} />,
    error: <X strokeWidth={2} size={18} />,
    loginFalse: <Lock strokeWidth={2} size={18} />,
  };

  useImperativeHandle(ref, () => ({
    addMessage(toastMessage) {
      const timestamp = Date.now();
      const uuid = String(timestamp).split("").reverse().join("");
      const icon = ICONS[toastMessage.type] || null;

      const newToast = {
        id: uuid,
        type: toastMessage.type,
        message: toastMessage.message,
        icon,
      };

      setToast((prevToasts) => [...prevToasts, newToast]);
    },
  }));

  return loaded ? (
    ReactDom.createPortal(
      <div>
        {toast.map((toast) => (
          <StashToastUi
            key={toast.id}
            type={toast.type}
            message={toast.message}
            icon={toast.icon}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>,
      document.getElementById(stashToastId)
    )
  ) : (
    <></>
  );
});

export default StashToast;
