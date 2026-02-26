"use client";

import { useEffect } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Portal } from "@/components/ui/Portal";
import { SearchInput } from "@/components/shared/filters/SearchInput";
import { FilterChips } from "@/components/shared/filters/FilterChips";
import { levels, topics } from "./data";

interface CourseMobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedLevel: string | null;
    onLevelChange: (value: string | null) => void;
    selectedTopic: string | null;
    onTopicChange: (value: string | null) => void;
    showFreeOnly: boolean;
    onFreeOnlyChange: (value: boolean) => void;
    showNewOnly: boolean;
    onNewOnlyChange: (value: boolean) => void;
    activeFiltersCount: number;
    onClearFilters: () => void;
}

export function CourseMobileDrawer({
    isOpen,
    onClose,
    searchQuery,
    onSearchChange,
    selectedLevel,
    onLevelChange,
    selectedTopic,
    onTopicChange,
    showFreeOnly,
    onFreeOnlyChange,
    showNewOnly,
    onNewOnlyChange,
    activeFiltersCount,
    onClearFilters,
}: CourseMobileDrawerProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Portal>
            <div
                data-mobile-drawer="true"
                className="fixed inset-0 lg:hidden"
                style={{ zIndex: 2147483646 }}
            >
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />

                <div className="absolute inset-x-0 bottom-0 bg-card border-t-2 border-border dark:border-input rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto">
                    <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border dark:border-input p-4 flex items-center justify-between z-10">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-bold text-foreground">Filters & Search</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-accent dark:hover:bg-accent/50 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">
                                Search
                            </label>
                            <SearchInput
                                value={searchQuery}
                                onChange={onSearchChange}
                                placeholder="Search courses..."
                                size="lg"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">
                                Level
                            </label>
                            <FilterChips
                                options={levels}
                                selected={selectedLevel}
                                onChange={onLevelChange}
                                size="md"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">
                                Topic
                            </label>
                            <FilterChips
                                options={topics}
                                selected={selectedTopic}
                                onChange={onTopicChange}
                                size="md"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showFreeOnly}
                                    onChange={(e) => onFreeOnlyChange(e.target.checked)}
                                    className="rounded border-border"
                                />
                                <span className="text-sm font-medium">Free only</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showNewOnly}
                                    onChange={(e) => onNewOnlyChange(e.target.checked)}
                                    className="rounded border-border"
                                />
                                <span className="text-sm font-medium">Trending only</span>
                            </label>
                        </div>

                        <div className="flex gap-2 pt-2">
                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={onClearFilters}
                                    className="flex-1 h-11 text-sm font-bold border-2"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Clear All
                                </Button>
                            )}
                            <Button
                                onClick={onClose}
                                className="flex-1 h-11 text-sm font-bold bg-gradient-to-r from-primary to-primary/80 text-white"
                            >
                                Show Results
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
