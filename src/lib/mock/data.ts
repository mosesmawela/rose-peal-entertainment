

import { ARTISTS } from "../data/artists";

// Types
export interface MockArtist {
    id: string;
    name: string;
    role: "Artist";
    image: string;
    genre: string;
    careerPhase: "Development" | "Breakout" | "Established" | "Star";
    activeProjects: number;
    monthlyListeners: string;
    stats: {
        streams: string;
        followers: string;
        engagement: string;
    };
    team: string[];
}

export interface MockProject {
    id: string;
    title: string;
    artistId: string;
    artistName: string;
    type: "Single" | "EP" | "Album" | "Campaign";
    status: "Planning" | "In Progress" | "Completed" | "Paused";
    progress: number;
    dueDate: string;
    tasks: number;
    completedTasks: number;
    coverImage?: string;
}

export interface MockTask {
    id: string;
    title: string;
    projectId: string;
    assignee: string;
    status: "todo" | "in-progress" | "review" | "done";
    priority: "low" | "medium" | "high";
    dueDate: string;
}

export interface MockEvent {
    id: string;
    title: string;
    type: "Release" | "Session" | "Meeting" | "Shoot" | "Live";
    date: Date;
    artistId?: string;
    location?: string;
}

// Seed Data
export const MOCK_ARTISTS: MockArtist[] = ARTISTS.map((artist, index) => {
    const phases: ("Development" | "Breakout" | "Established" | "Star")[] = ["Development", "Breakout", "Established", "Star"];
    
    // Use stable deterministic mock stats based on the index to preserve dashboard visuals
    const streamCount = (1.5 + (index * 0.4)).toFixed(1) + "M";
    const followerCount = (100 + (index * 25)) + "K";
    const engageRate = (8 + (index % 6) * 2) + "%";
    const activeProjects = artist.releases ? artist.releases.length : 0;
    
    return {
        id: artist.id,
        name: artist.name,
        role: "Artist",
        image: artist.image,
        genre: artist.genre,
        careerPhase: phases[index % 4],
        activeProjects: activeProjects || 1,
        monthlyListeners: artist.monthlyListeners || followerCount,
        stats: {
            streams: streamCount,
            followers: followerCount,
            engagement: engageRate
        },
        team: ["Manager: Sarah", "A&R: Mike", "PR: Jessica"]
    };
});

export const MOCK_PROJECTS: MockProject[] = ARTISTS.flatMap((artist) => {
    if (!artist.releases) return [];
    return artist.releases.map((release, rIndex) => {
        const statuses: ("Planning" | "In Progress" | "Completed" | "Paused")[] = ["Completed", "In Progress", "Planning", "Completed"];
        const status = statuses[rIndex % 4];
        
        return {
            id: `p${artist.id}_${rIndex}`,
            title: release.title,
            artistId: artist.id,
            artistName: artist.name,
            type: (release.type === "EP" || release.type === "Album" || release.type === "Single") ? release.type : "Single",
            status: status,
            progress: status === "Completed" ? 100 : (status === "Planning" ? 15 : 45),
            dueDate: `2024-${String((rIndex % 12) + 1).padStart(2, '0')}-15`,
            tasks: 12 + rIndex * 5,
            completedTasks: status === "Completed" ? 12 + rIndex * 5 : 5 + rIndex,
            coverImage: artist.image
        };
    });
});

export const MOCK_TASKS: MockTask[] = [
    { id: "t1", title: "Finalize EP Tracklist", projectId: "p1_0", assignee: "Mike (A&R)", status: "done", priority: "high", dueDate: "2024-02-01" },
    { id: "t2", title: "Book Studio for Vocals", projectId: "p1_0", assignee: "Sarah (Mgr)", status: "in-progress", priority: "high", dueDate: "2024-02-10" },
    { id: "t3", title: "Approve Cover Art", projectId: "p1_1", assignee: "Management", status: "todo", priority: "medium", dueDate: "2024-02-15" },
    { id: "t4", title: "Draft Press Release", projectId: "p1_2", assignee: "Jessica (PR)", status: "done", priority: "medium", dueDate: "2024-02-10" }
];

export const MOCK_EVENTS: MockEvent[] = [
    { id: "e1", title: "Release Party", type: "Release", date: new Date("2024-02-14T00:00:00"), artistId: "1" },
    { id: "e2", title: "Studio Session - Vocals", type: "Session", date: new Date(Date.now() + 86400000), artistId: "1", location: "RosePearl Main Studio" },
    { id: "e3", title: "Video Shoot", type: "Shoot", date: new Date(Date.now() + 172800000), artistId: "2", location: "Downtown Loft" },
    { id: "e4", title: "Weekly Strategy Meeting", type: "Meeting", date: new Date(Date.now() + 259200000), location: "Conference Room A" }
];
