import React from "react";
import { ThumbsUp, ThumbsDown, Calendar, Eye } from "lucide-react";
import { ArchiveRightSidebar } from "./ArchiveRightSidebar";
import { ApiPost } from "@/types/blog.type";
import { Badge } from "@/components/ui/badge";

interface ArticlePageProps {
  post: ApiPost;
}

// Enhanced markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';

  let html = markdown;

  // Code blocks (must be before inline code)
  html = html.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
    return `<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4 border border-gray-700"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-red-600 dark:text-red-400">$1</code>');

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-10 mb-5 text-gray-900 dark:text-white">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold"><em class="italic">$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-4 max-w-full shadow-md" />');

  // Tables
  html = html.replace(/\|(.+)\|/g, (match) => {
    const cells = match.split('|').filter(cell => cell.trim());
    const isHeader = match.includes('---');

    if (isHeader) return '';

    const cellTags = cells.map(cell =>
      `<td class="border border-gray-300 dark:border-gray-600 px-4 py-2">${cell.trim()}</td>`
    ).join('');

    return `<tr>${cellTags}</tr>`;
  });

  html = html.replace(/(<tr>[\s\S]+?<\/tr>)/g, '<table class="min-w-full border-collapse my-4">$1</table>');

  // Unordered lists
  html = html.replace(/^\* (.+)$/gm, '<li class="ml-6 mb-2 list-disc">$1</li>');
  html = html.replace(/^- (.+)$/gm, '<li class="ml-6 mb-2 list-disc">$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-6 mb-2 list-decimal">$1</li>');

  // Wrap consecutive list items
  html = html.replace(/(<li[\s\S]+?<\/li>)/g, (match) => {
    if (!match.includes('<ul>') && !match.includes('<ol>')) {
      return `<ul class="my-4">${match}</ul>`;
    }
    return match;
  });

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 py-2">$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-6 border-gray-300 dark:border-gray-600" />');

  // Paragraphs (split by double newlines)
  const paragraphs = html.split('\n\n');
  html = paragraphs.map(p => {
    p = p.trim();
    // Don't wrap if already wrapped in HTML tags
    if (p.startsWith('<') || p === '') return p;
    return `<p class="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">${p.replace(/\n/g, '<br />')}</p>`;
  }).join('\n');

  return html;
};

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
  const htmlContent = markdownToHtml(post.content);

  return (
    <>
      <div className="mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8">
            <div className="">
              {/* Header */}
              <div className="py-6 bg-[#EEEEFA] dark:bg-gray-700 px-6 lg:px-10">
                <h1 className="text-[28px] lg:text-[36px] font-bold text-black dark:text-white leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center gap-4 text-[14px] text-[#545b64] dark:text-gray-400 mt-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{publishedDate}</span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{post.view_count} views</span>
                  </div>
                  {post.is_featured && (
                    <>
                      <span>|</span>
                      <Badge className="bg-yellow-500 text-white">Featured</Badge>
                    </>
                  )}
                  {post.is_pinned && (
                    <>
                      <span>|</span>
                      <Badge className="bg-blue-500 text-white">Pinned</Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Vote Section */}
              <div className="flex items-start gap-4 bg-white dark:bg-gray-900 p-6 px-6 lg:px-10 border-b border-gray-200 dark:border-gray-700">
                {/* Left Vote Section */}
                <div className="flex flex-col items-center justify-start text-gray-500 dark:text-gray-400 space-y-2">
                  <ThumbsUp className="w-5 h-5 cursor-pointer hover:text-green-600 transition-colors" />
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">
                    0
                  </span>
                  <ThumbsDown className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors" />
                </div>

                {/* Right Content Section */}
                <div className="flex-1">
                  {post.summary && (
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-[15px] bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500">
                      <p className="italic font-medium">{post.summary}</p>
                    </div>
                  )}

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {tags.map((tag, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-6 lg:px-10 py-8 bg-white dark:bg-gray-900">
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 px-4 lg:px-0 lg:mr-10">
            <ArchiveRightSidebar post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
