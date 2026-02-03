"use client";

import { useState, useEffect } from "react";
import { BlogBreadcrumb } from "./ArchiveBreadcrumb";
import { ArticleSearch } from "./ArticleSearch";
import ArticleCard from "./ArchiveCard";
import { PaginationDemo } from "./Pagination";
import { Article } from "@/types/blog.type";
import ArticleList from "./ArticleList";
import { getPosts } from "@/lib/api";
import { transformPostsToArticles } from "@/lib/transformers";

const ArchiveWrapper = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recent");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        let categoryId: number | undefined;
        let subCategoryId: number | undefined;

        // Parse selected category/subcategory
        if (selectedCategory !== "all") {
          if (selectedCategory.startsWith("cat-")) {
            categoryId = parseInt(selectedCategory.replace("cat-", ""));
          } else if (selectedCategory.startsWith("sub-")) {
            subCategoryId = parseInt(selectedCategory.replace("sub-", ""));
            // When filtering by subcategory, we don't need to pass category_id
            // The API will handle it based on sub_category_id
          }
        }

        // Fetch posts with filters
        const posts = await getPosts({
          category_id: categoryId,
          sub_category_id: subCategoryId,
          limit: 50,
        });

        // Transform to articles
        let transformedArticles = transformPostsToArticles(posts);

        // Apply search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          transformedArticles = transformedArticles.filter(
            (article) =>
              article.title.toLowerCase().includes(query) ||
              article.description.toLowerCase().includes(query)
          );
        }

        // Apply sorting
        switch (sortBy) {
          case "name-asc":
            transformedArticles.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "name-desc":
            transformedArticles.sort((a, b) => b.title.localeCompare(a.title));
            break;
          case "recent":
            transformedArticles.sort(
              (a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            break;
          case "popular":
            transformedArticles.sort((a, b) => b.views - a.views);
            break;
        }

        setArticles(transformedArticles);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <BlogBreadcrumb />
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Archive</h1>
      </div>
      <ArticleSearch
        setViewMode={setViewMode}
        viewMode={viewMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found.</p>
        </div>
      ) : (
        <>
          {viewMode === "grid" && (
            <>
              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}

          {viewMode === "list" && <ArticleList articles={articles} />}

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <PaginationDemo />
          </div>
        </>
      )}
    </div>
  );
};

export default ArchiveWrapper;
