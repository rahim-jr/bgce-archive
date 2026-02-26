"use client";

import { useState, useMemo } from "react";
import { BookOpen } from "lucide-react";
import { MobileFilterButton } from "@/components/shared/filters/MobileFilterButton";
import { SearchInput } from "@/components/shared/filters/SearchInput";
import { FilterChips } from "@/components/shared/filters/FilterChips";
import { CourseCard } from "./CourseCard";
import { CourseMobileDrawer } from "./CourseMobileDrawer";
import { courses, levels, topics } from "./data";

export default function CoursesPage() {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [showFreeOnly, setShowFreeOnly] = useState(false);
    const [showNewOnly, setShowNewOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            if (selectedLevel && course.level !== selectedLevel) return false;
            if (selectedTopic && course.topic !== selectedTopic) return false;
            if (showFreeOnly && course.price !== "Free") return false;
            if (showNewOnly && !course.trending) return false;
            if (
                searchQuery &&
                !course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !course.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
                return false;
            return true;
        });
    }, [selectedLevel, selectedTopic, showFreeOnly, showNewOnly, searchQuery]);

    const activeFiltersCount = [
        selectedLevel,
        selectedTopic,
        showFreeOnly,
        showNewOnly,
        searchQuery,
    ].filter(Boolean).length;

    const clearFilters = () => {
        setSelectedLevel(null);
        setSelectedTopic(null);
        setShowFreeOnly(false);
        setShowNewOnly(false);
        setSearchQuery("");
    };

    return (
        <div className="min-h-screen">
            {/* Compact Header */}
            <section className="py-4 border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <div className="p-1.5 rounded-lg bg-primary/10 dark:bg-primary/20">
                            <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <h1 className="text-xl font-bold text-foreground">Professional Courses</h1>

                        {/* Not Operational Badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                                Not Operational
                            </span>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Expert-led courses for modern developers</p>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <MobileFilterButton
                    activeCount={activeFiltersCount}
                    onClick={() => setShowMobileFilters(true)}
                />

                <CourseMobileDrawer
                    isOpen={showMobileFilters}
                    onClose={() => setShowMobileFilters(false)}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedLevel={selectedLevel}
                    onLevelChange={setSelectedLevel}
                    selectedTopic={selectedTopic}
                    onTopicChange={setSelectedTopic}
                    showFreeOnly={showFreeOnly}
                    onFreeOnlyChange={setShowFreeOnly}
                    showNewOnly={showNewOnly}
                    onNewOnlyChange={setShowNewOnly}
                    activeFiltersCount={activeFiltersCount}
                    onClearFilters={clearFilters}
                />

                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Desktop Filters Sidebar */}
                    <aside className="hidden lg:block lg:w-56 flex-shrink-0">
                        <div className="sticky top-20 space-y-3">
                            <div>
                                <label className="text-[10px] font-bold text-foreground mb-1 block uppercase tracking-wide">
                                    Search
                                </label>
                                <SearchInput
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Search courses..."
                                    size="sm"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-foreground mb-1 block uppercase tracking-wide">
                                    Level
                                </label>
                                <FilterChips
                                    options={levels}
                                    selected={selectedLevel}
                                    onChange={setSelectedLevel}
                                    size="sm"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-foreground mb-1 block uppercase tracking-wide">
                                    Topic
                                </label>
                                <FilterChips
                                    options={topics}
                                    selected={selectedTopic}
                                    onChange={setSelectedTopic}
                                    size="sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showFreeOnly}
                                        onChange={(e) => setShowFreeOnly(e.target.checked)}
                                        className="rounded border-border"
                                    />
                                    <span className="text-xs font-medium">Free only</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showNewOnly}
                                        onChange={(e) => setShowNewOnly(e.target.checked)}
                                        className="rounded border-border"
                                    />
                                    <span className="text-xs font-medium">Trending only</span>
                                </label>
                            </div>

                            {activeFiltersCount > 0 && (
                                <button
                                    onClick={clearFilters}
                                    className="w-full text-xs font-bold text-primary hover:underline"
                                >
                                    Clear all filters ({activeFiltersCount})
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="mb-3">
                            <p className="text-xs font-bold text-foreground">
                                {filteredCourses.length} Course{filteredCourses.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {filteredCourses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>

                        {filteredCourses.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No courses found matching your filters.</p>
                                <button
                                    onClick={clearFilters}
                                    className="mt-4 text-sm font-bold text-primary hover:underline"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
