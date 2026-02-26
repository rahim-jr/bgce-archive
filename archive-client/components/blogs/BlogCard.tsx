import Link from "next/link";
import { Eye, Flame, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ApiPost } from "@/types/blog.type";

interface BlogCardProps {
    blog: ApiPost;
}

const getAuthorInitials = (userId: number) => `U${userId}`;

const getAuthorColor = (userId: number) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-pink-500"];
    return colors[userId % colors.length];
};

const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
};

const getTags = (keywords?: string) => {
    if (!keywords) return [];
    return keywords.split(',').map(k => k.trim()).slice(0, 2);
};

export function BlogCard({ blog }: BlogCardProps) {
    return (
        <Link
            href={`/blogs/${blog.slug}`}
            className="group relative bg-gradient-to-br from-card via-card/95 to-card/80 border border-border backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-0.5 p-3 sm:p-4"
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex flex-wrap gap-1.5">
                    {getTags(blog.keywords).map((tag) => (
                        <span key={tag} className="text-[9px] font-mono font-bold text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                            #{tag}
                        </span>
                    ))}
                </div>
                {blog.is_featured && (
                    <span className="flex items-center gap-0.5 px-1.5 py-1 rounded bg-orange-500/10 text-orange-600 border border-orange-500/20 text-[8px] font-black leading-none">
                        <Flame className="h-2 w-2" />
                        HOT
                    </span>
                )}
            </div>

            <h2 className="text-sm sm:text-base font-black text-foreground mb-2 group-hover:text-primary transition-all line-clamp-2 leading-tight">
                {blog.title}
            </h2>

            <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                {blog.summary || blog.meta_description || "No description available"}
            </p>

            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                <Avatar className="h-5 w-5 border border-border">
                    <AvatarFallback className={`${getAuthorColor(blog.created_by)} text-white text-[8px]`}>
                        {getAuthorInitials(blog.created_by)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-foreground truncate">User {blog.created_by}</p>
                    <p className="text-[8px] text-muted-foreground">
                        {new Date(blog.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                </div>
                <span className="text-[9px] text-muted-foreground font-bold">{calculateReadTime(blog.content)}</span>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                    <Eye className="h-2.5 w-2.5" />
                    {blog.view_count >= 1000 ? `${(blog.view_count / 1000).toFixed(1)}K` : blog.view_count}
                </span>
                {blog.is_pinned && (
                    <span className="ml-auto flex items-center gap-1 text-primary font-bold">
                        <Sparkles className="h-2.5 w-2.5" />
                        Pinned
                    </span>
                )}
            </div>

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>
            </div>
        </Link>
    );
}
