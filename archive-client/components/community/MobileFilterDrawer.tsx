"use client";

import { useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Portal } from "@/components/ui/Portal";
import { categories } from "./mockData";

interface MobileFilterDrawerProps {
    isOpen: boolean;
    searchQuery: string;
    selectedCategory: string | null;
    activeFiltersCount: number;
    onClose: () => void;
    onSearchChange: (value: string) => void;
    onCategoryChange: (category: string | null) => void;
    onClearFilters: () => void;
}

export function MobileFilterDrawer({
    isOpen,
    searchQuery,
    selectedCategory,
    activeFiltersCount,
    onClose,
    onSearchChange,
    onCategoryChange,
    onClearFilters,
}: MobileFilterDrawerProps) {
    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
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
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Drawer */}
                <div className="absolute inset-x-0 bottom-0 bg-card border-t-2 border-border dark:border-input rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto">
                    {/* Drawer Header */}
                    <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border dark:border-input p-4 flex items-center justify-between z-10">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-bold text-foreground">Filters</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-accent dark:hover:bg-accent/50 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="p-4 space-y-4">
                        {/* Search */}
                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                                <Search className="h-3.5 w-3.5" />
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search discussions..."
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="pl-10 h-11 text-base border-2 dark:bg-input/30 dark:border-input dark:hover:border-primary/50 dark:focus:border-primary transition-colors"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
                                        className={`px-3 py-2 rounded-full text-xs font-bold transition-all border-2 ${selectedCategory === category
                                                ? "bg-primary text-white dark:text-white border-primary shadow-md dark:shadow-[0_0_8px_oklch(0.65_0.18_260/0.3)]"
                                                : "bg-card/50 dark:bg-card/30 border-border dark:border-input hover:border-primary/50 dark:hover:border-[oklch(0.75_0.22_260)] hover:bg-accent dark:hover:bg-[oklch(0.28_0.06_260)] text-foreground dark:hover:text-[oklch(0.85_0.28_260)]"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={onClearFilters}
                                    className="flex-1 h-11 text-sm font-bold border-2 dark:border-input dark:hover:border-[oklch(0.75_0.22_260)] dark:hover:bg-[oklch(0.28_0.06_260)] dark:hover:text-[oklch(0.85_0.28_260)]"
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Clear All
                                </Button>
                            )}
                            <Button
                                onClick={onClose}
                                className="flex-1 h-11 text-sm font-bold bg-gradient-to-r from-[oklch(0.4_0.14_260)] to-[oklch(0.35_0.12_260)] hover:from-[oklch(0.45_0.16_260)] hover:to-[oklch(0.4_0.14_260)] dark:from-[oklch(0.65_0.18_260)] dark:to-[oklch(0.6_0.16_260)] dark:hover:from-[oklch(0.75_0.22_260)] dark:hover:to-[oklch(0.7_0.2_260)] text-white dark:text-white"
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
