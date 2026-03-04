"use client";

import { ReactNode } from "react";
import { SuiteSidebar } from "@/components/suite/SuiteSidebar";

export default function SuiteLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-black">
            {/* Suite Sidebar */}
            <SuiteSidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-64">
                {children}
            </main>
        </div>
    );
}
