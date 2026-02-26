"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, BookOpen } from "lucide-react";
import { Portal } from "@/components/ui/Portal";
import { DropdownPosition } from "./types";
import { exploreItems } from "./navData";

interface ExploreDropdownProps {
    isOpen: boolean;
    position: DropdownPosition;
    onClose: () => void;
    dropdownRef: React.RefObject<HTMLDivElement>;
}

export function ExploreDropdown({ isOpen, position, onClose, dropdownRef }: ExploreDropdownProps) {
    const [selectedSection, setSelectedSection] = useState<string | null>(null);

    if (!isOpen) return null;

    return (
        <Portal>
            <div
                ref={dropdownRef}
                data-nav-dropdown="true"
                className="fixed z-[11000] animate-in fade-in slide-in-from-top-2 duration-200"
                style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                    width: '680px'
                }}
            >
                <div className="bg-gradient-to-br from-card to-card/95 dark:from-card dark:to-card/90 border border-border rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm">
                    <div className="flex">
                        {/* Left Side - Main Sections */}
                        <div className="flex-1 p-3 border-r border-border">
                            <div className="space-y-0.5">
                                {Object.entries(exploreItems).map(([key, item]) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={key} onMouseEnter={() => setSelectedSection(key)}>
                                            <Link
                                                href={item.href}
                                                onClick={() => {
                                                    onClose();
                                                    setSelectedSection(null);
                                                }}
                                                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors duration-150 group"
                                            >
                                                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-150">
                                                    <Icon className="h-4 w-4 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors duration-150 flex items-center justify-between">
                                                        {item.label}
                                                        <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                                                    </div>
                                                    <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                                                        {item.desc}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Right Side - Sub Items */}
                        <div
                            className="w-64 p-3 bg-muted/20"
                            onMouseLeave={() => setSelectedSection(null)}
                        >
                            {selectedSection && exploreItems[selectedSection] ? (
                                <div className="space-y-0.5">
                                    <div className="px-2 py-1.5 mb-1">
                                        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                                            {selectedSection === 'courses' && 'Course Types'}
                                            {selectedSection === 'practice' && 'Practice Options'}
                                            {selectedSection === 'getHired' && 'Career Resources'}
                                        </h3>
                                    </div>
                                    {exploreItems[selectedSection].subItems.map((subItem) => {
                                        const SubIcon = subItem.icon;
                                        return (
                                            <Link
                                                key={subItem.href}
                                                href={subItem.href}
                                                onClick={() => {
                                                    onClose();
                                                    setSelectedSection(null);
                                                }}
                                                className={
                                                    SubIcon
                                                        ? "flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent transition-colors duration-150 group"
                                                        : "block px-2 py-1.5 rounded-md text-xs font-medium text-foreground hover:bg-accent hover:text-primary transition-colors duration-150"
                                                }
                                            >
                                                {SubIcon && (
                                                    <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-150">
                                                        <SubIcon className="h-3 w-3 text-primary" />
                                                    </div>
                                                )}
                                                <div className={SubIcon ? "flex-1 min-w-0" : ""}>
                                                    <div className={SubIcon ? "text-xs font-semibold text-foreground group-hover:text-primary transition-colors duration-150" : ""}>
                                                        {subItem.label}
                                                    </div>
                                                    {subItem.desc && (
                                                        <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                                                            {subItem.desc}
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center text-muted-foreground">
                                        <BookOpen className="h-6 w-6 mx-auto mb-1.5 opacity-40" />
                                        <p className="text-[10px]">Hover to see options</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
