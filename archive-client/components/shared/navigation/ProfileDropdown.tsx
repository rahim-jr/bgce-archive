"use client";

import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Portal } from "@/components/ui/Portal";
import { DropdownPosition } from "./types";

interface User {
    username: string;
    email: string;
}

interface ProfileDropdownProps {
    isOpen: boolean;
    user: User | null;
    position: DropdownPosition;
    onClose: () => void;
    onLogout: () => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export function ProfileDropdown({
    isOpen,
    user,
    position,
    onClose,
    onLogout,
    dropdownRef
}: ProfileDropdownProps) {
    if (!isOpen || !user) return null;

    return (
        <Portal>
            <div
                ref={dropdownRef}
                data-nav-dropdown="true"
                className="fixed z-[11000] animate-in fade-in slide-in-from-top-2 duration-200"
                style={{
                    top: `${position.top}px`,
                    right: `${position.right}px`,
                    width: '220px'
                }}
            >
                <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
                    <div className="p-2 border-b bg-muted/20">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                                    {user.username.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{user.username}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-1.5">
                        <Link
                            href="/profile"
                            onClick={onClose}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors duration-150 group"
                        >
                            <User className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-150" />
                            <span className="text-xs font-medium">Profile</span>
                        </Link>
                        <Link
                            href="/settings"
                            onClick={onClose}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors duration-150 group"
                        >
                            <Settings className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-150" />
                            <span className="text-xs font-medium">Settings</span>
                        </Link>
                    </div>
                    <div className="p-1.5 border-t">
                        <button
                            onClick={() => {
                                onClose();
                                onLogout();
                            }}
                            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors duration-150"
                        >
                            <LogOut className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
