"use client";

import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
    icon: LucideIcon;
    title: string;
    description: string;
    badge?: {
        text: string;
        variant: "operational" | "not-operational" | "beta";
    };
    breadcrumb?: React.ReactNode;
}

export function PageHeader({ icon: Icon, title, description, badge, breadcrumb }: PageHeaderProps) {
    const badgeStyles = {
        operational: "from-green-500/10 to-emerald-500/10 border-green-500/30 text-green-600 dark:text-green-400 bg-green-400",
        "not-operational": "from-red-500/10 to-rose-500/10 border-red-500/30 text-red-600 dark:text-red-400 bg-red-500",
        beta: "from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500"
    };

    return (
        <section className="py-4 border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {breadcrumb && <div className="mb-3">{breadcrumb}</div>}

                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <div className="p-1.5 rounded-lg bg-primary/10 dark:bg-primary/20">
                        <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold text-foreground">{title}</h1>

                    {badge && (
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${badgeStyles[badge.variant]} border backdrop-blur-sm`}>
                            <span className="relative flex h-2 w-2">
                                <span className={`absolute inline-flex h-full w-full rounded-full ${badgeStyles[badge.variant].split(' ').pop()} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${badgeStyles[badge.variant].split(' ').pop()}`}></span>
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wide">
                                {badge.text}
                            </span>
                        </div>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </section>
    );
}
