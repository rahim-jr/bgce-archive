import React from "react";
import { ThumbsUp, ThumbsDown, Calendar, Eye } from "lucide-react";
import { ArchiveRightSidebar } from "./ArchiveRightSidebar";
import { ApiPost } from "@/types/blog.type";

interface ArticlePageProps {
  post: ApiPost;
}

const ArticlePage = ({ post }: ArticlePageProps) => {
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    : new Date(post.created_at).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <>
      <div className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <div className="">
              {/* Header */}
              <div className="py-4 bg-[#EEEEFA] dark:bg-gray-700 px-4 lg:px-47 3xl:px-40">
                <h1 className="text-[28px] lg:text-[32px] font-bold text-black dark:text-white">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-[14px] text-[#545b64] dark:text-gray-400 mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{publishedDate}</span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.view_count} views</span>
                  </div>
                </div>
              </div>

              {/* Vote Section */}
              <div className="flex items-start gap-4 bg-white dark:bg-gray-900 p-6 px-4 lg:px-47">
                {/* Left Vote Section */}
                <div className="flex flex-col items-center justify-start text-gray-500 dark:text-gray-400 space-y-2">
                  <ThumbsUp className="w-5 h-5 cursor-pointer hover:text-green-600" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    0
                  </span>
                  <ThumbsDown className="w-5 h-5 cursor-pointer hover:text-red-600" />
                </div>

                {/* Right Content Section */}
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px]">
                  {post.summary && (
                    <>
                      <p className="italic">{post.summary}</p>
                      <hr className="mt-4 dark:border-gray-600" />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-10/12 mx-auto px-4 lg:px-8 mb-10">
              <div className="lg:px-18">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 px-4 lg:px-0 lg:mr-10">
            <ArchiveRightSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
