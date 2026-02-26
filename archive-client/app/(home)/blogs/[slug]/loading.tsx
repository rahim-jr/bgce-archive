import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export default function BlogDetailsLoading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Breadcrumb Skeleton */}
            <div className="border-b border-border/40 bg-muted/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Skeleton className="h-4 w-12" />
                            <ChevronRight className="h-3 w-3" />
                            <Skeleton className="h-4 w-12" />
                            <ChevronRight className="h-3 w-3" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Article Content - Left Side */}
                    <article className="lg:col-span-8 space-y-4">

                        {/* Badges Skeleton */}
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-6 w-24" />
                        </div>

                        {/* Title Skeleton */}
                        <div className="space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-3/4" />
                        </div>

                        {/* Author & Meta Skeleton */}
                        <div className="flex flex-wrap items-center gap-3 pb-4 border-b">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>

                        {/* Summary Skeleton */}
                        <div className="bg-muted/50 border-l-4 border-primary rounded-r-lg p-4">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>

                        {/* Tags Skeleton */}
                        <div className="flex flex-wrap items-center gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-24" />
                        </div>

                        {/* Content Skeleton */}
                        <div className="space-y-4 pt-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />

                            <div className="py-4">
                                <Skeleton className="h-8 w-48 mb-3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>

                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </article>

                    {/* Sidebar - Right Side */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-20 space-y-4">

                            {/* Actions Skeleton */}
                            <div className="bg-card border rounded-lg p-4">
                                <div className="grid grid-cols-3 gap-2 mb-3">
                                    <Skeleton className="h-16 w-full" />
                                    <Skeleton className="h-16 w-full" />
                                    <Skeleton className="h-16 w-full" />
                                </div>
                                <div className="pt-3 border-t">
                                    <Skeleton className="h-4 w-16 mb-2" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-10 flex-1" />
                                        <Skeleton className="h-10 flex-1" />
                                        <Skeleton className="h-10 flex-1" />
                                        <Skeleton className="h-10 flex-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Stats Skeleton */}
                            <div className="bg-card border rounded-lg p-4">
                                <Skeleton className="h-5 w-24 mb-3" />
                                <div className="space-y-2">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>

                            {/* Author Skeleton */}
                            <div className="bg-card border rounded-lg p-4">
                                <Skeleton className="h-5 w-20 mb-3" />
                                <div className="flex items-center gap-3 mb-3">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="flex-1">
                                        <Skeleton className="h-4 w-24 mb-2" />
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                </div>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mb-3" />
                                <Skeleton className="h-9 w-full" />
                            </div>

                            {/* Newsletter Skeleton */}
                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                                <Skeleton className="h-5 w-28 mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-2/3 mb-3" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
