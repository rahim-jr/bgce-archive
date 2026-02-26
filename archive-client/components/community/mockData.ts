import { Discussion, Contributor, Event } from "./types";

export const discussions: Discussion[] = [
    {
        id: 1,
        title: "Best practices for Go routine management in high-load services",
        author: { name: "Alex Chen", avatar: "", color: "bg-blue-500" },
        category: "Technical",
        replies: 24,
        views: 1205,
        lastActive: "2h ago",
        tags: ["golang", "concurrency", "performance"],
    },
    {
        id: 2,
        title: "Upcoming changes in Go 1.22: Range over integers",
        author: { name: "Sarah Miller", avatar: "", color: "bg-purple-500" },
        category: "News",
        replies: 156,
        views: 5430,
        lastActive: "4h ago",
        tags: ["news", "update"],
    },
    {
        id: 3,
        title: "How to structure a large scale microservices architecture?",
        author: { name: "David Kim", avatar: "", color: "bg-green-500" },
        category: "Architecture",
        replies: 45,
        views: 2100,
        lastActive: "1d ago",
        tags: ["microservices", "architecture"],
    },
    {
        id: 4,
        title: "Anyone attending GopherCon 2026?",
        author: { name: "Emily White", avatar: "", color: "bg-red-500" },
        category: "Events",
        replies: 89,
        views: 3400,
        lastActive: "1d ago",
        tags: ["events", "community"],
    },
];

export const contributors: Contributor[] = [
    { name: "Sarah Miller", points: 1540, role: "Core Maintainer", color: "bg-purple-500" },
    { name: "Alex Chen", points: 1250, role: "Contributor", color: "bg-blue-500" },
    { name: "David Kim", points: 980, role: "Member", color: "bg-green-500" },
];

export const events: Event[] = [
    { title: "GopherCon 2026", date: "Oct 15-18", location: "San Diego, CA" },
    { title: "Go Systems Meetup", date: "Nov 5", location: "Online" },
];

export const categories = ["Technical", "News", "Architecture", "Events", "General"];
