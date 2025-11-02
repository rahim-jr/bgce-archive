import { CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function RecentQuestions() {
  const questions = [
    {
      title: "Partially failed Control Tower setup with an incomplete acco...",
      desc: "Hi all, I have the following problem: I have been dealing with a partially failed Control Tower setup with an incomplete account that can't be removed normally. The account is closed but I want to...",
      tags: ["AWS Control Tower", "AWS Organizations"],
      stats: { answers: 1, votes: 0, views: 1 },
      author: "Col",
      time: "asked 5 hours ago",
    },
  ];

  return (
    <section className="container mx-auto py-10">
      {/* Header */}
      {/* <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Recent questions
        </h2>
      </div> */}

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4">
          {/* Question cards */}
          <div className="space-y-4 ">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-0 rounded-md overflow-hidden hover:shadow-md transition duration-300 px-0 py-0 cursor-pointer dark:bg-gray-800"
              >
                <CardContent className="px-0">
                  <div className="px-6 py-4">
                    {/* Title */}
                    <h3 className="font-semibold text-[15px] text-gray-900 dark:text-white leading-snug mb-4 truncate">
                      {q.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-700 dark:text-white leading-snug mb-3 line-clamp-2">
                      {q.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2  mt-10">
                      {q.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-0.5 border border-gray-300 dark:border-0 dark:bg-sky-950  text-sm rounded-full text-gray-800 dark:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <hr />
                  {/* Bottom section */}
                  <div className="pt-3 flex items-center justify-between text-sm text-gray-700 px-6 bg-[#F7F9FB] dark:bg-gray-700 py-4">
                    {/* Stats */}
                    <div className="flex items-center gap-6 dark:text-white">
                      <span>
                        <strong>{q.stats.answers}</strong> answers
                      </span>
                      <span>
                        <strong>{q.stats.votes}</strong> votes
                      </span>
                      <span>
                        <strong>{q.stats.views}</strong> views
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2 text-sky-700">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300">
                        <User className="h-4 w-4 text-gray-700" />
                      </div>
                      <span className="font-medium dark:text-white">
                        {q.author}
                      </span>

                      <span className="text-gray-600 dark:text-white">
                        {q.time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4">
          {/* Question cards */}
          <div className="space-y-4 ">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-0 rounded-md overflow-hidden hover:shadow-md transition duration-300 px-0 py-0 cursor-pointer dark:bg-gray-800"
              >
                <CardContent className="px-0">
                  <div className="px-6 py-4">
                    {/* Title */}
                    <h3 className="font-semibold text-[15px] text-gray-900 dark:text-white leading-snug mb-4 truncate">
                      {q.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-700 dark:text-white leading-snug mb-3 line-clamp-2">
                      {q.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2  mt-10">
                      {q.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-0.5 border border-gray-300 dark:border-0 dark:bg-sky-950  text-sm rounded-full text-gray-800 dark:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <hr />
                  {/* Bottom section */}
                  <div className="pt-3 flex items-center justify-between text-sm text-gray-700 px-6 bg-[#F7F9FB] dark:bg-gray-700 py-4">
                    {/* Stats */}
                    <div className="flex items-center gap-6 dark:text-white">
                      <span>
                        <strong>{q.stats.answers}</strong> answers
                      </span>
                      <span>
                        <strong>{q.stats.votes}</strong> votes
                      </span>
                      <span>
                        <strong>{q.stats.views}</strong> views
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2 text-sky-700">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300">
                        <User className="h-4 w-4 text-gray-700" />
                      </div>
                      <span className="font-medium dark:text-white">
                        {q.author}
                      </span>

                      <span className="text-gray-600 dark:text-white">
                        {q.time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-4">
          {/* Question cards */}
          <div className="space-y-4 ">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-0 rounded-md overflow-hidden hover:shadow-md transition duration-300 px-0 py-0 cursor-pointer dark:bg-gray-800"
              >
                <CardContent className="px-0">
                  <div className="px-6 py-4">
                    {/* Title */}
                    <h3 className="font-semibold text-[15px] text-gray-900 dark:text-white leading-snug mb-4 truncate">
                      {q.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-700 dark:text-white leading-snug mb-3 line-clamp-2">
                      {q.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2  mt-10">
                      {q.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-0.5 border border-gray-300 dark:border-0 dark:bg-sky-950  text-sm rounded-full text-gray-800 dark:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <hr />
                  {/* Bottom section */}
                  <div className="pt-3 flex items-center justify-between text-sm text-gray-700 px-6 bg-[#F7F9FB] dark:bg-gray-700 py-4">
                    {/* Stats */}
                    <div className="flex items-center gap-6 dark:text-white">
                      <span>
                        <strong>{q.stats.answers}</strong> answers
                      </span>
                      <span>
                        <strong>{q.stats.votes}</strong> votes
                      </span>
                      <span>
                        <strong>{q.stats.views}</strong> views
                      </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-2 text-sky-700">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300">
                        <User className="h-4 w-4 text-gray-700" />
                      </div>
                      <span className="font-medium dark:text-white">
                        {q.author}
                      </span>

                      <span className="text-gray-600 dark:text-white">
                        {q.time}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
