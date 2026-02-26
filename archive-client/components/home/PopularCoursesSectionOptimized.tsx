"use client";

import { memo } from "react";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { MobileViewAllButton } from "@/components/shared/MobileViewAllButton";
import { CourseCard } from "@/components/shared/cards/CourseCard";

const courses = [
    {
        id: 1,
        title: "Go Fundamentals",
        description: "Master the basics of Go programming from syntax to concurrency",
        instructor: "John Doe",
        duration: "8 hours",
        students: "2.5K",
        rating: 4.8,
        level: "Beginner",
        lessons: 42,
    },
    {
        id: 2,
        title: "Building REST APIs",
        description: "Create production-ready REST APIs with Go and best practices",
        instructor: "Jane Smith",
        duration: "12 hours",
        students: "3.2K",
        rating: 4.9,
        level: "Intermediate",
        lessons: 56,
    },
    {
        id: 3,
        title: "Microservices Architecture",
        description: "Design and build scalable microservices with Go",
        instructor: "Mike Johnson",
        duration: "15 hours",
        students: "1.8K",
        rating: 4.7,
        level: "Advanced",
        lessons: 68,
    },
    {
        id: 4,
        title: "Testing in Go",
        description: "Write comprehensive tests and achieve high code coverage",
        instructor: "Sarah Wilson",
        duration: "6 hours",
        students: "2.1K",
        rating: 4.6,
        level: "Intermediate",
        lessons: 38,
    },
];

export const PopularCoursesSection = memo(function PopularCoursesSection() {
    return (
        <section className="py-10 lg:py-12 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <SectionHeader
                    title="Popular Courses"
                    description="Start learning with our most popular courses"
                    viewAllHref="/explore/courses"
                />

                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {courses.map((course) => (
                        <CourseCard key={course.id} {...course} />
                    ))}
                </div>

                <MobileViewAllButton href="/explore/courses" text="View All Courses" />
            </div>
        </section>
    );
});
