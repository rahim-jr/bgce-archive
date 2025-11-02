import { CardContent } from "@/components/ui/card";
import { Info, Heart, Cloud } from "lucide-react";

const ArchiveProTips = () => {
  const tips = [
    {
      icon: <Info className="h-8 w-8 text-gray-700 dark:text-white" />,
      title: "FAQs",
      desc: "Learn about re:Post, how to become a community expert, and more",
      highlight: true, // first one has subtle shadow
    },
    {
      icon: <Heart className="h-8 w-8 text-gray-700 dark:text-white" />,
      title: "Community guidelines",
      desc: "Tips to maintain a safe and inclusive environment",
    },
    {
      icon: <Cloud className="h-8 w-8 text-gray-700 dark:text-white" />,
      title: "AWS Official",
      desc: "Learn about AWS Official content  Your trusted source for AWS expertise",
    },
  ];

  return (
    <section className="container mx-auto py-10">
      <h2 className="text-xl font-semibold mb-4">BGCE Archive pro tips</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {tips.map((tip) => (
          <div
            key={tip.title}
            className="border border-gray-200 dark:bg-gray-800 dark:border-0 rounded-md py-2 hover:shadow-xl cursor-pointer transition duration-550"
          >
            <CardContent className="flex items-start gap-3 px-4 py-4 ">
              <div className="mt-1 ">{tip.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-[15px] dark:text-white">
                  {tip.title}
                </h3>
                <p className="text-sm text-gary-900 leading-snug mt-1">
                  {tip.desc}
                </p>
              </div>
            </CardContent>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArchiveProTips;
