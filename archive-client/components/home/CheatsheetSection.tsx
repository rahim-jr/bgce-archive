"use client";

import Link from "next/link";
import { ArrowRight, FileText, Download, Eye, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StaticWatermark } from "@/components/ui/StaticWatermark";

export function CheatsheetSection() {
    const cheatsheets = [
        {
            id: 1,
            title: "Go Programming Essentials",
            description: "Quick reference for Go syntax, data structures, and common patterns",
            category: "Programming",
            downloads: 12500,
            views: 45000,
            rating: 4.8,
            isPopular: true,
        },
        {
            id: 2,
            title: "Docker Quick Reference",
            description: "Docker commands, Dockerfile best practices, and container management",
            category: "DevOps",
            downloads: 15200,
            views: 52000,
            rating: 4.9,
            isPopular: true,
        },
        {
            id: 3,
            title: "Kubernetes Commands",
            description: "Essential kubectl commands and Kubernetes resource management",
            category: "DevOps",
            downloads: 8900,
            views: 32000,
            rating: 4.7,
            isPopular: true,
        },
        {
            id: 4,
            title: "Git Commands Cheatsheet",
            description: "Git workflow, branching strategies, and essential commands",
            category: "Tools",
            downloads: 18700,
            views: 67000,
            rating: 4.9,
            isPopular: true,
        },
    ];

    return (
        <section className="py-10 lg:py-12 relative overflow-hidden bg-gradient-to-b from-muted/20 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-3">
                    <div className="space-y-1">
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                            Quick Reference Cheatsheets
                        </h2>
                        <p className="text-sm text-muted-foreground max-w-2xl">
                            Essential guides and references for developers
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="hidden sm:flex hover:bg-accent transition-all duration-200"
                    >
                        <Link href="/resources/cheatsheet">
                            View All
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>

                {/* Cheatsheets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {cheatsheets.map((sheet) => (
                        <Link
                            key={sheet.id}
                            href={`/resources/cheatsheet/${sheet.id}`}
                            className="group relative bg-gradient-to-br from-card to-card/80 dark:from-card dark:to-card/50 border-2 border-border rounded-lg overflow-hidden
                                hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 
                                hover:border-primary/50 hover:ring-2 hover:ring-primary/20
                                transition-all duration-300 ease-out backdrop-blur-sm
                                focus:outline-none focus:ring-2 focus:ring-primary/50"
                        >
                            {/* Icon Header */}
                            <div className="relative aspect-[5/2] bg-gradient-to-br from-primary/25 via-primary/15 to-primary/5 dark:from-primary/35 dark:via-primary/20 dark:to-primary/5 flex items-center justify-center border-b border-border group-hover:border-primary/40 transition-colors">
                                <FileText className="h-8 w-8 text-primary" />

                                {/* Popular Badge */}
                                {sheet.isPopular && (
                                    <div className="absolute top-1.5 left-1.5">
                                        <span className="px-1.5 py-1 rounded bg-primary/90 dark:bg-primary/80 text-white text-[8px] font-black flex items-center gap-0.5 shadow-sm backdrop-blur-sm leading-none">
                                            <Sparkles className="h-2 w-2" />
                                            POPULAR
                                        </span>
                                    </div>
                                )}

                                {/* Rating Badge */}
                                <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-1.5 py-1 rounded bg-card/90 dark:bg-card/80 border border-border/50 dark:border-input/50 shadow-sm backdrop-blur-sm">
                                    <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-[8px] font-black text-foreground leading-none">{sheet.rating}</span>
                                </div>
                            </div>

                            <div className="p-4 relative">
                                <StaticWatermark />

                                {/* Category Badge */}
                                <div className="mb-2">
                                    <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-[9px] font-bold uppercase tracking-wide">
                                        {sheet.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem] leading-tight">
                                    {sheet.title}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                                    {sheet.description}
                                </p>

                                {/* Stats */}
                                <div className="flex items-center gap-3 text-[10px] text-muted-foreground pt-3 border-t border-border">
                                    <div className="flex items-center gap-1 group/stat hover:text-primary transition-colors">
                                        <Download className="h-3 w-3" />
                                        <span className="font-medium">{(sheet.downloads / 1000).toFixed(1)}K</span>
                                    </div>
                                    <div className="flex items-center gap-1 group/stat hover:text-primary transition-colors">
                                        <Eye className="h-3 w-3" />
                                        <span className="font-medium">{(sheet.views / 1000).toFixed(1)}K</span>
                                    </div>
                                </div>

                                {/* Hover Arrow */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowRight className="h-3.5 w-3.5 text-primary" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-6 sm:hidden">
                    <Button variant="outline" asChild className="w-full h-10 rounded-lg border-2">
                        <Link href="/resources/cheatsheet">
                            View All Cheatsheets
                            <ArrowRight className="ml-2 h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
