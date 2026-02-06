import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ApiPost } from "@/types/blog.type";
import Link from "next/link";

interface ArchiveRightSidebarProps {
  post: ApiPost;
}

export const ArchiveRightSidebar = ({ post }: ArchiveRightSidebarProps) => {
  // Parse tags from keywords
  const tags = post.keywords ? post.keywords.split(',').map(k => k.trim()).filter(Boolean) : [];

  // Calculate time ago
  const getTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  const timeAgo = getTimeAgo(post.published_at || post.created_at);

  return (
    <div className="space-y-6">
      {/* Tags Section */}
      {tags.length > 0 && (
        <div>
          <h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200 mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="border border-[#d5d9dd] dark:border-gray-600 text-[#16191f] dark:text-gray-300 text-[13px] font-normal px-3 py-1 rounded-full hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-400 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Post Stats */}
      <div>
        <h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200 mb-4">
          Post Information
        </h3>
        <div className="space-y-2 text-[13px] text-[#545b64] dark:text-gray-400">
          <div className="flex justify-between">
            <span>Published:</span>
            <span className="font-medium">{timeAgo}</span>
          </div>
          <div className="flex justify-between">
            <span>Views:</span>
            <span className="font-medium">{post.view_count}</span>
          </div>
          <div className="flex justify-between">
            <span>Version:</span>
            <span className="font-medium">v{post.version}</span>
          </div>
          {post.is_featured && (
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="font-medium text-yellow-600 dark:text-yellow-400">Featured</span>
            </div>
          )}
        </div>
      </div>

      {/* Author Section */}
      <div>
        <h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200 mb-4">
          Author
        </h3>
        <div className="flex gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-[#2563eb] text-white font-semibold text-sm">
                AU
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h4 className="text-[15px] font-semibold text-[#0073bb] dark:text-blue-400 hover:underline cursor-pointer">
              Author #{post.created_by}
            </h4>
            <div className="text-[13px] text-[#545b64] dark:text-gray-400">
              {timeAgo} | {post.view_count} views
            </div>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div>
        <h3 className="text-[14px] font-medium text-gray-800 dark:text-gray-200 mb-4">
          Share
        </h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors">
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};
