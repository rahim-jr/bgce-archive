"use client";

import { MessageCircle, Eye } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Discussion } from "./types";

interface DiscussionCardProps {
    discussion: Discussion;
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
    return (
        <div className="group relative bg-gradient-to-br from-card via-card/95 to-card/80 dark:from-card dark:via-card/95 dark:to-card/50 border border-border dark:border-input backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-[0_4px_20px_oklch(0.65_0.18_260/0.3)] hover:border-primary/50 dark:hover:border-[oklch(0.75_0.22_260)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer p-3 sm:p-4">
            <div className="flex gap-3">
                {/* Stats Column - Desktop */}
                <div className="hidden sm:flex flex-col items-center gap-2 min-w-[60px]">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-accent/50 dark:bg-accent/30 border border-border/50 dark:border-input/30 w-full">
                        <MessageCircle className="h-3 w-3 text-primary mb-0.5" />
                        <span className="text-sm font-black text-foreground">{discussion.replies}</span>
                        <span className="text-[8px] text-muted-foreground uppercase">Replies</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-accent/50 dark:bg-accent/30 border border-border/50 dark:border-input/30 w-full">
                        <Eye className="h-3 w-3 text-primary mb-0.5" />
                        <span className="text-[10px] font-black text-foreground">{(discussion.views / 1000).toFixed(1)}K</span>
                        <span className="text-[8px] text-muted-foreground uppercase">Views</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-2">
                        <Badge
                            variant="outline"
                            className="border-primary/20 text-primary bg-primary/10 dark:bg-primary/20 text-[9px] font-bold uppercase tracking-wider"
                        >
                            {discussion.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">• {discussion.lastActive}</span>
                        {/* Mobile Stats */}
                        <div className="sm:hidden ml-auto flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-0.5">
                                <MessageCircle className="h-2.5 w-2.5" />
                                {discussion.replies}
                            </span>
                            <span className="flex items-center gap-0.5">
                                <Eye className="h-2.5 w-2.5" />
                                {(discussion.views / 1000).toFixed(1)}K
                            </span>
                        </div>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-foreground mb-2 group-hover:text-primary dark:group-hover:text-[oklch(0.85_0.28_260)] dark:group-hover:drop-shadow-[0_0_8px_oklch(0.65_0.18_260/0.3)] transition-all line-clamp-2 leading-tight">
                        {discussion.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                        {discussion.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[9px] font-mono font-bold text-muted-foreground bg-muted/50 dark:bg-muted/30 px-1.5 py-0.5 rounded"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5 border border-border">
                            <AvatarFallback className={`${discussion.author.color} text-white text-[8px]`}>
                                {discussion.author.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] font-semibold text-foreground">{discussion.author.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
