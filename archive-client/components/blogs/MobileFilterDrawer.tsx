"use client";

import { Search, X, SlidersHorizontal, FolderTree, Clock, Eye, Flame, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Portal } from "@/components/ui/Portal";
import type { ApiCategory } from "@/types/blog.type";
import type { SortOption } from "./types";

interface MobileFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    categories: ApiCategory[];
    selectedCategory: number | null;
    onCategoryChange: (categoryId: number | null) => void;
    selectedSubcategory: number | null;
    onSubcategoryChange: (subcategoryId: number | null) => void;
    subcategories: ApiCategory[];
    expandedCategory: number | null;
    onToggleCategory: (categoryId: number) => void;
    sortBy: SortOption;
    onSortChange: (sort: SortOption) => void;
    showFeaturedOnly: boolean;
    onToggleFeatured: () => void;
    onClearFilters: () => void;
    activeFiltersCount: number;
    filteredBlogsCount: number;
}

const sortOptions = [
    { value: "new" as const, label: "Newest", icon: Clock },
    { value: "views" as const, label: "Most Viewed", icon: Eye },
    { value: "featured" as const, label: "Featured First", icon: Flame },
];

export function MobileFilterDrawer({
    isOpen,
    onClose,
    searchQuery,
    onSearchChange,
    categories,
    selectedCategory,
    onCategoryChange,
    selectedSubcategory,
    onSubcategoryChange,
    subcategories,
    expandedCategory,
    onToggleCategory,
    sortBy,
    onSortChange,
    showFeaturedOnly,
    onToggleFeatured,
    onClearFilters,
    activeFiltersCount,
    filteredBlogsCount,
}: MobileFilterDrawerProps) {
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
                <div className="absolute inset-x-0 bottom-0 bg-card border-t-2 border-border rounded-t-2xl shadow-2xl max-h-[80vh] overflow-y-auto">
                    <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between z-10">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-bold text-foreground">Filters & Search</h2>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-4 space-y-4">
                        {/* Search */}
                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                                <Search className="h-3.5 w-3.5" />
                                Search Blogs
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search blogs..."
                                    value={searchQuery}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    className="pl-10 h-11 text-base border-2"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 flex items-center gap-1.5 uppercase tracking-wide">
                                <FolderTree className="h-3.5 w-3.5" />
                                Category
                            </label>
                            <div className="space-y-2">
                                <button
                                    onClick={() => {
                                        onCategoryChange(null);
                                        onSubcategoryChange(null);
                                    }}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-all border-2 ${!selectedCategory
                                            ? "bg-primary text-white border-primary shadow-md"
                                            : "bg-card/50 border-border hover:border-primary/50 text-foreground"
                                        }`}
                                >
                                    All Categories
                                </button>
                                {categories.map((category) => (
                                    <div key={category.id}>
                                        <button
                                            onClick={() => onToggleCategory(category.id)}
                                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-all border-2 flex items-center justify-between ${selectedCategory === category.id
                                                    ? "bg-primary text-white border-primary shadow-md"
                                                    : "bg-card/50 border-border hover:border-primary/50 text-foreground"
                                                }`}
                                        >
                                            <span>{category.label}</span>
                                            {selectedCategory === category.id && subcategories.length > 0 && (
                                                <ChevronDown className={`h-4 w-4 transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
                                            )}
                                        </button>
                                        {selectedCategory === category.id && expandedCategory === category.id && subcategories.length > 0 && (
                                            <div className="ml-4 mt-2 space-y-2 border-l-2 border-primary/30 pl-3">
                                                {subcategories.map((sub) => (
                                                    <button
                                                        key={sub.id}
                                                        onClick={() => onSubcategoryChange(sub.id)}
                                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-all border ${selectedSubcategory === sub.id
                                                                ? "bg-primary/80 text-white border-primary shadow-sm"
                                                                : "bg-card/30 border-border/50 hover:border-primary/50 text-foreground"
                                                            }`}
                                                    >
                                                        {sub.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="text-sm font-bold text-foreground mb-2 block uppercase tracking-wide">Sort By</label>
                            <div className="space-y-2">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => onSortChange(option.value)}
                                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-all border-2 flex items-center gap-2 ${sortBy === option.value
                                                ? "bg-primary text-white border-primary shadow-md"
                                                : "bg-card/50 border-border hover:border-primary/50 text-foreground"
                                            }`}
                                    >
                                        <option.icon className="h-4 w-4" />
                                        {option.label}
                                    </button>
                                ))}
                            </div>

                            {/* Featured Filter Toggle */}
                            <div className="mt-3">
                                <button
                                    onClick={onToggleFeatured}
                                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-all border-2 flex items-center justify-between ${showFeaturedOnly
                                            ? "bg-orange-500/10 text-orange-600 border-orange-500/20"
                                            : "bg-card/50 border-border hover:border-primary/50 text-foreground"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Flame className="h-4 w-4" />
                                        <span>Featured Only</span>
                                    </div>
                                    <div className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${showFeaturedOnly ? "bg-orange-500" : "bg-muted-foreground/30"}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${showFeaturedOnly ? "left-[22px]" : "left-1"}`} />
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                            {activeFiltersCount > 0 && (
                                <Button variant="outline" onClick={onClearFilters} className="flex-1 h-11 text-sm font-bold border-2">
                                    <X className="h-4 w-4 mr-2" />
                                    Clear All
                                </Button>
                            )}
                            <Button onClick={onClose} className="flex-1 h-11 text-sm font-bold bg-primary">
                                Show {filteredBlogsCount} Blog{filteredBlogsCount !== 1 ? 's' : ''}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
}
