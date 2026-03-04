"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    Calendar,
    FolderOpen,
    FileAudio,
    Bot,
    Settings,
    Sparkles
} from "lucide-react";

const navigation = [
    { name: "Dashboard", href: "/suite", icon: LayoutDashboard },
    { name: "Artists", href: "/suite/artists", icon: Users },
    { name: "Projects", href: "/suite/projects", icon: FolderOpen },
    { name: "Calendar", href: "/suite/calendar", icon: Calendar },
    { name: "Media Vault", href: "/suite/media", icon: FileAudio },
    { name: "AI Agents", href: "/suite/ai", icon: Bot },
    { name: "Settings", href: "/suite/settings", icon: Settings },
];

export function SuiteSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-white/10 flex flex-col z-40">
            {/* Logo / Brand */}
            <div className="p-6 border-b border-white/10">
                <Link href="/suite" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Image
                            src="https://ik.imagekit.io/mosesmawela/Rose%20Pearl/logo(icon).svg?updatedAt=1770182492360"
                            alt="Rose Pearl Logo"
                            fill
                            className="object-contain invert-0"
                        />
                    </div>
                    <div>
                        <h1 className="text-white font-bold text-lg tracking-tight">RosePearl</h1>
                        <p className="text-white/40 text-xs uppercase tracking-widest">Label Suite</p>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                    const Icon = item.icon;

                    return (
                        <Link key={item.name} href={item.href}>
                            <motion.div
                                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-colors cursor-pointer
                  ${isActive
                                        ? "bg-rose-500/10 text-rose-500"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                    }
                `}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-r"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Info / Role Badge */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-xs font-bold text-black">
                        SA
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">Super Admin</p>
                        <p className="text-white/40 text-xs">Full Access</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
