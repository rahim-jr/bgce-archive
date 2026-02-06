import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ApiPost } from "@/types/blog.type";
import { Eye, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ArchiveRightSidebarProps {
  post: ApiPost;
}

export const ArchiveRightSidebar = ({ post }: ArchiveRightSidebarProps) => {
  const tags = post.keywords ? post.keywords.split(',').map(k => k.trim()).filter(Boolean) : [];

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;

    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths}mo ago`;
  };

  const timeAgo = getTimeAgo(post.published_at || post.created_at);

  return (
    <div className="space-y-6 animate-in">
      {/* Author */}
      <div className="p-6 rounded-lg border bg-card">
        <h3 className="text-sm font-semibold mb-4">Author</h3>
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-muted text-foreground font-medium text-sm">
              AU
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              Author #{post.created_by}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {timeAgo}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6 rounded-lg border bg-card">
        <h3 className="text-sm font-semibold mb-4">Article Stats</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Views</span>
            <span className="font-medium">{post.view_count}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Version</span>
            <span className="font-medium">v{post.version}</span>
          </div>
          {post.is_featured && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium">Featured</span>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="text-sm font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="p-6 rounded-lg border bg-card">
        <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Link
            href="/archive"
            className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Browse Archive</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            href="/topics"
            className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Explore Topics</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <Link
            href="/community-groups"
            className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>Join Community</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* Help */}
      <div className="p-6 rounded-lg border bg-muted">
        <h3 className="text-sm font-semibold mb-2">Need help?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Join our community for support and discussions.
        </p>
        <Link
          href="/nesohq-support"
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Get Support
        </Link>
      </div>
    </div>
  );
};
