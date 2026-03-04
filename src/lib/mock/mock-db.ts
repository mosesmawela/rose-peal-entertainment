
import { MOCK_ARTISTS, MOCK_PROJECTS, MOCK_TASKS, MOCK_EVENTS, MockArtist, MockProject, MockTask, MockEvent } from "./data";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class MockDatabase {
    private artists: MockArtist[] = [...MOCK_ARTISTS];
    private projects: MockProject[] = [...MOCK_PROJECTS];
    private tasks: MockTask[] = [...MOCK_TASKS];
    private events: MockEvent[] = [...MOCK_EVENTS];

    // ARTISTS
    async getArtists(): Promise<MockArtist[]> {
        await delay(300);
        return [...this.artists];
    }

    async getArtist(id: string): Promise<MockArtist | undefined> {
        await delay(200);
        return this.artists.find(a => a.id === id);
    }

    async createArtist(artist: Omit<MockArtist, "id">): Promise<MockArtist> {
        await delay(500);
        const newArtist = { ...artist, id: `a${Date.now()}` };
        this.artists.push(newArtist);
        return newArtist;
    }

    async updateArtist(id: string, updates: Partial<MockArtist>): Promise<MockArtist> {
        await delay(400);
        const index = this.artists.findIndex(a => a.id === id);
        if (index === -1) throw new Error("Artist not found");

        this.artists[index] = { ...this.artists[index], ...updates };
        return this.artists[index];
    }

    // PROJECTS
    async getProjects(artistId?: string): Promise<MockProject[]> {
        await delay(300);
        if (artistId) {
            return this.projects.filter(p => p.artistId === artistId);
        }
        return [...this.projects];
    }

    async getProject(id: string): Promise<MockProject | undefined> {
        await delay(200);
        return this.projects.find(p => p.id === id);
    }

    async createProject(project: Omit<MockProject, "id">): Promise<MockProject> {
        await delay(500);
        const newProject = { ...project, id: `p${Date.now()}` };
        this.projects.push(newProject);
        return newProject;
    }

    // TASKS
    async getTasks(projectId?: string): Promise<MockTask[]> {
        await delay(200);
        if (projectId) {
            return this.tasks.filter(t => t.projectId === projectId);
        }
        return [...this.tasks];
    }

    async updateTaskStatus(id: string, status: MockTask["status"]): Promise<MockTask> {
        await delay(300);
        const index = this.tasks.findIndex(t => t.id === id);
        if (index === -1) throw new Error("Task not found");

        this.tasks[index].status = status;
        return this.tasks[index];
    }

    // EVENTS
    async createEvent(event: Omit<MockEvent, "id">): Promise<MockEvent> {
        await delay(300);
        const newEvent = { ...event, id: `e${Date.now()}` };
        this.events.push(newEvent);
        return newEvent;
    }

    async getEvents(): Promise<MockEvent[]> {
        await delay(300);
        return [...this.events];
    }
}

export const mockDB = new MockDatabase();
