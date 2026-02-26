"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
    isEditing: boolean;
    onEditClick: () => void;
}

export function ProfileHeader({ isEditing, onEditClick }: ProfileHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-4xl font-bold tracking-tight">
                    My <span className="text-primary italic">Profile</span>
                </h1>
                <p className="text-sm text-muted-foreground font-mono mt-2">
                    Manage your account settings
                </p>
            </div>
            {!isEditing && (
                <Button
                    onClick={onEditClick}
                    className="rounded-xl shadow-lg shadow-primary/20"
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                </Button>
            )}
        </div>
    );
}
