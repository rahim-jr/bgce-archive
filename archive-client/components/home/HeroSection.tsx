import React from "react";
import { Card, CardContent } from "@/components/ui/card";

import { BookOpen, Users, ShieldCheck, Layers } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-sky-600" />,
    title: "Find answers",
    description: "Get unblocked with peer, BGCE, and expert advice",
  },
  {
    icon: <BookOpen className="w-10 h-10 text-sky-600" />,
    title: "Access Knowledge Center",
    description: "Troubleshoot technical and account issues",
  },
  {
    icon: <Layers className="w-10 h-10 text-sky-600" />,
    title: "Reuse best practices",
    description: "Remove roadblocks with articles",
  },
  {
    icon: <Users className="w-10 h-10 text-sky-600" />,
    title: "Join a group",
    description: "Connect with BGCE partners and employees",
  },
];

export default function HeroSection() {
  return (
    <section
      className="
    relative overflow-hidden 
    bg-gradient-to-b from-sky-50 to-white 
    dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,100,225,0.15),transparent_70%)]
    dark:from-gray-900 dark:to-gray-950
    py-20
  "
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-blue-950 to-blue-900 dark:from-blue-400 dark:to-sky-700 bg-clip-text text-transparent">
            BGCE Archive
          </span>
        </h1>
        <p className="mt-3 text-[18px] text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          A community-driven archive to collect, organize, and preserve
          knowledge, tools, and stories from the Go ecosystem. Whether
          you&apos;re a beginner, job seeker, seasoned contributor, or mentor —
          this is where we grow together.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <Card
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-shadow duration-200 dark:border-0"
            >
              <CardContent className="flex flex-col items-center text-center gap-2 px-0">
                {f.icon}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {f.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
