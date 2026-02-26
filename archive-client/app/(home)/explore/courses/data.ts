export interface Course {
    id: number;
    title: string;
    description: string;
    level: string;
    topic: string;
    duration: string;
    rating: number;
    students: number;
    price: string;
    thumbnail: string;
    trending: boolean;
}

export const levels = ["Beginner", "Intermediate", "Advanced"];

export const topics = [
    "AWS",
    "Java",
    "Python",
    "System Design",
    "DevOps",
    "Go",
    "Kubernetes",
    "Docker",
];

export const courses: Course[] = [
    {
        id: 1,
        title: "Complete Go Programming Bootcamp",
        description:
            "Master Go from basics to advanced concepts including concurrency, testing, and microservices",
        level: "Beginner",
        topic: "Go",
        duration: "40h",
        rating: 4.8,
        students: 12500,
        price: "Free",
        thumbnail: "🚀",
        trending: true,
    },
    {
        id: 2,
        title: "System Design Interview Masterclass",
        description:
            "Learn to design scalable systems and ace your system design interviews",
        level: "Advanced",
        topic: "System Design",
        duration: "25h",
        rating: 4.9,
        students: 8900,
        price: "$49",
        thumbnail: "🏗️",
        trending: true,
    },
    {
        id: 3,
        title: "AWS Solutions Architect Path",
        description: "Complete guide to AWS services and architecture patterns",
        level: "Intermediate",
        topic: "AWS",
        duration: "60h",
        rating: 4.7,
        students: 15200,
        price: "$79",
        thumbnail: "☁️",
        trending: false,
    },
    {
        id: 4,
        title: "Kubernetes for Developers",
        description:
            "Deploy and manage containerized applications with Kubernetes",
        level: "Intermediate",
        topic: "Kubernetes",
        duration: "30h",
        rating: 4.6,
        students: 6700,
        price: "Free",
        thumbnail: "⚓",
        trending: true,
    },
    {
        id: 5,
        title: "Python for Data Science",
        description:
            "Learn Python programming with focus on data analysis and machine learning",
        level: "Beginner",
        topic: "Python",
        duration: "45h",
        rating: 4.8,
        students: 18900,
        price: "$59",
        thumbnail: "🐍",
        trending: false,
    },
    {
        id: 6,
        title: "DevOps Engineering Complete Guide",
        description: "Master CI/CD, infrastructure as code, and cloud automation",
        level: "Advanced",
        topic: "DevOps",
        duration: "50h",
        rating: 4.7,
        students: 9800,
        price: "$89",
        thumbnail: "🔧",
        trending: true,
    },
];
