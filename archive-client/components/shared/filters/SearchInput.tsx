"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    size?: "sm" | "md" | "lg";
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Search...",
    size = "md"
}: SearchInputProps) {
    const sizeClasses = {
        sm: "h-7 text-xs pl-7",
        md: "h-10 text-sm pl-10",
        lg: "h-11 text-base pl-10"
    };

    const iconSizes = {
        sm: "h-3 w-3 left-2",
        md: "h-4 w-4 left-3",
        lg: "h-4 w-4 left-3"
    };

    return (
        <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${iconSizes[size]}`} />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`${sizeClasses[size]} border-2 dark:bg-input/30 dark:border-input dark:hover:border-primary/50 dark:focus:border-primary transition-colors`}
            />
        </div>
    );
}
