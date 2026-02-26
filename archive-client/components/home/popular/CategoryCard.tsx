"use client";

import { Clock, FileText, Server, Users } from "lucide-react";
import type { ApiCategory } from "@/types/blog.type";
import { getCategoryIcon } from "./data";

interface CategoryCardProps {
    category: ApiCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
    const IconComponent = getCategoryIcon(category.slug);

    return (
        <div className="p-2 rounded-md bg-card/50 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
                {/* Left: Icon + Title */}
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-foreground">
                            {category.label}
                        </span>
                        {category.description && (
                            <span className="text-xs text-muted-foreground line-clamp-1 font-mono">
                                {category.description}
                            </span>
                        )}
                    </div>
                </div>

                {/* Right: Stats Row */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {Math.floor(Math.random() * 10000)}
                    </span>
                    <span className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5 text-primary" />
                        {Math.floor(Math.random() * 500)}
                    </span>
                    <span className="flex items-center gap-1">
                        <Server className="h-3.5 w-3.5 text-primary" />
                        {Math.floor(Math.random() * 20)}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-primary" />
                        {Math.floor(Math.random() * 5000)}
                    </span>
                </div>
            </div>
        </div>
    );
}
