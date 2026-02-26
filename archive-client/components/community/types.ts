export interface Discussion {
    id: number;
    title: string;
    author: {
        name: string;
        avatar: string;
        color: string;
    };
    category: string;
    replies: number;
    views: number;
    lastActive: string;
    tags: string[];
}

export interface Contributor {
    name: string;
    points: number;
    role: string;
    color: string;
}

export interface Event {
    title: string;
    date: string;
    location: string;
}
