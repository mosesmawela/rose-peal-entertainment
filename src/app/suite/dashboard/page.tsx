"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, FolderOpen, Bot, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SuiteDashboard() {
    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-white/60">Welcome to the RosePearl Label Suite</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={Users}
                    label="Active Artists"
                    value="2"
                    change="+1 this month"
                    trend="up"
                />
                <StatCard
                    icon={FolderOpen}
                    label="Active Projects"
                    value="3"
                    change="2 in production"
                    trend="neutral"
                />
                <StatCard
                    icon={Bot}
                    label="AI Plans Pending"
                    value="1"
                    change="Awaiting approval"
                    trend="neutral"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Releases This Month"
                    value="1"
                    change="Buya Ekhaya"
                    trend="up"
                />
            </div>

            {/* Quick Actions */}
            <div className="glass-panel p-6 rounded-lg mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Create Project</Button>
                    <Button variant="glass">Add Artist</Button>
                    <Button variant="glass">Schedule Event</Button>
                    <Button variant="glass">Upload Media</Button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="glass-panel p-6 rounded-lg">
                <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    <ActivityItem
                        title="New release added"
                        description="Buya Ekhaya by Mawelele & Naledi Aphiwe"
                        time="2 hours ago"
                    />
                    <ActivityItem
                        title="Artist profile updated"
                        description="Naledi Aphiwe - Added new social links"
                        time="1 day ago"
                    />
                    <ActivityItem
                        title="Project created"
                        description="Midnight Dreams EP - Planning phase"
                        time="3 days ago"
                    />
                </div>
            </div>
        </div>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    change,
    trend
}: {
    icon: any;
    label: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
}) {
    return (
        <motion.div
            className="glass-panel p-6 rounded-lg"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-rose-500/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-rose-500" />
                </div>
                {trend === "up" && (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                )}
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-white/60 text-sm mb-1">{label}</p>
            <p className="text-white/40 text-xs">{change}</p>
        </motion.div>
    );
}

function ActivityItem({ title, description, time }: { title: string; description: string; time: string }) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="w-2 h-2 rounded-full bg-rose-500 mt-2" />
            <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{title}</p>
                <p className="text-white/60 text-xs">{description}</p>
            </div>
            <p className="text-white/40 text-xs whitespace-nowrap">{time}</p>
        </div>
    );
}
