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
  SelectLabel,
} from "@/components/ui/select";

import { Search, List, Grid } from "lucide-react";
import { getCategories, getSubcategories } from "@/lib/api";
import type { ApiCategory, ApiSubcategory } from "@/types/blog.type";

type ArticleSearchProps = {
  viewMode: string;
  setViewMode: (mode: "list" | "grid") => void;
};

interface CategoryWithSubcategories extends ApiCategory {
  subcategories: ApiSubcategory[];
}

export function ArticleSearch({ setViewMode, viewMode }: ArticleSearchProps) {
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories and subcategories
        const [categoriesData, subcategoriesData] = await Promise.all([
          getCategories(),
          getSubcategories(),
        ]);

        console.log("Categories:", categoriesData);
        console.log("Subcategories:", subcategoriesData);

        // Build hierarchy: attach subcategories to their parent categories
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
    <div className="w-full space-y-4 py-4">
      {/* Search and Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="rounded-sm shadow-none  pl-10 w-full h-10 focus-visible:ring-0.1 focus-visible:ring-blue-500 focus-visible:border-blue-500 border border-gray-400 font-medium"
          />
        </div>

        {/* Category with Subcategories */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger
            className="w-full md:w-[200px] lg:w-[300px] !h-10 font-medium
            border
            rounded-sm             
            shadow-none 
            border-gray-400
            focus:ring-0.1
            focus:ring-blue-500
            focus:border-blue-500
            focus:outline-none
            data-[state=open]:ring-0.1
            data-[state=open]:ring-blue-500
            data-[state=open]:border-blue-500"
          >
            <SelectValue placeholder={loading ? "Loading..." : "Select Category"} />
          </SelectTrigger>
          <SelectContent className="font-medium max-h-[400px]">
            <SelectItem value="all">All Categories</SelectItem>

            {!loading && categories.length > 0 ? (
              categories.map((category) => (
                <SelectGroup key={category.id}>
                  {/* Parent Category */}
                  <SelectItem value={`cat-${category.id}`} className="font-semibold">
                    {category.label}
                  </SelectItem>

                  {/* Subcategories */}
                  {category.subcategories.length > 0 && category.subcategories.map((subcategory) => (
                    <SelectItem
                      key={subcategory.id}
                      value={`sub-${subcategory.id}`}
                      className="pl-6"
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
        <Select>
          <SelectTrigger
            className="w-full md:w-[200px] lg:w-[300px] !h-10 font-medium
            border
            rounded-sm             
            shadow-none 
            border-gray-400
            focus:ring-0.1
            focus:ring-blue-500
            focus:border-blue-500
            focus:outline-none
            data-[state=open]:ring-0.1
            data-[state=open]:ring-blue-500
            data-[state=open]:border-blue-500 rounded-0"
          >
            <SelectValue placeholder="Sort" />
          </SelectTrigger>

          <SelectContent className="font-medium">
            <SelectItem value="name-asc">Sort by name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Sort by name (Z-A)</SelectItem>
            <SelectItem value="recent">Sort by most recent</SelectItem>
            <SelectItem value="popular">Sort by most popular</SelectItem>
          </SelectContent>
        </Select>

        {/* View Toggle */}
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-9 px-3 cursor-pointer"
          >
            <Grid className="h-4 w-4" />
          </Button>

          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-9 px-3 cursor-pointer"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
