
"use client";

import { motion } from "framer-motion";
import { FolderOpen, Calendar, CheckSquare, MoreHorizontal, ArrowRight } from "lucide-react";
import { MockProject } from "@/lib/mock/data";

interface ProjectCardProps {
    project: MockProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const statusColors = {
        "Planning": "text-amber-400 border-amber-500/30 bg-amber-500/10",
        "In Progress": "text-blue-400 border-blue-500/30 bg-blue-500/10",
        "Completed": "text-green-400 border-green-500/30 bg-green-500/10",
        "Paused": "text-red-400 border-red-500/30 bg-red-500/10"
    };

    return (
        <motion.div
            className="group glass-panel p-6 rounded-2xl border border-white/5 hover:border-rose-500/30 transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -4 }}
        >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/5 group-hover:to-transparent transition-colors duration-500" />

            {/* Header */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${statusColors[project.status].replace("text-", "bg-").replace("border-", "").split(" ")[2]}`}>
                        <FolderOpen className={`w-6 h-6 ${statusColors[project.status].split(" ")[0]}`} />
                    </div>
                    <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusColors[project.status]}`}>
                            {project.status}
                        </span>
                    </div>
                </div>
                <button className="text-white/40 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Content */}
            <div className="relative z-10 mb-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-rose-500 transition-colors">{project.title}</h3>
                <p className="text-white/60 text-sm">{project.artistName} • {project.type}</p>
            </div>

            {/* Progress */}
            <div className="relative z-10 space-y-2 mb-6">
                <div className="flex justify-between text-xs text-white/40">
                    <span>Overall Progress</span>
                    <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-rose-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                </div>
            </div>

            {/* Footer Stats */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>{project.completedTasks}/{project.tasks}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-white/50">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(project.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors -mr-2">
                    <ArrowRight className="w-4 h-4" />
                </div>
            </div>

        </motion.div>
    );
}
