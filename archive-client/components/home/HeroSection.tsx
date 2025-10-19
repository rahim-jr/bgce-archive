// components/hero-section.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Youtube } from "lucide-react";

export function HeroSection() {
  const communityButtons = [
    {
      icon: MessageCircle,
      label: "Discord",
      href: "https://discord.gg/wHq4SjKrNY",
      variant: "outline" as const,
    },
    {
      icon: Users,
      label: "FB Group",
      href: "#",
      variant: "outline" as const,
    },
    {
      icon: Youtube,
      label: "YT Channel",
      href: "#",
      variant: "outline" as const,
    },
  ];

  return (
    <section className="my-2 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium mb-8 overflow-hidden">
            <span className="relative z-10 text-[16px]">
              ✨ Community Driven • Open Source
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shine" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
            Welcome to{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Golang Community Vault
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            A community-driven archive to collect, organize, and preserve
            knowledge, tools, and stories from the Go ecosystem.
          </p>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12">
            Whether you&apos;re a beginner, job seeker, seasoned contributor, or
            mentor — this is where we grow together.
          </p>

          {/* Community Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {communityButtons.map((button, index) => {
              const Icon = button.icon;
              return (
                <Button
                  key={index}
                  variant={button.variant}
                  size="lg"
                  className="flex items-center gap-3 px-8 py-4 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  asChild
                >
                  <Link href={button.href}>
                    <Icon className="h-5 w-5" />
                    {button.label}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-8 py-3 transition-colors duration-200"
              asChild
            >
              <Link href="/archive">Explore Archive</Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 px-8 py-3 transition-colors duration-200"
              asChild
            >
              <Link href="/contribute">Contribute</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
