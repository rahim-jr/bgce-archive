"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import { Search, List, Grid, Filter } from "lucide-react";
import { getCategories, getSubcategories } from "@/lib/api";
import type { ApiCategory, ApiSubcategory } from "@/types/blog.type";

type ArticleSearchProps = {
  viewMode: string;
  setViewMode: (mode: "list" | "grid") => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
};

interface CategoryWithSubcategories extends ApiCategory {
  subcategories: ApiSubcategory[];
}

export function ArticleSearch({
  setViewMode,
  viewMode,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: ArticleSearchProps) {
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesData, subcategoriesData] = await Promise.all([
          getCategories(),
          getSubcategories(),
        ]);

        const categoriesWithSubs: CategoryWithSubcategories[] = categoriesData.map((cat) => ({
          ...cat,
          subcategories: subcategoriesData.filter((sub) => sub.parent_id === cat.id),
        }));

        setCategories(categoriesWithSubs);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="w-full space-y-4 py-6">
      {/* Filter Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-primary" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
          Search & Filter
        </span>
      </div>

      {/* Search and Filters Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full border-white/10 bg-card/30 backdrop-blur-md focus-visible:ring-primary focus-visible:border-primary/50 font-mono"
          />
        </div>

        {/* Category with Subcategories */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full lg:w-[250px] h-12 rounded-full border-white/10 bg-card/30 backdrop-blur-md focus:ring-primary focus:border-primary/50 font-mono">
            <SelectValue placeholder={loading ? "Loading..." : "Select Category"} />
          </SelectTrigger>
          <SelectContent className="font-mono max-h-[400px] rounded-2xl border-white/10 bg-card/95 backdrop-blur-md">
            <SelectItem value="all" className="font-bold">All Categories</SelectItem>

            {!loading && categories.length > 0 ? (
              categories.map((category) => (
                <SelectGroup key={category.id}>
                  <SelectItem value={`cat-${category.id}`} className="font-semibold">
                    {category.label}
                  </SelectItem>

                  {category.subcategories.length > 0 && category.subcategories.map((subcategory) => (
                    <SelectItem
                      key={subcategory.id}
                      value={`sub-${subcategory.id}`}
                      className="pl-6 text-muted-foreground"
                    >
                      └─ {subcategory.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))
            ) : !loading ? (
              <SelectItem value="none" disabled>
                No categories available
              </SelectItem>
            ) : null}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full lg:w-[220px] h-12 rounded-full border-white/10 bg-card/30 backdrop-blur-md focus:ring-primary focus:border-primary/50 font-mono">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent className="font-mono rounded-2xl border-white/10 bg-card/95 backdrop-blur-md">
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="flex rounded-full border border-white/10 bg-card/30 backdrop-blur-md overflow-hidden">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={`h-12 px-6 rounded-none ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
          >
            <Grid className="h-4 w-4" />
          </Button>

          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={`h-12 px-6 rounded-none ${viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
