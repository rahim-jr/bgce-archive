import { Cloud, Shield, Cpu, Layers, Server, FolderOpen } from "lucide-react";
import { Contributor } from "./types";

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    cloud: Cloud,
    shield: Shield,
    cpu: Cpu,
    layers: Layers,
    server: Server,
    default: FolderOpen,
};

export const contributors: Contributor[] = [
    {
        rank: 1,
        name: "Riku_Kobayashi",
        points: "70,547",
        avatar: "/avatars/1.png",
    },
    {
        rank: 2,
        name: "Oleksii Bebych",
        points: "26,425",
        avatar: "/avatars/2.png",
    },
    {
        rank: 3,
        name: "Didier Durand",
        points: "23,846",
        avatar: "/avatars/3.png",
    },
    {
        rank: 4,
        name: "Gary",
        points: "22,420",
        avatar: "/avatars/4.png",
    },
    {
        rank: 5,
        name: "Giovanni Lauria",
        points: "19,619",
        avatar: "/avatars/5.png",
    },
];

export const fallbackCategories = [
    {
        id: 1,
        uuid: "fallback-1",
        label: "Cloud Computing",
        slug: "cloud-computing",
        description: "Learn about cloud infrastructure and services",
        status: "approved" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_id: 0,
        meta: null,
    },
    {
        id: 2,
        uuid: "fallback-2",
        label: "Security",
        slug: "security",
        description: "Best practices for application security",
        status: "approved" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_id: 0,
        meta: null,
    },
    {
        id: 3,
        uuid: "fallback-3",
        label: "Performance",
        slug: "performance",
        description: "Optimize your applications for speed",
        status: "approved" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_id: 0,
        meta: null,
    },
    {
        id: 4,
        uuid: "fallback-4",
        label: "Architecture",
        slug: "architecture",
        description: "Design scalable system architectures",
        status: "approved" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_id: 0,
        meta: null,
    },
    {
        id: 5,
        uuid: "fallback-5",
        label: "DevOps",
        slug: "devops",
        description: "Streamline development and operations",
        status: "approved" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        creator_id: 0,
        meta: null,
    },
];

export function getCategoryIcon(slug: string) {
    const lowerSlug = slug.toLowerCase();
    for (const [key, Icon] of Object.entries(iconMap)) {
        if (lowerSlug.includes(key)) {
            return Icon;
        }
    }
    return iconMap.default;
}
