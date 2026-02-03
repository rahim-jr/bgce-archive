"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  Shield,
  Cpu,
  Layers,
  Server,
  FileText,
  Users,
  Clock,
  FolderOpen,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategories } from "@/lib/api";
import type { ApiCategory } from "@/types/blog.type";

// Icon mapping for categories
const iconMap: Record<string, any> = {
  cloud: Cloud,
  shield: Shield,
  cpu: Cpu,
  layers: Layers,
  server: Server,
  default: FolderOpen,
};

const contributors = [
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

// Helper function to get icon for category
function getCategoryIcon(slug: string) {
  const lowerSlug = slug.toLowerCase();
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (lowerSlug.includes(key)) {
      return Icon;
    }
  }
  return iconMap.default;
}

export default function PopularSection() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data.slice(0, 5)); // Show top 5 categories
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);
  return (
    <main className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Section: Topics */}
        <section>
          <div className="mb-4">
            <h2 className="text-2xl sm:text-xl font-semibold">
              Follow popular topics
            </h2>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card
                  key={i}
                  className="border border-gray-300 dark:border-0 bg-[#F7F9FB] dark:bg-gray-800 rounded-md py-0 animate-pulse"
                >
                  <CardContent className="px-3 sm:px-4 py-4">
                    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <Card className="border border-gray-300 dark:border-0 bg-[#F7F9FB] dark:bg-gray-800 rounded-md">
              <CardContent className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                No categories available yet
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {categories.map((category) => {
                const IconComponent = getCategoryIcon(category.slug);
                return (
                  <Card
                    key={category.id}
                    className="border border-gray-300 dark:border-0 bg-[#F7F9FB] dark:bg-gray-800 dark:text-white rounded-md py-0"
                  >
                    <CardContent className="flex flex-col sm:flex-row items-center sm:justify-between px-3 sm:px-4 py-2.5 hover:shadow-md cursor-pointer transition duration-300">
                      {/* Left: Icon + Title */}
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 dark:bg-gray-800">
                          <IconComponent className="h-5 w-5 text-white dark:text-gray-300" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-[15px]">
                            {category.label}
                          </span>
                          {category.description && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                              {category.description}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Stats Row - Mock data for now */}
                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1 dark:text-white">
                          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                          {Math.floor(Math.random() * 10000)}
                        </span>
                        <span className="flex items-center gap-1 dark:text-white">
                          <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                          {Math.floor(Math.random() * 500)}
                        </span>
                        <span className="flex items-center gap-1 dark:text-white">
                          <Server className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                          {Math.floor(Math.random() * 20)}
                        </span>
                        <span className="flex items-center gap-1 dark:text-white">
                          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                          {Math.floor(Math.random() * 5000)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Right Section: Contributors */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-xl font-semibold">
              Top contributors
            </h2>
          </div>

          {/*  Table */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
              <Table className="w-full text-sm dark:bg-gray-800 min-w-[400px]">
                <TableHeader className="bg-[#FAFAFA] dark:bg-gray-600 ">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="p-4 font-semibold text-center text-black dark:text-white">
                      Rank
                    </TableHead>
                    <TableHead className="p-3 font-semibold text-left text-black dark:text-white">
                      Name
                    </TableHead>
                    <TableHead className="p-3 font-semibold text-left text-black dark:text-white">
                      Total points
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {contributors.map((contributor) => (
                    <TableRow
                      key={contributor.rank}
                      className="border-b last:border-0 border-gray-200 dark:border-gray-700 hover:bg-transparent"
                    >
                      <TableCell className="p-3 font-medium text-center">
                        {contributor.rank <= 3 ? (
                          <span>
                            {contributor.rank === 1 && "🥇"}
                            {contributor.rank === 2 && "🥈"}
                            {contributor.rank === 3 && "🥉"}
                          </span>
                        ) : (
                          contributor.rank
                        )}
                      </TableCell>

                      <TableCell className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={contributor.avatar} />
                            <AvatarFallback>
                              {contributor.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{contributor.name}</span>
                        </div>
                      </TableCell>

                      <TableCell className="p-3 font-medium text-left">
                        {contributor.points}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
