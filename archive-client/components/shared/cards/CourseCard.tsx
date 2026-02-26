import Link from "next/link";
import { Clock, Users, Star, Play, BookOpen } from "lucide-react";
import { StaticWatermark } from "@/components/ui/StaticWatermark";

interface CourseCardProps {
    id: number;
    title: string;
    description: string;
    instructor: string;
    duration: string;
    students: string;
    rating: number;
    level: string;
    lessons: number;
}

const getLevelColor = (level: string) => {
    switch (level) {
        case "Beginner":
            return "bg-green-500/10 text-green-500 border-green-500/20";
        case "Intermediate":
            return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        case "Advanced":
            return "bg-purple-500/10 text-purple-500 border-purple-500/20";
        default:
            return "bg-primary/10 text-primary border-primary/20";
    }
};

export function CourseCard({ id, title, description, instructor, duration, students, rating, level, lessons }: CourseCardProps) {
    return (
        <Link
            href={`/explore/courses/${id}`}
            className="group relative bg-gradient-to-br from-card to-card/80 dark:from-card dark:to-card/50 border-2 border-border rounded-lg p-4 
        hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 
        hover:border-primary/50 hover:ring-2 hover:ring-primary/20
        transition-all duration-300 ease-out backdrop-blur-sm
        focus:outline-none focus:ring-2 focus:ring-primary/50 overflow-hidden"
        >
            <StaticWatermark />

            {/* Level Badge */}
            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 border ${getLevelColor(level)}`}>
                {level}
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                {title}
            </h3>

            {/* Description */}
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                {description}
            </p>

            {/* Instructor */}
            <p className="text-[10px] text-muted-foreground mb-3">
                by <span className="font-semibold text-foreground">{instructor}</span>
            </p>

            {/* Rating & Students */}
            <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-border">
                <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold text-foreground">{rating}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Users className="h-3 w-3" />
                    <span>{students}</span>
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="font-medium">{duration}</span>
                </div>
                <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3 text-primary" />
                    <span className="font-medium">{lessons} lessons</span>
                </div>
            </div>

            {/* Hover Play Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-1.5 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                    <Play className="h-3 w-3 fill-current" />
                </div>
            </div>
        </Link>
    );
}
