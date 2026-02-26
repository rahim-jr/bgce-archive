"use client";

import { useState } from "react";
import { Plus, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommunityHeader } from "./CommunityHeader";
import { DesktopSidebar } from "./DesktopSidebar";
import { EventsSidebar } from "./EventsSidebar";
import { MobileFilterDrawer } from "./MobileFilterDrawer";
import { DiscussionCard } from "./DiscussionCard";
import { discussions } from "./mockData";

export default function CommunityWrapperOptimized() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState("recent");

    const activeFiltersCount = [selectedCategory, searchQuery].filter(Boolean).length;

    const handleClearFilters = () => {
        setSelectedCategory(null);
        setSearchQuery("");
    };

    return (
        <div className="relative min-h-screen">
            <CommunityHeader />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-4 flex gap-2">
                    <Button
                        onClick={() => setShowMobileFilters(true)}
                        variant="outline"
                        className="flex-1 h-10 border-2 dark:border-input dark:hover:border-[oklch(0.75_0.22_260)] dark:hover:bg-[oklch(0.28_0.06_260)] dark:hover:text-[oklch(0.85_0.28_260)] font-bold"
                    >
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-white text-xs">
                                {activeFiltersCount}
                            </span>
                        )}
                    </Button>
                    <Button className="h-10 px-4 font-bold bg-gradient-to-r from-[oklch(0.4_0.14_260)] to-[oklch(0.35_0.12_260)] hover:from-[oklch(0.45_0.16_260)] hover:to-[oklch(0.4_0.14_260)] dark:from-[oklch(0.65_0.18_260)] dark:to-[oklch(0.6_0.16_260)] dark:hover:from-[oklch(0.75_0.22_260)] dark:hover:to-[oklch(0.7_0.2_260)] text-white dark:text-white">
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {/* Desktop New Discussion Button */}
                <div className="hidden lg:flex justify-end mb-4">
                    <Button className="h-10 px-6 font-bold bg-gradient-to-r from-[oklch(0.4_0.14_260)] to-[oklch(0.35_0.12_260)] hover:from-[oklch(0.45_0.16_260)] hover:to-[oklch(0.4_0.14_260)] dark:from-[oklch(0.65_0.18_260)] dark:to-[oklch(0.6_0.16_260)] dark:hover:from-[oklch(0.75_0.22_260)] dark:hover:to-[oklch(0.7_0.2_260)] text-white dark:text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        New Discussion
                    </Button>
                </div>

                {/* Mobile Filter Drawer */}
                <MobileFilterDrawer
                    isOpen={showMobileFilters}
                    searchQuery={searchQuery}
                    selectedCategory={selectedCategory}
                    activeFiltersCount={activeFiltersCount}
                    onClose={() => setShowMobileFilters(false)}
                    onSearchChange={setSearchQuery}
                    onCategoryChange={setSelectedCategory}
                    onClearFilters={handleClearFilters}
                />

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Desktop Filters Sidebar */}
                    <DesktopSidebar
                        searchQuery={searchQuery}
                        sortBy={sortBy}
                        selectedCategory={selectedCategory}
                        activeFiltersCount={activeFiltersCount}
                        onSearchChange={setSearchQuery}
                        onSortChange={setSortBy}
                        onCategoryChange={setSelectedCategory}
                        onClearFilters={handleClearFilters}
                    />

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Results Header */}
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-xs font-bold text-foreground">
                                {discussions.length} Discussion{discussions.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        {/* Discussions Grid */}
                        <div className="grid grid-cols-1 gap-3">
                            {discussions.map((discussion) => (
                                <DiscussionCard key={discussion.id} discussion={discussion} />
                            ))}
                        </div>

                        {/* Load More */}
                        <Button
                            variant="outline"
                            className="w-full mt-4 h-10 border-2 border-dashed hover:border-primary/50 dark:hover:border-[oklch(0.75_0.22_260)] text-muted-foreground hover:text-primary dark:hover:text-[oklch(0.85_0.28_260)] dark:hover:bg-[oklch(0.28_0.06_260)] font-bold"
                        >
                            Load More Discussions
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </main>

                    {/* Right Sidebar - Desktop Only */}
                    <EventsSidebar />
                </div>
            </div>
        </div>
    );
}
