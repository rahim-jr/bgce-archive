"use client";

import { FileText, MessageSquare, Activity } from "lucide-react";

export function ProfileStats() {
    const stats = [
        { label: "Posts", value: 0, icon: FileText },
        { label: "Comments", value: 0, icon: MessageSquare },
        { label: "Reputation", value: 0, icon: Activity },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
                Activity <span className="text-primary italic">Stats</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="p-6 rounded-md bg-card/50 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                    <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
