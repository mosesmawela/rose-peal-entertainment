"use client";

import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/lib/store/useChatStore';
import { ChatMessage } from '@/components/ui/ChatMessage';
import { usePathname } from 'next/navigation';
import { X, Send, Mic, MicOff, Sparkles } from 'lucide-react';

export const ChatInterface = () => {
    const {
        isOpen,
        messages,
        isLoading,
        error,
        voiceMode,
        currentPage,
        userType,
        setOpen,
        addMessage,
        setLoading,
        setError,
        toggleVoiceMode,
        setCurrentPage,
        clearError,
    } = useChatStore();

    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const pathname = usePathname();

    // Update current page when pathname changes
    useEffect(() => {
        setCurrentPage(pathname);
    }, [pathname, setCurrentPage]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        clearError();

        // Add user message
        addMessage({
            role: 'user',
            content: userMessage,
        });

        setLoading(true);

        try {
            // Send to API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    conversationHistory: messages.map(msg => ({
                        role: msg.role,
                        content: msg.content,
                    })),
                    voiceMode,
                    currentPage,
                    userType,
                    isAdmin: false, // TODO: Check actual admin status
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get response');
            }

            const data = await response.json();

            // Add assistant message with quick actions
            addMessage({
                role: 'assistant',
                content: data.response,
                quickActions: data.quickActions || [],
            });
        } catch (err: any) {
            console.error('Chat error:', err);
            setError(err.message || 'Something went wrong. Please try again.');

            // Add error message
            addMessage({
                role: 'assistant',
                content: '❌ Sorry, I encountered an error. Please try again or contact support if the issue persists.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[998] animate-in slide-in-from-bottom-4 fade-in duration-300">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-rose-500/10 to-purple-500/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center p-1.5">
                        <img src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360" alt="Rose" className="w-full h-full" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-sm">Rose</h3>
                        <p className="text-white/50 text-xs">RosePearl AI Assistant</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Voice mode toggle */}
                    <button
                        onClick={toggleVoiceMode}
                        className={`p-2 rounded-lg transition-colors ${voiceMode
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-white/5 text-white/40 hover:text-white/60'
                            }`}
                        title={voiceMode ? 'Voice mode ON' : 'Voice mode OFF'}
                    >
                        {voiceMode ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </button>

                    {/* Close button */}
                    <button
                        onClick={() => setOpen(false)}
                        className="p-2 rounded-lg bg-white/5 text-white/40 hover:text-white/60 hover:bg-white/10 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-500/20 to-purple-500/20 flex items-center justify-center p-3">
                            <img src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360" alt="Rose" className="w-full h-full" />
                        </div>
                        <h4 className="text-white font-medium mb-2">Hey, I'm Rose 🌹</h4>
                        <p className="text-white/50 text-sm max-w-xs mx-auto">
                            Your RosePearl AI assistant. Ask me about artists, music, bookings, or anything else!
                        </p>
                    </div>
                )}

                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Error display */}
            {error && (
                <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 text-red-400 text-xs">
                    {error}
                </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-neutral-900/50">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask Rose anything..."
                        disabled={isLoading}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-rose-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="px-4 py-2.5 bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 disabled:from-rose-500/50 disabled:to-purple-600/50 rounded-xl text-white text-sm font-medium transition-all disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>

                <p className="text-[10px] text-white/30 mt-2 text-center">
                    Press Enter to send • {voiceMode ? 'Voice mode active' : 'Text mode'}
                </p>
            </div>
        </div>
    );
};
