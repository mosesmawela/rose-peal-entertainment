
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FolderOpen, Calendar, Music, TrendingUp, ArrowRight, Play, Star, MoreHorizontal, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { mockDB } from "@/lib/mock/mock-db";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    artists: 0,
    projects: 0,
    activeProjects: 0,
    upcomingEvents: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [artists, projects, events] = await Promise.all([
        mockDB.getArtists(),
        mockDB.getProjects(),
        mockDB.getEvents()
      ]);

      // PERFORMANCE OPTIMIZATION: Cache current Date outside of loop to avoid repeated object instantiation
      // Reduces memory allocations and CPU cycles when filtering large event arrays.
      const now = new Date();
      setStats({
        artists: artists.length,
        projects: projects.length,
        activeProjects: projects.filter(p => p.status === "In Progress").length,
        upcomingEvents: events.filter(e => new Date(e.date) > now).length
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen p-8 space-y-8 relative overflow-hidden">

      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      {/* Header with pill nav */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Welcome back, Admin</h1>
          <p className="text-white/60 text-sm">Wednesday, Oct 24 • <span className="text-rose-400">3 Priority Tasks</span></p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1 flex items-center gap-1">
          <nav className="flex items-center gap-1 px-1">
            <Button variant="ghost" className="rounded-full h-8 px-4 text-xs font-bold bg-white/10 text-white">Overview</Button>
            <Button variant="ghost" className="rounded-full h-8 px-4 text-xs font-bold text-white/60 hover:text-white">Analytics</Button>
            <Button variant="ghost" className="rounded-full h-8 px-4 text-xs font-bold text-white/60 hover:text-white">Reports</Button>
          </nav>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 border border-white/20 shadow-lg" />
        </div>
      </header>

      {/* Hero Section: Featured Project */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-panel-premium rounded-3xl p-8 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-50 group-hover:opacity-100 transition-opacity">
            <Button variant="glass" className="rounded-full w-10 h-10 p-0 flex items-center justify-center border-white/10"><MoreHorizontal className="w-5 h-5" /></Button>
          </div>

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold uppercase tracking-widest mb-4 border border-rose-500/20">
                <Zap className="w-3 h-3 fill-rose-300" /> Top Priority
              </span>
              <h2 className="text-4xl font-bold text-white mb-2 leading-tight">Buya Ekhaya <br /><span className="text-white/40 font-normal">EP Rollout</span></h2>
              <p className="text-white/60 max-w-md">Phase 2 marketing campaign is active. Music video draft v2 pending approval.</p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Button variant="primary" className="rounded-full px-6 h-12 text-sm shadow-lg shadow-rose-500/20">Manage Campaign</Button>
              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-neutral-800" />)}
                <div className="w-10 h-10 rounded-full border-2 border-black bg-neutral-700 flex items-center justify-center text-xs font-bold text-white">+2</div>
              </div>
            </div>
          </div>

          {/* Background Art */}
          <div className="absolute right-[-50px] bottom-[-50px] w-64 h-64 bg-gradient-to-br from-rose-500 to-purple-600 rounded-full blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
        </motion.div>

        {/* Quick Stats Column */}
        <div className="space-y-6">
          <StatCard title="Total Artists" value={stats.artists} icon={Users} color="text-blue-400" bg="bg-blue-500/10" />
          <StatCard title="Active Projects" value={stats.activeProjects} icon={FolderOpen} color="text-amber-400" bg="bg-amber-500/10" />
          <StatCard title="Upcoming Events" value={stats.upcomingEvents} icon={Calendar} color="text-rose-400" bg="bg-rose-500/10" />
        </div>
      </section>

      {/* Middle Section: Horizontal Scroll Artists + Tasks */}
      <h3 className="text-lg font-bold text-white mt-8 mb-4 flex items-center gap-2">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Suggested Actions
      </h3>

      <div className="flex overflow-x-auto pb-6 gap-6 scrollbar-hide -mx-8 px-8">
        <ActionCard
          title="Sign New Talent"
          desc="Review pending submissions"
          icon={<Users className="w-6 h-6 text-white" />}
          gradient="from-blue-600 to-blue-400"
          href="/suite/artists"
        />
        <ActionCard
          title="Create Release"
          desc="Start a new single/EP campaign"
          icon={<Music className="w-6 h-6 text-white" />}
          gradient="from-rose-600 to-rose-400"
          href="/suite/projects"
        />
        <ActionCard
          title="AI Strategy"
          desc="Generate a marketing plan"
          icon={<Zap className="w-6 h-6 text-white" />}
          gradient="from-purple-600 to-purple-400"
          href="/suite/ai"
        />
        <ActionCard
          title="Media Vault"
          desc="Upload masters & stems"
          icon={<FolderOpen className="w-6 h-6 text-white" />}
          gradient="from-amber-600 to-amber-400"
          href="/suite/media"
        />
      </div>

    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-panel-premium rounded-2xl p-5 flex items-center gap-4 h-[calc(33.33%-16px/3)]" // roughly 1/3 height
    >
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-white/40 text-xs uppercase font-bold tracking-wider">{title}</p>
        <div className="flex items-baseline gap-2">
          <h4 className="text-2xl font-bold text-white">{value}</h4>
          <span className="text-green-400 text-xs font-medium flex items-center"><TrendingUp className="w-3 h-3 mr-0.5" /> +12%</span>
        </div>
      </div>
    </motion.div>
  )
}

function ActionCard({ title, desc, icon, gradient, href }: any) {
  return (
    <Link href={href} className="min-w-[280px]">
      <motion.div
        whileHover={{ y: -5 }}
        className={`h-48 rounded-3xl p-6 relative overflow-hidden group bg-gradient-to-br ${gradient}`}
      >
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-500">
          <div className="w-16 h-16 rounded-full bg-white/20 blur-xl" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            {icon}
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-1">{title}</h4>
            <p className="text-white/80 text-sm">{desc}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
