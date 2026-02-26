export interface FilterOption {
    value: string;
    label: string;
}

export interface FilterState {
    searchQuery: string;
    selectedFilters: Record<string, string | null>;
    toggleFilters: Record<string, boolean>;
}
