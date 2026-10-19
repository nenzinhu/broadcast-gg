"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Toast = {
  id: number;
  message: string;
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const show = (message: string, duration = 3500) => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  // Exposta globalmente para outros componentes usarem via window
  if (typeof window !== "undefined") {
    (window as any).__broadcastToast = show;
  }

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
