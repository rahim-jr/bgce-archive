"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { BlogHeader } from "@/components/blogs/BlogHeader";
import { MobileFilterButton } from "@/components/blogs/MobileFilterButton";
import { BlogSidebar } from "@/components/blogs/BlogSidebar";
import { BlogGrid } from "@/components/blogs/BlogGrid";
import { getPosts, getSubcategories } from "@/lib/api";
import type { BlogsClientProps, SortOption } from "@/components/blogs/types";
import type { ApiCategory, ApiPostListItem } from "@/types/blog.type";

// Dynamically import mobile drawer (heavy component)
const MobileFilterDrawer = dynamic(
    () => import("@/components/blogs/MobileFilterDrawer").then(mod => ({ default: mod.MobileFilterDrawer })),
    { ssr: false }
);

export default function BlogsClient({ initialPosts, categories }: BlogsClientProps) {
    // State
    const [posts, setPosts] = useState(initialPosts);
    const [sortBy, setSortBy] = useState<SortOption>("new");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
    const [subcategories, setSubcategories] = useState<ApiCategory[]>([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
    const [categorySearch, setCategorySearch] = useState("");
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

    // Fetch subcategories when category is selected
    useEffect(() => {
        if (selectedCategory) {
            const category = categories.find(c => c.id === selectedCategory);
            if (category?.uuid) {
                setIsLoadingSubcategories(true);
                getSubcategories(category.uuid)
                    .then(setSubcategories)
                    .finally(() => setIsLoadingSubcategories(false));
            }
        } else {
            setSubcategories([]);
            setSelectedSubcategory(null);
        }
    }, [selectedCategory, categories]);

    // Fetch posts when filters change
    useEffect(() => {
        const fetchFilteredPosts = async () => {
            setIsLoading(true);
            try {
                const params: any = { limit: 100 };
                if (selectedCategory) params.category_id = selectedCategory;
                if (selectedSubcategory) params.sub_category_id = selectedSubcategory;

                const fetchedPosts = await getPosts(params);
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFilteredPosts();
    }, [selectedCategory, selectedSubcategory]);

    // Filter and sort blogs
    const filteredBlogs = useMemo(() => {
        return posts
            .filter((post) => {
                if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    !post.summary?.toLowerCase().includes(searchQuery.toLowerCase())) return false;
                if (showFeaturedOnly && !post.is_featured) return false;
                return true;
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case "new":
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    case "views":
                        return b.view_count - a.view_count;
                    case "featured":
                        if (a.is_featured && !b.is_featured) return -1;
                        if (!a.is_featured && b.is_featured) return 1;
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                    default:
                        return 0;
                }
            });
    }, [posts, searchQuery, showFeaturedOnly, sortBy]);

    // Filter categories based on search
    const filteredCategories = useMemo(() => {
        if (!categorySearch) return categories;
        return categories.filter(cat =>
            cat.label.toLowerCase().includes(categorySearch.toLowerCase())
        );
    }, [categories, categorySearch]);

    // Show only top 5 categories initially
    const displayedCategories = useMemo(() => {
        if (categorySearch || showAllCategories) return filteredCategories;
        return filteredCategories.slice(0, 5);
    }, [filteredCategories, categorySearch, showAllCategories]);

    const hasMoreCategories = filteredCategories.length > 5 && !showAllCategories && !categorySearch;

    // Get post count per category
    const getCategoryPostCount = (categoryId: number) => {
        return initialPosts.filter(post => post.category_id === categoryId).length;
    };

    const activeFiltersCount = [searchQuery, selectedCategory, selectedSubcategory, showFeaturedOnly].filter(Boolean).length;

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (showMobileFilters) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showMobileFilters]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.querySelector<HTMLInputElement>('input[placeholder*="Search"]')?.focus();
            }
            if (e.key === 'Escape' && activeFiltersCount > 0) {
                clearAllFilters();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [activeFiltersCount]);

    const clearAllFilters = () => {
        setSearchQuery("");
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setCategorySearch("");
        setShowAllCategories(false);
        setShowFeaturedOnly(false);
    };

    const handleToggleCategory = (categoryId: number) => {
        if (selectedCategory === categoryId) {
            setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
        } else {
            setSelectedCategory(categoryId);
            setExpandedCategory(categoryId);
            setSelectedSubcategory(null);
        }
    };

    return (
        <div className="min-h-screen">
            <BlogHeader />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <MobileFilterButton
                    onClick={() => setShowMobileFilters(true)}
                    activeFiltersCount={activeFiltersCount}
                />

                {/* Mobile Filter Drawer - Lazy loaded */}
                {showMobileFilters && (
                    <MobileFilterDrawer
                        isOpen={showMobileFilters}
                        onClose={() => setShowMobileFilters(false)}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        selectedSubcategory={selectedSubcategory}
                        onSubcategoryChange={setSelectedSubcategory}
                        subcategories={subcategories}
                        expandedCategory={expandedCategory}
                        onToggleCategory={handleToggleCategory}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        showFeaturedOnly={showFeaturedOnly}
                        onToggleFeatured={() => setShowFeaturedOnly(!showFeaturedOnly)}
                        onClearFilters={clearAllFilters}
                        activeFiltersCount={activeFiltersCount}
                        filteredBlogsCount={filteredBlogs.length}
                    />
                )}

                <div className="flex flex-col lg:flex-row gap-4">
                    <BlogSidebar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        selectedSubcategory={selectedSubcategory}
                        onSubcategoryChange={setSelectedSubcategory}
                        subcategories={subcategories}
                        expandedCategory={expandedCategory}
                        onToggleCategory={handleToggleCategory}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                        showFeaturedOnly={showFeaturedOnly}
                        onToggleFeatured={() => setShowFeaturedOnly(!showFeaturedOnly)}
                        categorySearch={categorySearch}
                        onCategorySearchChange={setCategorySearch}
                        showAllCategories={showAllCategories}
                        onToggleShowAll={() => setShowAllCategories(!showAllCategories)}
                        displayedCategories={displayedCategories}
                        hasMoreCategories={hasMoreCategories}
                        getCategoryPostCount={getCategoryPostCount}
                        totalPosts={posts.length}
                        isLoadingSubcategories={isLoadingSubcategories}
                        onClearFilters={clearAllFilters}
                        activeFiltersCount={activeFiltersCount}
                    />

                    <main className="flex-1">
                        <div className="mb-3 flex items-center justify-between">
                            <p className="text-xs font-bold text-foreground">
                                {isLoading ? "Loading..." : `${filteredBlogs.length} Blog${filteredBlogs.length !== 1 ? 's' : ''}`}
                            </p>
                        </div>

                        <BlogGrid
                            blogs={filteredBlogs}
                            isLoading={isLoading}
                            onClearFilters={clearAllFilters}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}
