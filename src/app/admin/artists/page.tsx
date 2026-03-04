"use client";

import { Button } from "@/components/ui/Button";

const ARTISTS = [
    { id: 1, name: "The Weeknd", status: "Active", releases: 12 },
    { id: 2, name: "Frank Ocean", status: "Active", releases: 4 },
    { id: 3, name: "SZA", status: "Touring", releases: 8 },
    { id: 4, name: "Travis Scott", status: "Hiatus", releases: 15 },
];

export default function AdminArtistsPage() {
    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Artist Manager</h1>
                    <p className="text-white/40 text-sm">Manage roster, profiles, and contract details.</p>
                </div>
                <Button variant="primary" className="!px-4 !py-2 text-xs">+ Add New Artist</Button>
            </header>

            <div className="bg-neutral-900 border border-white/5 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-white/40 uppercase tracking-widest text-[10px]">
                        <tr>
                            <th className="p-4 font-normal">Name</th>
                            <th className="p-4 font-normal">Status</th>
                            <th className="p-4 font-normal">Releases</th>
                            <th className="p-4 font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {ARTISTS.map((artist) => (
                            <tr key={artist.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4 font-bold text-white">{artist.name}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${artist.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                                        }`}>
                                        {artist.status}
                                    </span>
                                </td>
                                <td className="p-4 text-white/60">{artist.releases} Catalog items</td>
                                <td className="p-4 text-right">
                                    <Button variant="glass" className="!py-1 !px-3 !text-[10px] opacity-0 group-hover:opacity-100">Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
