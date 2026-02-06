"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ApiPost } from "@/types/blog.type";
import { Calendar, Eye, Clock, Star } from "lucide-react";

interface ArticleCardProps {
  article: ApiPost;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const postUrl = `/archive/post/${article.slug}`;

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : new Date(article.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Parse keywords into tags
  const tags = article.keywords ? article.keywords.split(',').map(k => k.trim()).filter(Boolean) : [];

  // Calculate reading time
  const wordCount = article.content?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <Link href={postUrl}>
      <div className="h-full rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-md hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden">
        {/* Header */}
        <div className="p-6 space-y-4">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {article.is_featured && (
              <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {article.is_pinned && (
              <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                Pinned
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>

          {/* Summary */}
          {article.summary && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {article.summary}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border-white/10 hover:bg-primary/10 hover:border-primary/20 transition-colors"
                >
                  #{tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full border-white/10"
                >
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="px-6 py-4 bg-gray-300 dark:bg-black/40 border-t border-white/5">
          <div className="grid grid-cols-3 gap-4 text-xs font-mono">
            <div className="text-center">
              <Calendar className="h-3.5 w-3.5 text-primary mb-1 mx-auto" />
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Published</div>
              <div className="font-bold mt-1">{publishedDate}</div>
            </div>
            <div className="text-center">
              <Clock className="h-3.5 w-3.5 text-primary mb-1 mx-auto" />
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Read</div>
              <div className="font-bold mt-1">{readingTime} min</div>
            </div>
            <div className="text-center">
              <Eye className="h-3.5 w-3.5 text-primary mb-1 mx-auto" />
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Views</div>
              <div className="font-bold mt-1">{article.view_count}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
