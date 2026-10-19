"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Toast = {
  id: number;
  message: string;
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const show = useCallback((message: string, duration = 3500) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const detail = (event as CustomEvent<{ message: string; duration?: number }>).detail;
      if (detail?.message) show(detail.message, detail.duration);
    };
    window.addEventListener("broadcast-toast", handleToast);
    return () => window.removeEventListener("broadcast-toast", handleToast);
  }, [show]);

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="toast"
          style={{
            animation: `toastIn 0.4s cubic-bezier(0.2, 0, 0, 1) forwards`,
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
