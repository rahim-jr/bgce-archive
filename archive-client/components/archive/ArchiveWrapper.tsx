"use client";

import { useState, useEffect } from "react";
import { BlogBreadcrumb } from "./ArchiveBreadcrumb";
import { ArticleSearch } from "./ArticleSearch";
import ArticleCard from "./ArchiveCard";
import { PaginationDemo } from "./Pagination";
import { Article } from "@/types/blog.type";
import ArticleList from "./ArticleList";
import { Code2, Layers } from "lucide-react";

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
    <div className="min-h-screen bg-background relative">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <BlogBreadcrumb />
        </div>

        {/* Hero Section */}
        <div className="mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-mono uppercase tracking-[0.3em] text-primary">
            <Layers className="h-4 w-4" />
            Archive Registry
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Knowledge <span className="text-primary italic">Vault</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Explore our comprehensive collection of articles, tutorials, and resources from the Go community.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="px-6 py-3 rounded-xl bg-gray-300 dark:bg-black/40 border border-white/5">
              <div className="text-2xl font-bold font-mono text-primary">{initialArticles.length}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Total Articles</div>
            </div>
            <div className="px-6 py-3 rounded-xl bg-gray-300 dark:bg-black/40 border border-white/5">
              <div className="text-2xl font-bold font-mono text-primary">{articles.length}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Filtered</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
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
          <div className="text-center py-24">
            <div className="p-12 rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-md inline-block">
              <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground font-mono">No articles found.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <>
            {viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {viewMode === "list" && <ArticleList articles={articles} />}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <PaginationDemo />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArchiveWrapper;
