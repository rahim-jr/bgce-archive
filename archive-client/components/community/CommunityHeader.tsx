"use client";

import { MessageSquare } from "lucide-react";
import { CommunityBreadcrumb } from "./CommunityBreadcrumb";

export function CommunityHeader() {
    return (
        <section className="py-4 border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-3">
                    <CommunityBreadcrumb />
                </div>

                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                    <div className="p-1.5 rounded-lg bg-primary/10 dark:bg-primary/20">
                        <MessageSquare className="h-4 w-4 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold text-foreground">Community Hub</h1>
                </div>
                <p className="text-xs text-muted-foreground">Connect, share knowledge, and grow together</p>
            </div>
        </section>
    );
}
