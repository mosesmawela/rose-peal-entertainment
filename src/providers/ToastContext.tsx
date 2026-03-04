
"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, AlertCircle, X, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = "success") => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto dismiss
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            layout
                            className="pointer-events-auto min-w-[300px] glass-panel border-l-4 p-4 rounded-r-lg shadow-2xl flex items-start gap-3 backdrop-blur-xl"
                            style={{
                                borderLeftColor:
                                    t.type === "success" ? "#10b981" :
                                        t.type === "error" ? "#ef4444" : "#3b82f6"
                            }}
                        >
                            <div className="mt-0.5">
                                {t.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                                {t.type === "error" && <AlertCircle className="w-5 h-5 text-rose-500" />}
                                {t.type === "info" && <Info className="w-5 h-5 text-blue-500" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-medium text-sm leading-tight">{t.message}</p>
                            </div>
                            <button
                                onClick={() => removeToast(t.id)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
