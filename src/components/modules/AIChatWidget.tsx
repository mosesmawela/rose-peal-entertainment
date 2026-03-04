"use client";

import { useEffect } from 'react';
import { useChatStore } from '@/lib/store/useChatStore';

export const AIChatWidget = () => {
    const { isOpen, toggleOpen, messages } = useChatStore();

    // Keyboard shortcut: Cmd/Ctrl + J
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
                e.preventDefault();
                toggleOpen();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [toggleOpen]);

    // Don't show button if chat is open
    if (isOpen) return null;

    // Check if there are unread messages (simple implementation)
    const hasUnread = false; // TODO: Implement unread logic if needed

    return (
        <button
            onClick={toggleOpen}
            className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 rounded-full shadow-2xl flex items-center justify-center z-[999] transition-all duration-300 hover:scale-110 group"
            aria-label="Open AI Chat"
        >
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 animate-ping opacity-20" />

            {/* RosePearl Logo */}
            <img
                src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360"
                alt="Rose"
                className="w-8 h-8 relative z-10 group-hover:rotate-12 transition-transform"
            />

            {/* Unread indicator */}
            {hasUnread && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-neutral-900 animate-pulse" />
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-neutral-900 border border-white/10 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Ask Rose (Ctrl+J)
                <div className="absolute top-full right-4 w-2 h-2 bg-neutral-900 border-r border-b border-white/10 transform rotate-45 -mt-1" />
            </div>
        </button>
    );
};
