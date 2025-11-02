"use client";

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
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const topics = [
  {
    icon: Cloud,
    title: "Serverless",
    stats: { questions: 8595, articles: 351, tutorials: 4, followers: 4947 },
  },
  {
    icon: Shield,
    title: "Security, Identity, & Compliance",
    stats: { questions: 8745, articles: 466, tutorials: 10, followers: 4369 },
  },
  {
    icon: Cloud,
    title: "BGCE Well-Architected Framework",
    stats: { questions: 1643, articles: 84, tutorials: 5, followers: 4140 },
  },
  {
    icon: Layers,
    title: "Containers",
    stats: { questions: 3602, articles: 406, tutorials: 3, followers: 4005 },
  },
  {
    icon: Cpu,
    title: "Compute",
    stats: { questions: 17465, articles: 983, tutorials: 9, followers: 3858 },
  },
];

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

export default function PopularSection() {
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

          <div className="space-y-2">
            {topics.map((topic) => (
              <Card
                key={topic.title}
                className="border border-gray-300 dark:border-0 bg-[#F7F9FB] dark:bg-gray-800 dark:text-white rounded-md  py-0"
              >
                <CardContent className="flex flex-col sm:flex-row items-center sm:justify-between px-3 sm:px-4 py-2.5 hover:shadow-md cursor-pointer transition duration-300">
                  {/* Left: Icon + Title */}
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 dark:bg-gray-800">
                      <topic.icon className="h-5 w-5 text-white dark:text-gray-300" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-[15px]">
                      {topic.title}
                    </span>
                  </div>

                  {/* Middle: Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1 dark:text-white">
                      <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                      {topic.stats.questions}
                    </span>
                    <span className="flex items-center gap-1 dark:text-white">
                      <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                      {topic.stats.articles}
                    </span>
                    <span className="flex items-center gap-1 dark:text-white">
                      <Server className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                      {topic.stats.tutorials}
                    </span>
                    <span className="flex items-center gap-1 dark:text-white">
                      <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                      {topic.stats.followers}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
