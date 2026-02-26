"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFilterButtonProps {
    activeCount: number;
    onClick: () => void;
}

export function MobileFilterButton({ activeCount, onClick }: MobileFilterButtonProps) {
    return (
        <div className="lg:hidden mb-4">
            <Button
                onClick={onClick}
                variant="outline"
                className="w-full h-10 border-2 dark:border-input dark:hover:border-[oklch(0.75_0.22_260)] dark:hover:bg-[oklch(0.28_0.06_260)] dark:hover:text-[oklch(0.85_0.28_260)] font-bold"
            >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters & Search
                {activeCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-white text-xs">
                        {activeCount}
                    </span>
                )}
            </Button>
        </div>
    );
}
