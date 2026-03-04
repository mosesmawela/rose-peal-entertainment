"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useSoundEffect } from "@/hooks/useSoundEffect";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();
    const { play } = useSoundEffect();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Placeholder for actual auth until Env Vars are verified
        // const { error } = await supabase.auth.signInWithPassword({ email, password });

        // For Dev Prototype: Simulate success
        setTimeout(() => {
            play('success'); // Audio feedback
            router.push("/admin/dashboard");
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold tracking-tighter text-white">SYSTEM ACCESS</h1>
                    <p className="text-rose-500 uppercase tracking-widest text-[10px] font-bold">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Email ID</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-sm focus:border-rose-500 outline-none transition-colors"
                            placeholder="admin@rosepearl.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold ml-1">Passkey</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-sm focus:border-rose-500 outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <Button variant="primary" className="w-full">
                        {loading ? "Authenticating..." : "Establish Session"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
