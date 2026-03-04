
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/suite/ProjectCard";
import { mockDB } from "@/lib/mock/mock-db";
import { MockProject } from "@/lib/mock/data";
import { AddProjectModal } from "@/components/suite/AddProjectModal";
import { useToast } from "@/providers/ToastContext";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<MockProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { toast } = useToast();

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await mockDB.getProjects();
            setProjects(data);
        } catch (error) {
            toast("Failed to load projects", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.artistName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All" || project.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen p-8 space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Projects</h1>
                    <p className="text-white/60">Track releases, campaigns, and production schedules</p>
                </div>
                <Button variant="primary" onClick={() => setIsModalOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    NEW PROJECT
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="glass-panel p-4 rounded-xl flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-rose-500/50 transition-colors"
                    />
                </div>

                <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                    {["All", "Planning", "In Progress", "Completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${statusFilter === status
                                    ? "bg-rose-500 text-white shadow-lg"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        [...Array(4)].map((_, i) => (
                            <motion.div
                                key={`skeleton-${i}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-[200px] glass-panel rounded-2xl animate-pulse bg-white/5"
                            />
                        ))
                    ) : filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-60"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <FolderOpen className="w-8 h-8 text-white/40" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                            <p className="text-white/60 mb-6">Create a new project to get started</p>
                            <Button variant="ghost" onClick={() => { setSearchQuery(""); setStatusFilter("All"); }}>Clear Filters</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AddProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => {
                    fetchProjects();
                    setIsModalOpen(false);
                    toast("Project created successfully", "success");
                }}
            />
        </div>
    );
}
