
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Send, Bot, Sparkles, Check, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    type?: "text" | "plan";
    planData?: any;
}

export default function AIPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "m1",
            role: "assistant",
            content: "Hello. I am Rose, your Label Operations Agent. I can help you generate release strategies, analyze artist data, or draft marketing plans. How can I assist you today?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking and response
        setTimeout(() => {
            setIsTyping(false);
            const planMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I've analyzed the recent streaming data for Naledi Aphiwe. Based on the momentum from 'Buya Ekhaya', here is a recommended rollout strategy for the next single.",
                type: "plan",
                planData: {
                    title: "Strategic Rollout: Summer Waves",
                    artist: "Naledi Aphiwe",
                    duration: "6 Weeks",
                    phases: [
                        { name: "Teaser Phase", weeks: "Week 1-2", tasks: ["TikTok Snippet Campaign", "Reveal Cover Art", "Presave Link Live"] },
                        { name: "Release Week", weeks: "Week 3", tasks: ["Spotify Pitching", "Music Video Premiere", "Release Party"] },
                        { name: "Sustain", weeks: "Week 4-6", tasks: ["Remix Contest", "Radio Tour", "Behind the Scenes Content"] }
                    ]
                }
            };
            setMessages(prev => [...prev, planMsg]);
        }, 2500);
    };

    return (
        <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col p-4 md:p-8 max-w-6xl mx-auto">

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                    <Activity className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Rose Intelligence</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-white/40">Online & Ready</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 glass-panel rounded-2xl border border-white/5 overflow-hidden flex flex-col relative">

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "assistant" ? "bg-rose-500" : "bg-white/10"}`}>
                                {msg.role === "assistant" ? <Bot className="w-4 h-4 text-white" /> : <div className="text-xs text-white">YOU</div>}
                            </div>

                            {/* Content */}
                            <div className={`max-w-[80%] space-y-2`}>
                                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === "assistant"
                                    ? "bg-white/5 border border-white/5 text-white/90 rounded-tl-none"
                                    : "bg-rose-500 text-white rounded-tr-none"
                                    }`}>
                                    {msg.content}
                                </div>

                                {/* Plan Card (if type is plan) */}
                                {msg.type === "plan" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-black/40 border border-white/10 rounded-xl p-4 mt-2"
                                    >
                                        <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-3">
                                            <Sparkles className="w-4 h-4 text-amber-400" />
                                            <span className="font-bold text-white text-sm">{msg.planData.title}</span>
                                        </div>

                                        <div className="space-y-3">
                                            {msg.planData.phases.map((phase: any, i: number) => (
                                                <div key={i} className="flex gap-3">
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5" />
                                                        {i !== msg.planData.phases.length - 1 && <div className="w-px h-full bg-white/10 my-1" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white text-xs font-bold">{phase.name} <span className="text-white/40 font-normal ml-2">{phase.weeks}</span></h4>
                                                        <ul className="mt-1 space-y-1">
                                                            {phase.tasks.map((task: string, j: number) => (
                                                                <li key={j} className="text-white/60 text-xs flex items-center gap-1.5">
                                                                    <Check className="w-3 h-3 text-green-500/50" />
                                                                    {task}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-white/5 flex gap-2">
                                            <Button variant="primary" className="flex-1">Apply Plan</Button>
                                            <Button variant="ghost" className="flex-1">Modify</Button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center h-10">
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/5 bg-black/20 backdrop-blur-md">
                    <form onSubmit={handleSend} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask Rose (e.g., 'Plan a release for Naledi's new single')..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isTyping}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
