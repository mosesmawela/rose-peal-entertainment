"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_ITEMS = [
    { label: "Overview", href: "/admin/dashboard", icon: "📊" },
    { label: "Artists", href: "/admin/artists", icon: "🎤" },
    { label: "Releases", href: "/admin/releases", icon: "💿" },
    { label: "Events", href: "/admin/events", icon: "📅" },
    { label: "Store", href: "/admin/store", icon: "🛍️" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-neutral-900 flex flex-col fixed inset-y-0 left-0">
                <div className="p-6 border-b border-white/10">
                    <h1 className="font-bold tracking-tight text-white">ROSE PEARL <span className="text-rose-500">OS</span></h1>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Internal System v1.0</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                    }`}>
                                    <span>{item.icon}</span>
                                    {item.label}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 bg-white/10 rounded-full" />
                        <div>
                            <p className="text-xs font-bold text-white">Admin User</p>
                            <p className="text-[10px] text-white/40">Super Admin</p>
                        </div>
                    </div>
                    <Button variant="glass" className="w-full !text-xs">Sign Out</Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
