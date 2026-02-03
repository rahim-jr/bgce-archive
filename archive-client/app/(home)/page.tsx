import ArchiveProTips from "@/components/home/ArchiveProTips";
import HeroSection from "@/components/home/HeroSection";
import PopularSection from "@/components/home/PopularSection";
import RecentQuestions from "@/components/home/RecentQuestions";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <PopularSection />
      <RecentQuestions />
      <ArchiveProTips />
    </div>
  );
}
