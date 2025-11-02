import ArchiveProTips from "@/components/home/ArchiveProTips";
import HeroSection from "@/components/home/HeroSection";
import PopularSection from "@/components/home/PopularSection";
import RecentQuestions from "@/components/home/RecentQuestions";
import React from "react";

const homePage = () => {
  return (
    <div>
      <HeroSection />
      <PopularSection />
      <RecentQuestions />
      <ArchiveProTips />
    </div>
  );
};

export default homePage;
