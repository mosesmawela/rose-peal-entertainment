"use client";

import { useEffect } from "react";

// Extend the Window interface for Unicorn Studio
interface UnicornStudioInstance {
    isInitialized?: boolean;
    init: () => void;
}

declare global {
    interface Window {
        UnicornStudio?: UnicornStudioInstance;
    }
}

export function UnicornStudio() {
    useEffect(() => {
        const initUnicorn = () => {
            const u = window.UnicornStudio;
            if (u && u.init) {
                if (document.readyState === "loading") {
                    document.addEventListener("DOMContentLoaded", () => u.init());
                } else {
                    u.init();
                }
            } else {
                window.UnicornStudio = { isInitialized: false, init: () => { } };
                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";
                script.onload = () => {
                    if (document.readyState === "loading") {
                        document.addEventListener("DOMContentLoaded", () => window.UnicornStudio?.init());
                    } else {
                        window.UnicornStudio?.init();
                    }
                };
                (document.head || document.body).appendChild(script);
            }
        };

        initUnicorn();
    }, []);

    return (
        <div className="w-full flex justify-center py-20 bg-black overflow-hidden">
            <div
                data-us-project="TybiYSaXQO4W70VgCko4"
                className="unicorn-container relative"
            ></div>
        </div>
    );
}
