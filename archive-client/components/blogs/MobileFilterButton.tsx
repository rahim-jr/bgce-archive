import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFilterButtonProps {
    onClick: () => void;
    activeFiltersCount: number;
}

export function MobileFilterButton({ onClick, activeFiltersCount }: MobileFilterButtonProps) {
    return (
        <div className="lg:hidden mb-4">
            <Button
                onClick={onClick}
                variant="outline"
                className="w-full h-10 border-2 font-bold"
            >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters & Search
                {activeFiltersCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-white text-xs">
                        {activeFiltersCount}
                    </span>
                )}
            </Button>
        </div>
    );
}
