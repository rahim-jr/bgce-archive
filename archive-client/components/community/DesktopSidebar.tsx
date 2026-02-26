"use client";

import { Search, Clock, TrendingUp, Users, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { contributors, categories } from "./mockData";

interface DesktopSidebarProps {
  searchQuery: string;
  sortBy: string;
  selectedCategory: string | null;
  activeFiltersCount: number;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onCategoryChange: (category: string | null) => void;
  onClearFilters: () => void;
}

export function DesktopSidebar({
  searchQuery,
  sortBy,
  selectedCategory,
  activeFiltersCount,
  onSearchChange,
  onSortChange,
  onCategoryChange,
  onClearFilters,
}: DesktopSidebarProps) {
  const sortOptions = [
    { value: "recent", label: "Recent", icon: Clock },
    { value: "trending", label: "Trending", icon: TrendingUp },
  ];

  return (
    <aside className="hidden lg:block lg:w-56 flex-shrink-0">
      <div className="sticky top-20 space-y-3">
        {/* Search */}
        <div>
          <label className="text-[10px] font-bold text-foreground mb-1 flex items-center gap-1 uppercase tracking-wide">
            <Search className="h-2.5 w-2.5" />
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-7 h-7 text-xs border-2 dark:bg-input/30 dark:border-input dark:hover:border-primary/50 dark:focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="text-[10px] font-bold text-foreground mb-1 block uppercase tracking-wide">Sort By</label>
          <div className="space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`w-full text-left px-2 py-1 rounded-md text-[10px] font-bold transition-all border-2 flex items-center gap-1.5 ${
                  sortBy === option.value
                    ? "bg-primary text-white dark:text-white border-primary shadow-md dark:shadow-[0_0_12px_oklch(0.65_0.18_260/0.3)]"
                    : "bg-card/50 dark:bg-card/30 border-border dark:border-input hover:border-primary/50 dark:hover:border-[oklch(0.75_0.22_260)] hover:bg-accent dark:hover:bg-[oklch(0.28_0.06_260)] text-foreground dark:hover:text-[oklch(0.85_0.28_260)]"
                }`}
              >
                <option.icon className="h-2.5 w-2.5" />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="text-[10px] font-bold text-foreground mb-1 block uppercase tracking-wide">Category</label>
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
                className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold transition-all border ${
                  selectedCategory === category
                    ? "bg-primary text-white dark:text-white border-primary shadow-md dark:shadow-[0_0_8px_oklch(0.65_0.18_260/0.3)]"
                    : "bg-card/50 dark:bg-card/30 border-border dark:border-input hover:border-primary/50 dark:hover:border-[oklch(0.75_0.22_260)] hover:bg-accent dark:hover:bg-[oklch(0.28_0.06_260)] text-foreground dark:hover:text-[oklch(0.85_0.28_260)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="w-full h-7 text-[10px] font-bold border-2 dark:border-input dark:hover:border-[oklch(0.75_0.22_260)] dark:hover:bg-[oklch(0.28_0.06_260)] dark:hover:text-[oklch(0.85_0.28_260)]"
          >
            <X className="h-2.5 w-2.5 mr-1" />
            Clear ({activeFiltersCount})
          </Button>
        )}

        {/* Top Contributors */}
        <div className="p-3 rounded-lg border-2 border-border dark:border-input bg-card/50 dark:bg-card/30 backdrop-blur-sm mt-4">
          <h3 className="text-[10px] font-bold text-foreground mb-2 flex items-center gap-1 uppercase tracking-wide">
            <Users className="h-2.5 w-2.5" />
            Top Contributors
          </h3>
          <div className="space-y-2">
            {contributors.slice(0, 3).map((contributor, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-accent/50 dark:hover:bg-accent/30 transition-colors cursor-pointer group"
              >
                <div className="relative">
                  <Avatar className="h-6 w-6 border border-border">
                    <AvatarFallback className={`${contributor.color} text-white text-[8px]`}>
                      {contributor.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-yellow-500 text-black text-[7px] font-black w-3 h-3 rounded-full flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-bold truncate group-hover:text-primary dark:group-hover:text-[oklch(0.85_0.28_260)] transition-colors">
                    {contributor.name}
                  </div>
                  <div className="text-[8px] text-muted-foreground">{contributor.points} pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
