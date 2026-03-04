"use client";

import { create } from 'zustand';

// DEMO DATA
const DEMO_PLAYLIST: Track[] = [
    {
        id: "pb-001",
        title: "Ngiyabonga Nkosi",
        artist: "Prince Benza ft. Londie London",
        coverUrl: "https://i.ytimg.com/vi/W6PEJBkxG9Q/maxresdefault.jpg",
        audioUrl: "https://ik.imagekit.io/mosesmawela/Rose%20Peal/Prince%20Benza%20x%20Londie%20London%20_Ngizwile%20Dropping%20%20on%20the%2026th%20of%20September.....ChezaPrinceBenza%20.mp4",
        videoUrl: "https://ik.imagekit.io/mosesmawela/Rose%20Peal/Prince%20Benza%20x%20Londie%20London%20_Ngizwile%20Dropping%20%20on%20the%2026th%20of%20September.....ChezaPrinceBenza%20.mp4"
    },
    {
        id: "rp-002",
        title: "Neon Nights (Demo)",
        artist: "Rose Pearl Sound System",
        coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Royalty free placeholder
    },
    {
        id: "rp-003",
        title: "Midnight Drive",
        artist: "The Architects",
        coverUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
];

interface Track {
    id: string;
    title: string;
    artist: string;
    coverUrl?: string;
    audioUrl: string;
    videoUrl?: string; // Optional video background
}

interface AudioState {
    isPlaying: boolean;
    currentTrack: Track | null;
    currentTrackIndex: number;
    volume: number;
    queue: Track[];
    hasEntered: boolean;

    // Actions
    play: () => void;
    pause: () => void;
    setVolume: (vol: number) => void;
    setHasEntered: (val: boolean) => void;
    setTrack: (track: Track) => void;
    nextTrack: () => void;
    prevTrack: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
    isPlaying: false,
    currentTrack: DEMO_PLAYLIST[0],
    currentTrackIndex: 0,
    volume: 80,
    queue: DEMO_PLAYLIST,
    hasEntered: false,

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    setVolume: (volume) => set({ volume }),
    setHasEntered: (hasEntered) => set({ hasEntered }),

    setTrack: (track) => {
        const index = get().queue.findIndex(t => t.id === track.id);
        set({ currentTrack: track, currentTrackIndex: index !== -1 ? index : 0, isPlaying: true });
    },

    nextTrack: () => {
        const { currentTrackIndex, queue } = get();
        const nextIndex = (currentTrackIndex + 1) % queue.length;
        set({ currentTrack: queue[nextIndex], currentTrackIndex: nextIndex, isPlaying: true });
    },

    prevTrack: () => {
        const { currentTrackIndex, queue } = get();
        const prevIndex = (currentTrackIndex - 1 + queue.length) % queue.length;
        set({ currentTrack: queue[prevIndex], currentTrackIndex: prevIndex, isPlaying: true });
    }
}));
