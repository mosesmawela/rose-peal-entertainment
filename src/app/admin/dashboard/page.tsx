"use client";

import { Button } from "@/components/ui/Button";

const STATS = [
    { label: "Total Streams", value: "842.5K", change: "+12%", trend: "up" },
    { label: "Gross Revenue", value: "$42,390", change: "+8%", trend: "up" },
    { label: "Active Listeners", value: "12,405", change: "-2%", trend: "down" },
    { label: "Merch Sales", value: "48 Orders", change: "+24%", trend: "up" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
                    <p className="text-white/40 text-sm">Real-time performance overview.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="glass" className="!px-4 !py-2 text-xs">Download Report</Button>
                    <Button variant="primary" className="!px-4 !py-2 text-xs">Refresh Data</Button>
                </div>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                    <div key={i} className="bg-neutral-900 border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150" />

                        <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>

                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${stat.trend === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}>
                            {stat.change} vs last month
                        </span>
                    </div>
                ))}
            </div>

            {/* Main Chart Area Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-neutral-900 border border-white/5 rounded-xl p-8 h-96 flex flex-col">
                    <h3 className="text-lg font-bold mb-6">Revenue Analytics</h3>
                    <div className="flex-1 bg-white/5 rounded-lg flex items-center justify-center border border-dashed border-white/10">
                        <span className="text-white/20 text-xs uppercase tracking-widest">Chart Visualization</span>
                    </div>
                </div>

                {/* Live Feed */}
                <div className="bg-neutral-900 border border-white/5 rounded-xl p-8 h-96 flex flex-col">
                    <h3 className="text-lg font-bold mb-6">Live Activity</h3>
                    <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex gap-3 items-start text-sm border-b border-white/5 pb-3 last:border-0">
                                <div className="w-2 h-2 bg-rose-500 rounded-full mt-1.5" />
                                <div>
                                    <p className="text-white/80"><span className="font-bold">New Order</span> #102{i}</p>
                                    <p className="text-[10px] text-white/40">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
