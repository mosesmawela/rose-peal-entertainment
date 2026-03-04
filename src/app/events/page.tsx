"use client";

import { Button } from "@/components/ui/Button";

const EVENTS = [
    {
        id: 1,
        date: { day: "12", month: "OCT" },
        title: "Midnight Rose Launch Party",
        location: "Los Angeles, CA",
        venue: "The Warehouse",
        status: "RSVP Open"
    },
    {
        id: 2,
        date: { day: "24", month: "NOV" },
        title: "SZA - Unplugged Session",
        location: "New York, NY",
        venue: "Blue Note",
        status: "Sold Out"
    },
    {
        id: 3,
        date: { day: "05", month: "DEC" },
        title: "Rose Pearl x Art Basel",
        location: "Miami, FL",
        venue: "Secret Location",
        status: "Waitlist"
    },
];

export default function EventsPage() {
    return (
        <div className="min-h-screen p-8 lg:p-20 max-w-6xl mx-auto">
            <header className="mb-20 flex flex-col items-center text-center">
                <h1 className="text-6xl font-bold tracking-tighter mb-4">LIVE</h1>
                <p className="text-white/40 uppercase tracking-[0.3em] text-xs">Showcases & Activations</p>
            </header>

            <div className="space-y-4">
                {EVENTS.map((event) => (
                    <div key={event.id} className="group relative bg-neutral-900/40 border border-white/5 rounded-xl p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-8 hover:bg-neutral-800/40 transition-colors overflow-hidden">

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex items-center gap-8 flex-1 w-full">
                            {/* Date */}
                            <div className="flex flex-col items-center justify-center min-w-[80px] border-r border-white/10 pr-8">
                                <span className="text-3xl font-bold text-white tracking-tighter">{event.date.day}</span>
                                <span className="text-xs text-rose-500 uppercase tracking-widest font-bold">{event.date.month}</span>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-1 tracking-tight">{event.title}</h3>
                                <p className="text-white/40 text-sm flex items-center gap-2">
                                    <span className="uppercase tracking-widest text-[10px]">{event.location}</span>
                                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                                    <span>{event.venue}</span>
                                </p>
                            </div>
                        </div>

                        {/* Action */}
                        <div className="relative z-10 w-full lg:w-auto flex justify-end">
                            <Button
                                variant={event.status === "Sold Out" ? "glass" : "primary"}
                                className={event.status === "Sold Out" ? "opacity-50 cursor-not-allowed" : ""}
                            >
                                {event.status === "Sold Out" ? "Sold Out" : "Get Tickets"}
                            </Button>
                        </div>

                    </div>
                ))}
            </div>

            <div className="mt-20 text-center">
                <p className="text-white/20 text-xs uppercase tracking-widest mb-4">Past Events Archive</p>
                <Button variant="glass" className="!py-2 !px-6 !text-[10px]">View History</Button>
            </div>

        </div>
    );
}
