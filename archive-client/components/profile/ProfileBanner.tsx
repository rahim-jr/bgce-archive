"use client";

import { Shield, Activity } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface User {
    username: string;
    email: string;
    role: string;
    status: string;
}

interface ProfileBannerProps {
    user: User;
}

export function ProfileBanner({ user }: ProfileBannerProps) {
    return (
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 border-b border-gray-200 dark:border-white/10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                    <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold">
                        {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left flex-1">
                    <h2 className="text-3xl font-bold tracking-tight">
                        {user.username}
                    </h2>
                    <p className="text-muted-foreground font-mono mt-1">
                        {user.email}
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono">
                            <Shield className="h-3.5 w-3.5 text-primary" />
                            {user.role}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-mono text-green-600 dark:text-green-400">
                            <Activity className="h-3.5 w-3.5" />
                            {user.status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
