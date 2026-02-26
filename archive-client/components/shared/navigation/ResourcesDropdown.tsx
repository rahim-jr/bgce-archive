"use client";

import Link from "next/link";
import { Portal } from "@/components/ui/Portal";
import { DropdownPosition } from "./types";
import { resourceItems } from "./navData";

interface ResourcesDropdownProps {
    isOpen: boolean;
    position: DropdownPosition;
    onClose: () => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export function ResourcesDropdown({ isOpen, position, onClose, dropdownRef }: ResourcesDropdownProps) {
    if (!isOpen) return null;

    return (
        <Portal>
            <div
                ref={dropdownRef}
                data-nav-dropdown="true"
                className="fixed z-[11000] animate-in fade-in slide-in-from-top-2 duration-200"
                style={{
                    top: `${position.top}px`,
                    right: `${position.right}px`,
                    width: '200px'
                }}
            >
                <div className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden">
                    <div className="p-1.5">
                        {resourceItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors duration-150 group"
                                >
                                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-150" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Portal>
    );
}
