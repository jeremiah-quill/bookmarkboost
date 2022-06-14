import { useState, useEffect, useContext, createContext } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const { toast, showToast, hideToast } = toastLogic();
  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(ToastContext);
};

export default function toastLogic() {
  const [toast, setToast] = useState({ showing: false });

  useEffect(() => {
    if (toast.showing) {
      setTimeout(() => {
        setToast((currToast) => ({ ...currToast, showing: false }));
      }, toast.delay);
    }
  }, [toast.showing]);

  const showToast = (type, delay, message) => {
    setToast({ type, message, delay, showing: true });
  };

  const hideToast = () => {
    setToast((currToast) => ({ ...currToast, showing: false }));
  };

  return { toast, showToast, hideToast };
}
