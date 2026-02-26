"use client";

import { User, Mail, Calendar } from "lucide-react";

interface User {
    username: string;
    full_name?: string;
    email: string;
    created_at: string;
}

interface ProfileInfoDisplayProps {
    user: User;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export function ProfileInfoDisplay({ user }: ProfileInfoDisplayProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-md bg-card/30 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                            Username
                        </p>
                        <p className="font-bold">{user.username}</p>
                    </div>
                </div>
            </div>

            {user.full_name && (
                <div className="p-4 rounded-md bg-card/30 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                            <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                                Full Name
                            </p>
                            <p className="font-bold">{user.full_name}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="p-4 rounded-md bg-card/30 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                        <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                            Email
                        </p>
                        <p className="font-bold">{user.email}</p>
                    </div>
                </div>
            </div>

            <div className="p-4 rounded-md bg-card/30 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:border-primary/30 transition-all">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                        <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                            Member Since
                        </p>
                        <p className="font-bold">{formatDate(user.created_at)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
