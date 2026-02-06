"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApiPost } from "@/types/blog.type";
import { Calendar, Eye } from "lucide-react";

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

  return (
    <Link href={postUrl}>
      <Card className="border border-gray-200 dark:border-0 shadow-none rounded-md transition-all duration-300 bg-white dark:bg-gray-800 p-0 pb-10 hover:shadow-md dark:hover:shadow-gray-900 cursor-pointer">
        <div className="bg-[#EEEEFA] dark:bg-gray-700 py-5 px-4 rounded-t-md">
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {article.title}
          </h3>

          {/* Meta info */}
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{publishedDate}</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{article.view_count} views</span>
            </div>
            {article.is_featured && (
              <>
                <span>|</span>
                <Badge className="bg-yellow-500 text-white text-[10px] font-semibold">
                  Featured
                </Badge>
              </>
            )}
            {article.is_pinned && (
              <>
                <span>|</span>
                <Badge className="bg-blue-500 text-white text-[10px] font-semibold">
                  Pinned
                </Badge>
              </>
            )}
          </div>
        </div>

        <div className="px-4">
          {/* Summary/Description */}
          {article.summary && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3 mt-3">
              {article.summary}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.slice(0, 5).map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-[11px] px-2 py-1 rounded-full font-medium border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ArticleCard;
