import { BookOpen } from "lucide-react";

export function BlogHeader() {
    return (
        <section className="py-4 border-b border-border/50 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <div className="p-1.5 rounded-lg bg-primary/10 dark:bg-primary/20">
                        <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold text-foreground">Community Blogs</h1>

                    {/* Operational Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
                            Operational
                        </span>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">Insights, tutorials, and stories from our community</p>
            </div>
        </section>
    );
}
