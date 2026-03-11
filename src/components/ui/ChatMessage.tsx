"use client";

import { ChatMessage as ChatMessageType } from '@/lib/store/useChatStore';
import { QuickActions } from './QuickActions';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
    message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
    const isUser = message.role === 'user';

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
                {/* Message bubble */}
                <div
                    className={`rounded-2xl px-4 py-3 ${isUser
                            ? 'bg-rose-500/20 border border-rose-500/30 text-white'
                            : 'bg-white/5 border border-white/10 text-white/90'
                        }`}
                >
                    {isUser ? (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                    ) : (
                        <div className="text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                    a: ({ href, children }) => {
                                        const isUnsafe = href ? /^\s*(?:javascript|vbscript|data):/i.test(href) : false;
                                        const safeHref = isUnsafe ? '#' : href;
                                        return (
                                            <a
                                                href={safeHref}
                                                className="text-rose-400 hover:text-rose-300 underline"
                                                target={safeHref?.startsWith('http') ? '_blank' : undefined}
                                                rel={safeHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            >
                                                {children}
                                            </a>
                                        );
                                    },
                                    ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                                    li: ({ children }) => <li className="mb-1">{children}</li>,
                                    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                    em: ({ children }) => <em className="italic">{children}</em>,
                                    code: ({ children }) => (
                                        <code className="bg-white/10 px-1.5 py-0.5 rounded text-rose-300 text-xs">
                                            {children}
                                        </code>
                                    ),
                                }}
                            >
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Quick actions (only for assistant messages) */}
                {!isUser && message.quickActions && message.quickActions.length > 0 && (
                    <QuickActions actions={message.quickActions} />
                )}

                {/* Timestamp */}
                <div className={`text-[10px] text-white/30 mt-1 px-2 ${isUser ? 'text-right' : 'text-left'}`}>
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
        </div>
    );
};
