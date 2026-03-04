"use client";

import { Button } from "@/components/ui/Button";

const RELEASES = [
    { id: 101, title: "After Hours", artist: "The Weeknd", type: "Album", date: "2024-03-20" },
    { id: 102, title: "SOS", artist: "SZA", type: "Album", date: "2024-02-14" },
    { id: 103, title: "Utopia", artist: "Travis Scott", type: "LP", date: "2024-01-05" },
    { id: 104, title: "Chanel", artist: "Frank Ocean", type: "Single", date: "2023-12-10" },
];

export default function AdminReleasesPage() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Catalog Manager</h1>
                    <p className="text-white/40 text-sm">Schedule releases, metadata, and distribution.</p>
                </div>
                <Button variant="primary" className="!px-4 !py-2 text-xs">+ Create Release</Button>
            </header>

            <div className="bg-neutral-900 border border-white/5 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/5 flex gap-4">
                    <input type="text" placeholder="Search catalog..." className="bg-black/50 border border-white/10 rounded px-3 py-1 text-sm outline-none focus:border-rose-500 w-64" />
                </div>
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-white/40 uppercase tracking-widest text-[10px]">
                        <tr>
                            <th className="p-4 font-normal">Title</th>
                            <th className="p-4 font-normal">Artist</th>
                            <th className="p-4 font-normal">Type</th>
                            <th className="p-4 font-normal">Release Date</th>
                            <th className="p-4 font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {RELEASES.map((release) => (
                            <tr key={release.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4 font-bold text-white">{release.title}</td>
                                <td className="p-4 text-white/80">{release.artist}</td>
                                <td className="p-4">
                                    <span className="border border-white/10 px-2 py-0.5 rounded text-[10px] uppercase text-white/60">
                                        {release.type}
                                    </span>
                                </td>
                                <td className="p-4 text-rose-500 font-mono text-xs">{release.date}</td>
                                <td className="p-4 text-right">
                                    <Button variant="glass" className="!py-1 !px-3 !text-[10px] opacity-0 group-hover:opacity-100">Manage</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
