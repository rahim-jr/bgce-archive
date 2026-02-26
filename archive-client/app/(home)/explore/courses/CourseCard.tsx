"use client";

import { Clock, Star, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Course } from "./data";

interface CourseCardProps {
    course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    return (
        <Link
            href="#"
            className="group relative bg-gradient-to-br from-card via-card/95 to-card/80 dark:from-card dark:via-card/95 dark:to-card/50 border border-border dark:border-input backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-[0_4px_20px_oklch(0.65_0.18_260/0.3)] hover:border-primary/50 dark:hover:border-[oklch(0.75_0.22_260)] transition-all duration-300 hover:-translate-y-1 p-4"
        >
            {course.trending && (
                <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary/20 border border-primary/30 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-bold text-primary">Trending</span>
                </div>
            )}

            <div className="flex gap-4">
                <div className="text-4xl">{course.thumbnail}</div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary dark:group-hover:text-[oklch(0.85_0.28_260)] transition-colors line-clamp-2">
                        {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {course.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            {course.rating}
                        </span>
                        <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.students.toLocaleString()}
                        </span>
                        <span
                            className={`ml-auto font-bold ${course.price === "Free" ? "text-green-500" : "text-primary"
                                }`}
                        >
                            {course.price}
                        </span>
                    </div>

                    <div className="flex gap-2 mt-3">
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                            {course.level}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-[10px] font-bold">
                            {course.topic}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
