
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockDB } from "@/lib/mock/mock-db";
import { MockEvent } from "@/lib/mock/data";
import { AddEventModal } from "@/components/suite/AddEventModal";
import { useToast } from "@/providers/ToastContext";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<MockEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const { toast } = useToast();

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await mockDB.getEvents();
            setEvents(data);
        } catch (error) {
            toast("Failed to load events", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Calendar Logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        // Add empty slots for previous month
        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const days = getDaysInMonth(currentDate);

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const today = () => setCurrentDate(new Date());

    const getEventsForDate = (date: Date) => {
        return events.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate.getDate() === date.getDate() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getFullYear() === date.getFullYear();
        });
    };

    const getEventTypeColor = (type: string) => {
        switch (type) {
            case "Release": return "bg-rose-500 text-white";
            case "Session": return "bg-blue-500 text-white";
            case "Shoot": return "bg-amber-500 text-black";
            case "Live": return "bg-purple-500 text-white";
            default: return "bg-white/20 text-white";
        }
    };

    return (
        <div className="min-h-screen p-8 space-y-8 flex flex-col">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Calendar</h1>
                    <p className="text-white/60">Schedule sessions, releases, and deadlines</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                        <Button variant="ghost" onClick={prevMonth}><ChevronLeft className="w-4 h-4" /></Button>
                        <div className="w-32 text-center font-bold text-white">
                            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </div>
                        <Button variant="ghost" onClick={nextMonth}><ChevronRight className="w-4 h-4" /></Button>
                    </div>
                    <Button variant="ghost" onClick={today}>Today</Button>
                    <Button variant="primary" onClick={() => { setSelectedDate(new Date()); setIsModalOpen(true); }} className="gap-2">
                        <Plus className="w-4 h-4" />
                        ADD EVENT
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 glass-panel rounded-xl overflow-hidden flex flex-col">
                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-white/10">
                    {DAYS.map(day => (
                        <div key={day} className="py-3 px-4 text-center text-sm font-medium text-white/40 uppercase tracking-widest border-r border-white/5 last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Cells */}
                <div className="flex-1 grid grid-cols-7 grid-rows-5 auto-rows-fr bg-white/5">
                    {days.map((date, i) => (
                        <div
                            key={i}
                            onClick={() => { if (date) { setSelectedDate(date); setIsModalOpen(true); } }}
                            className={`min-h-[120px] p-2 border-b border-r border-white/5 relative group transition-colors hover:bg-white/5 ${!date ? "bg-black/20" : "cursor-pointer"}`}
                        >
                            {date && (
                                <>
                                    <span className={`text-sm font-medium block mb-2 ${date.toDateString() === new Date().toDateString()
                                            ? "bg-rose-500 text-white w-7 h-7 flex items-center justify-center rounded-full"
                                            : "text-white/60"
                                        }`}>
                                        {date.getDate()}
                                    </span>

                                    <div className="space-y-1">
                                        {loading && i === 0 ? (
                                            <div className="h-4 bg-white/10 rounded animate-pulse" />
                                        ) : (
                                            getEventsForDate(date).map(event => (
                                                <motion.div
                                                    key={event.id}
                                                    initial={{ opacity: 0, x: -5 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className={`text-[10px] px-2 py-1 rounded truncate font-medium ${getEventTypeColor(event.type)}`}
                                                >
                                                    {event.title}
                                                </motion.div>
                                            ))
                                        )}
                                    </div>

                                    {/* Hover Plus */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus className="w-4 h-4 text-white/40" />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <AddEventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
                onSuccess={() => {
                    fetchEvents();
                    setIsModalOpen(false);
                    toast("Event added to calendar", "success");
                }}
            />
        </div>
    );
}
