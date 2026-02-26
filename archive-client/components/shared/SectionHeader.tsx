import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
    title: string;
    description: string;
    viewAllHref?: string;
    viewAllText?: string;
}

export function SectionHeader({ title, description, viewAllHref, viewAllText = "View All" }: SectionHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-3">
            <div className="space-y-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight">{title}</h2>
                <p className="text-sm text-muted-foreground max-w-2xl">{description}</p>
            </div>
            {viewAllHref && (
                <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hidden sm:flex hover:bg-accent transition-all duration-200"
                >
                    <Link href={viewAllHref}>
                        {viewAllText}
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                    </Link>
                </Button>
            )}
        </div>
    );
}
