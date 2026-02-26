import { LucideIcon } from "lucide-react";

export interface DropdownPosition {
    top: number;
    left?: number;
    right?: number;
}

export interface SubItem {
    label: string;
    href: string;
    icon?: LucideIcon;
    desc?: string;
}

export interface ExploreItem {
    label: string;
    icon: LucideIcon;
    href: string;
    desc: string;
    subItems: SubItem[];
}

export interface ResourceItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

export interface NavLink {
    href: string;
    label: string;
}
