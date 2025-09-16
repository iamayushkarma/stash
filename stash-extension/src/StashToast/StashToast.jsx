import useStashToast from "./useStashToast";
import ReactDom from "react-dom";
import StashToastUi from "./StashToastUi";
import { X, Lock, Check } from "lucide-react";
import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StashToast = forwardRef(({ autoClose, autoClosrTime = 1700 }, ref) => {
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

  // StashToast.jsx (just the return part)

  return loaded
    ? ReactDom.createPortal(
        <div>
          {" "}
          {/* Stack toasts from top */}
          <AnimatePresence initial={false}>
            {toast.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05)",
                }}
                className="mb-2 rounded-lg"
              >
                <StashToastUi
                  type={t.type}
                  message={t.message}
                  icon={t.icon}
                  onClose={() => removeToast(t.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.getElementById(stashToastId)
      )
    : null;
});

export default StashToast;
