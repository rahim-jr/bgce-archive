import React from "react";
import { ThumbsUp, ThumbsDown, Calendar, Eye, Clock, Share2, Bookmark, Code2 } from "lucide-react";
import { ArchiveRightSidebar } from "./ArchiveRightSidebar";
import { ApiPost } from "@/types/blog.type";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

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

  const tags = post.keywords ? post.keywords.split(',').map(k => k.trim()).filter(Boolean) : [];

  // Calculate reading time
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8 animate-fade-in space-y-8">
              {/* Header Card */}
              <div className="p-8 rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-md space-y-6">
                {/* Badges */}
                {(post.is_featured || post.is_pinned) && (
                  <div className="flex flex-wrap gap-2">
                    {post.is_featured && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                        Featured
                      </Badge>
                    )}
                    {post.is_pinned && (
                      <Badge className="bg-primary/10 text-primary border-primary/20 font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1">
                        Pinned
                      </Badge>
                    )}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                  {post.title}
                </h1>

                {/* Meta Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                  <div className="p-3 rounded-xl bg-gray-300 dark:bg-black/40 border border-white/5 text-center">
                    <Calendar className="w-4 h-4 text-primary mb-1 mx-auto" />
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Published</div>
                    <div className="text-xs font-bold mt-1">{publishedDate}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-300 dark:bg-black/40 border border-white/5 text-center">
                    <Clock className="w-4 h-4 text-primary mb-1 mx-auto" />
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Read Time</div>
                    <div className="text-xs font-bold mt-1">{readingTime} min</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-300 dark:bg-black/40 border border-white/5 text-center">
                    <Eye className="w-4 h-4 text-primary mb-1 mx-auto" />
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Views</div>
                    <div className="text-xs font-bold mt-1">{post.view_count}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-300 dark:bg-black/40 border border-white/5 text-center">
                    <Code2 className="w-4 h-4 text-primary mb-1 mx-auto" />
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Version</div>
                    <div className="text-xs font-bold mt-1">v{post.version}</div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              {post.summary && (
                <div className="p-6 bg-primary/5 rounded-[1.5rem] border border-primary/20 border-l-4 border-l-primary backdrop-blur-sm">
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-3">Summary</div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {post.summary}
                  </p>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-[10px] font-mono hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-pointer uppercase tracking-wider px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Markdown Content */}
              <div className="p-8 rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-md">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1 className="text-4xl font-bold tracking-tight mt-8 mb-4 text-foreground" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-3xl font-bold tracking-tight mt-8 mb-4 text-foreground border-b border-border pb-2" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-2xl font-semibold tracking-tight mt-6 mb-3 text-foreground" {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <h4 className="text-xl font-semibold tracking-tight mt-6 mb-3 text-foreground" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-muted-foreground leading-7 mb-4" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors font-medium" {...props} />
                      ),
                      code: ({ node, inline, className, children, ...props }: any) => {
                        if (inline) {
                          return (
                            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary border border-primary/20" {...props}>
                              {children}
                            </code>
                          );
                        }
                        return (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      pre: ({ node, ...props }) => (
                        <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto my-6 border border-border font-mono text-sm" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground my-6 py-2 bg-primary/5" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="my-6 ml-6 space-y-2 list-disc" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="my-6 ml-6 space-y-2 list-decimal" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-muted-foreground" {...props} />
                      ),
                      table: ({ node, ...props }) => (
                        <div className="my-6 overflow-x-auto">
                          <table className="w-full border-collapse border border-border rounded-lg overflow-hidden" {...props} />
                        </div>
                      ),
                      thead: ({ node, ...props }) => (
                        <thead className="bg-muted" {...props} />
                      ),
                      th: ({ node, ...props }) => (
                        <th className="border border-border px-4 py-3 text-left font-semibold text-sm" {...props} />
                      ),
                      td: ({ node, ...props }) => (
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground" {...props} />
                      ),
                      img: ({ node, ...props }) => (
                        <img className="rounded-lg my-6 border border-border" {...props} />
                      ),
                      hr: ({ node, ...props }) => (
                        <hr className="my-8 border-border" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold text-foreground" {...props} />
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 rounded-[2rem] bg-card/30 border border-white/5 backdrop-blur-md">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded-full border border-white/10 hover:bg-primary/10 hover:border-primary/20 transition-all">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful</span>
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded-full border border-white/10 hover:bg-primary/10 hover:border-primary/20 transition-all">
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded-full border border-white/10 hover:bg-primary/10 hover:border-primary/20 transition-all">
                      <Bookmark className="w-4 h-4" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded-full border border-white/10 hover:bg-primary/10 hover:border-primary/20 transition-all">
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <ArchiveRightSidebar post={post} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
