
import { User, Calendar, FolderOpen, Video, Music, CheckCircle, Clock, AlertTriangle } from "lucide-react";

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
export const MOCK_ARTISTS: MockArtist[] = [
    {
        id: "a1",
        name: "Naledi Aphiwe",
        role: "Artist",
        image: "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/naledi.jpg",
        genre: "Afro-Soul / Pop",
        careerPhase: "Breakout",
        activeProjects: 2,
        monthlyListeners: "245.5K",
        stats: {
            streams: "1.2M",
            followers: "85K",
            engagement: "12%"
        },
        team: ["Manager: Sarah", "A&R: Mike", "PR: Jessica"]
    },
    {
        id: "a2",
        name: "Mawelele",
        role: "Artist",
        image: "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/mawelele.jpg",
        genre: "Traditional / Maskandi",
        careerPhase: "Established",
        activeProjects: 1,
        monthlyListeners: "89.2K",
        stats: {
            streams: "450K",
            followers: "32K",
            engagement: "8%"
        },
        team: ["Manager: David", "A&R: Mike"]
    },
    {
        id: "a3",
        name: "Young Rose",
        role: "Artist",
        image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=800&auto=format&fit=crop&q=60",
        genre: "Hip Hop",
        careerPhase: "Development",
        activeProjects: 3,
        monthlyListeners: "1.2K",
        stats: {
            streams: "5K",
            followers: "800",
            engagement: "25%"
        },
        team: ["Manager: Sarah"]
    }
];

export const MOCK_PROJECTS: MockProject[] = [
    {
        id: "p1",
        title: "Buya Ekhaya",
        artistId: "a1",
        artistName: "Mawelele & Naledi Aphiwe",
        type: "Single",
        status: "Completed",
        progress: 100,
        dueDate: "2024-02-14",
        tasks: 12,
        completedTasks: 12,
        coverImage: "https://ik.imagekit.io/mosesmawela/Rose%20Pearl/releases/buya-ekhaya.jpg"
    },
    {
        id: "p2",
        title: "Midnight Dreams",
        artistId: "a1",
        artistName: "Naledi Aphiwe",
        type: "EP",
        status: "In Progress",
        progress: 45,
        dueDate: "2024-04-20",
        tasks: 24,
        completedTasks: 10
    },
    {
        id: "p3",
        title: "The Come Up",
        artistId: "a3",
        artistName: "Young Rose",
        type: "Album",
        status: "Planning",
        progress: 15,
        dueDate: "2024-08-01",
        tasks: 50,
        completedTasks: 5
    }
];

export const MOCK_TASKS: MockTask[] = [
    { id: "t1", title: "Finalize EP Tracklist", projectId: "p2", assignee: "Mike (A&R)", status: "done", priority: "high", dueDate: "2024-02-01" },
    { id: "t2", title: "Book Studio for Vocals", projectId: "p2", assignee: "Sarah (Mgr)", status: "in-progress", priority: "high", dueDate: "2024-02-10" },
    { id: "t3", title: "Approve Cover Art", projectId: "p2", assignee: "Naledi", status: "todo", priority: "medium", dueDate: "2024-02-15" },
    { id: "t4", title: "Draft Press Release", projectId: "p1", assignee: "Jessica (PR)", status: "done", priority: "medium", dueDate: "2024-02-10" }
];

export const MOCK_EVENTS: MockEvent[] = [
    { id: "e1", title: "Buya Ekhaya Release", type: "Release", date: new Date("2024-02-14T00:00:00"), artistId: "a1" },
    { id: "e2", title: "Studio Session - Vocals", type: "Session", date: new Date(Date.now() + 86400000), artistId: "a1", location: "RosePearl Main Studio" },
    { id: "e3", title: "Video Shoot - Midnight", type: "Shoot", date: new Date(Date.now() + 172800000), artistId: "a1", location: "Downtown Loft" },
    { id: "e4", title: "Weekly Strategy Meeting", type: "Meeting", date: new Date(Date.now() + 259200000), location: "Conference Room A" }
];
