import { ApiPost, Article } from "@/types/blog.type";

export function transformPostToArticle(post: ApiPost): Article {
    return {
        id: post.id,
        slug: post.slug,
        title: post.title,
        author: "Archive Team",
        publishedAt: post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })
            : new Date(post.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        views: post.view_count,
        votes: 0,
        description: post.summary || post.meta_description || "",
        tags: post.keywords ? post.keywords.split(",").map((k) => k.trim()) : [],
    };
}

export function transformPostsToArticles(posts: ApiPost[]): Article[] {
    return posts.map(transformPostToArticle);
}
