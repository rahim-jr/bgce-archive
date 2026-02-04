"use client";

import { useState, useEffect } from "react";
import { BlogBreadcrumb } from "./ArchiveBreadcrumb";
import { ArticleSearch } from "./ArticleSearch";
import ArticleCard from "./ArchiveCard";
import { PaginationDemo } from "./Pagination";
import { Article } from "@/types/blog.type";
import ArticleList from "./ArticleList";

const ArchiveWrapper = ({ articles: initialArticles }: { articles: Article[] }) => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("recent");

  useEffect(() => {
    // Start with initial articles
    let filteredArticles = [...initialArticles];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "name-asc":
        filteredArticles.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filteredArticles.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "recent":
        filteredArticles.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "popular":
        filteredArticles.sort((a, b) => b.views - a.views);
        break;
    }

    setArticles(filteredArticles);
  }, [initialArticles, searchQuery, sortBy]);

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
        selectedCategory="all"
        setSelectedCategory={() => { }} // No-op since articles are pre-filtered
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {articles.length === 0 ? (
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
