import { createContext, useContext, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const pendingToast = useRef(null);

  const showToast = (message, type = "success") => {
    pendingToast.current = { message, type };
  };

  useEffect(() => {
    if (pendingToast.current) {
      // delay ensures the DOM is mounted
      setTimeout(() => {
        toast[pendingToast.current.type](pendingToast.current.message, {
          duration: 3000,
        });
        pendingToast.current = null;
      }, 100); // tiny delay
    }
  });

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
