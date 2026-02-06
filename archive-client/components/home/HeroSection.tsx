"use client";

import React from "react";
import { BookOpen, Users, ShieldCheck, Layers, Code2 } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Find answers",
    description: "Get unblocked with peer, BGCE, and expert advice",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Access Knowledge Center",
    description: "Troubleshoot technical and account issues",
  },
  {
    icon: <Layers className="w-6 h-6 text-primary" />,
    title: "Reuse best practices",
    description: "Remove roadblocks with articles",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Join a group",
    description: "Connect with BGCE partners and employees",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-32 mt-5">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Subtle Fog */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-background via-background/90 to-transparent z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Tech Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-8">
          <Code2 className="h-4 w-4" />
          Knowledge Vault / BGCE Protocol
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          Welcome to{" "}
          <span className="text-primary italic">BGCE Archive</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed border-l-2 border-primary/20 pl-6 inline-block text-left">
          A community-driven archive to collect, organize, and preserve
          knowledge, tools, and stories from the Go ecosystem. Whether
          you&apos;re a beginner, job seeker, seasoned contributor, or mentor —
          this is where we grow together.
        </p>

        {/* Feature Grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-xl bg-muted/80 border border-white/10 text-center shadow-lg">
            <div className="text-2xl font-bold font-mono">12k+</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Members</div>
          </div>
          <div className="p-4 rounded-xl bg-muted/80 border border-white/10 text-center shadow-lg">
            <div className="text-2xl font-bold font-mono">840+</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Articles</div>
          </div>
          <div className="p-4 rounded-xl bg-muted/80 border border-white/10 text-center shadow-lg">
            <div className="text-2xl font-bold font-mono">2026</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Est. Year</div>
          </div>
        </div>
      </div>
    </section>
  );
}
