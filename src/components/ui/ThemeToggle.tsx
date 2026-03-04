"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-full border border-white/10 bg-white/5" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors overflow-hidden group"
            aria-label="Toggle theme"
        >
            <div className="relative z-10">
                <motion.div
                    initial={false}
                    animate={{
                        scale: isDark ? 1 : 0,
                        opacity: isDark ? 1 : 0,
                        rotate: isDark ? 0 : 90,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <Moon className="w-4 h-4 text-rose-500" />
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{
                        scale: isDark ? 0 : 1,
                        opacity: isDark ? 0 : 1,
                        rotate: isDark ? -90 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                >
                    <Sun className="w-4 h-4 text-amber-500" />
                </motion.div>
            </div>

            {/* Background glow effect */}
            <div className={`absolute inset-0 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-10 bg-amber-500/20'}`} />
        </button>
    );
}
