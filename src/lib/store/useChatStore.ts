import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuickAction } from '@/lib/ai/knowledge-base';

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    quickActions?: QuickAction[];
}

interface ChatStore {
    // State
    isOpen: boolean;
    hasUnread: boolean;
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    voiceMode: boolean;
    currentPage: string;
    userType: 'fan' | 'artist' | 'brand' | 'admin' | null;

    // Actions
    setOpen: (open: boolean) => void;
    toggleOpen: () => void;
    addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    toggleVoiceMode: () => void;
    setCurrentPage: (page: string) => void;
    setUserType: (type: 'fan' | 'artist' | 'brand' | 'admin' | null) => void;
    clearMessages: () => void;
    clearError: () => void;
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set) => ({
            // Initial state
            isOpen: false,
            hasUnread: false,
            messages: [],
            isLoading: false,
            error: null,
            voiceMode: false,
            currentPage: '/',
            userType: null,

            // Actions
            setOpen: (open) => set({ isOpen: open, ...(open ? { hasUnread: false } : {}) }),

            toggleOpen: () => set((state) => ({
                isOpen: !state.isOpen,
                ...(!state.isOpen ? { hasUnread: false } : {})
            })),

            addMessage: (message) => set((state) => ({
                messages: [
                    ...state.messages,
                    {
                        ...message,
                        id: `${Date.now()}-${Math.random()}`,
                        timestamp: new Date(),
                    },
                ],
                ...(message.role === 'assistant' && !state.isOpen ? { hasUnread: true } : {})
            })),

            setLoading: (loading) => set({ isLoading: loading }),

            setError: (error) => set({ error }),

            toggleVoiceMode: () => set((state) => ({ voiceMode: !state.voiceMode })),

            setCurrentPage: (page) => set({ currentPage: page }),

            setUserType: (type) => set({ userType: type }),

            clearMessages: () => set({ messages: [] }),

            clearError: () => set({ error: null }),
        }),
        {
            name: 'rosepearl-chat-storage',
            partialize: (state) => ({
                messages: state.messages.slice(-20), // Only persist last 20 messages
                voiceMode: state.voiceMode,
                hasUnread: state.hasUnread,
            }),
        }
    )
);
