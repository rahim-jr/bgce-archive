"use client";

interface FilterChipsProps {
    options: string[];
    selected: string | null;
    onChange: (value: string | null) => void;
    size?: "sm" | "md";
}

export function FilterChips({ options, selected, onChange, size = "md" }: FilterChipsProps) {
    const sizeClasses = {
        sm: "px-1.5 py-0.5 text-[9px]",
        md: "px-3 py-2 text-xs"
    };

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onChange(selected === option ? null : option)}
                    className={`${sizeClasses[size]} rounded-full font-bold transition-all border-2 ${selected === option
                            ? "bg-primary text-white dark:text-white border-primary shadow-md dark:shadow-[0_0_8px_oklch(0.65_0.18_260/0.3)]"
                            : "bg-card/50 dark:bg-card/30 border-border dark:border-input hover:border-primary/50 dark:hover:border-[oklch(0.75_0.22_260)] hover:bg-accent dark:hover:bg-[oklch(0.28_0.06_260)] text-foreground dark:hover:text-[oklch(0.85_0.28_260)]"
                        }`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
