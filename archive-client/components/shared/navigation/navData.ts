import {
    BookOpen, Code, Folder, Cloud, Briefcase, Target,
    Brain, Mail, FileText, Users
} from "lucide-react";
import { ExploreItem, ResourceItem, NavLink } from "./types";

export const exploreItems: Record<string, ExploreItem> = {
    courses: {
        label: "Courses",
        icon: BookOpen,
        href: "/explore/courses",
        desc: "Expert-led courses to master new skills",
        subItems: [
            { label: "Programming", href: "/explore/courses?type=programming" },
            { label: "Web Development", href: "/explore/courses?type=web-dev" },
            { label: "Backend", href: "/explore/courses?type=backend" },
            { label: "DevOps", href: "/explore/courses?type=devops" },
            { label: "Cloud", href: "/explore/courses?type=cloud" },
            { label: "Databases", href: "/explore/courses?type=databases" },
        ]
    },
    practice: {
        label: "Practice",
        icon: Brain,
        href: "/explore/practice",
        desc: "Coding challenges and exercises",
        subItems: [
            { label: "Projects", href: "/explore/projects", icon: Folder, desc: "Real-world project templates" },
            { label: "Cloud Labs", href: "/explore/cloud-labs", icon: Cloud, desc: "Interactive cloud environments" },
        ]
    },
    getHired: {
        label: "Get Hired",
        icon: Briefcase,
        href: "/explore/get-hired",
        desc: "Career resources and job prep",
        subItems: [
            { label: "Mock Interview", href: "/explore/mock-interview", icon: Target, desc: "Practice technical interviews" },
            { label: "Interview Prep", href: "/explore/interview-prep", icon: Code, desc: "Ace your coding interviews" },
        ]
    }
};

export const resourceItems: ResourceItem[] = [
    { icon: Mail, label: "Newsletter", href: "/resources/newsletter" },
    { icon: FileText, label: "Free Cheatsheet", href: "/resources/cheatsheet" },
    { icon: Users, label: "Community Actions", href: "/resources/community-actions" },
];

export const navLinks: NavLink[] = [
    { href: "/blogs", label: "Blogs" },
    { href: "/discussion", label: "Discussion" },
    { href: "/projects", label: "Projects" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/models", label: "Models" },
    { href: "/benchmark", label: "Benchmark" },
    { href: "/support", label: "Support" },
];
