import Link from "next/link";
import { FaDiscord, FaYoutube } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { cn } from "@/lib/utils";

const iconMap = {
  discord: FaDiscord,
  youtube: FaYoutube,
} as const;

const colorPresets = {
  indigo: {
    border: "border-indigo-500/30 hover:border-indigo-400/60",
    gradient: "from-indigo-900/40 via-black/60 to-black/80",
    shimmer: "via-indigo-400/30",
    glow: "from-indigo-500/10 via-indigo-400/20 to-indigo-500/10",
    shadow: "hover:shadow-indigo-500/30",
    iconBg:
      "from-indigo-500/30 to-indigo-600/10 group-hover:from-indigo-400/40 group-hover:to-indigo-500/20",
    title: "text-indigo-400 group-hover:text-indigo-300",
    subtitle: "text-indigo-300/60 group-hover:text-indigo-200/80",
    arrow: "text-indigo-400",
  },
  red: {
    border: "border-red-500/30 hover:border-red-400/60",
    gradient: "from-red-900/40 via-black/60 to-black/80",
    shimmer: "via-red-400/30",
    glow: "from-red-500/10 via-red-400/20 to-red-500/10",
    shadow: "hover:shadow-red-500/30",
    iconBg:
      "from-red-500/30 to-red-600/10 group-hover:from-red-400/40 group-hover:to-red-500/20",
    title: "text-red-400 group-hover:text-red-300",
    subtitle: "text-red-300/60 group-hover:text-red-200/80",
    arrow: "text-red-400",
  },
} as const;

type IconType = keyof typeof iconMap;
type ColorType = keyof typeof colorPresets;

interface SocialLinkButtonProps {
  href: string;
  icon: IconType;
  title: string;
  subtitle: string;
  color?: ColorType;
  className?: string;
}

export function SocialLinkButton({
  href,
  icon,
  title,
  subtitle,
  color = "indigo",
  className,
}: SocialLinkButtonProps) {
  const IconComponent = iconMap[icon];
  const colors = colorPresets[color];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("block", className)}
    >
      <button
        className={cn(
          "group relative w-full p-4 rounded-2xl backdrop-blur-xl border-2 bg-gradient-to-br shadow-2xl hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer overflow-hidden",
          colors.border,
          colors.gradient,
          colors.shadow
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out",
            colors.shimmer
          )}
        />

        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            colors.glow
          )}
        />

        <div className="relative z-10 flex items-center gap-4">
          <div
            className={cn(
              "p-3 rounded-lg bg-gradient-to-br backdrop-blur-sm transition-all duration-300",
              colors.iconBg
            )}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 text-left">
            <p
              className={cn(
                "font-bold text-lg transition-colors duration-300 drop-shadow-sm",
                colors.title
              )}
            >
              {title}
            </p>
            <p
              className={cn(
                "text-sm transition-colors duration-300",
                colors.subtitle
              )}
            >
              {subtitle}
            </p>
          </div>
          <IoIosArrowForward className={cn("w-5 h-5", colors.arrow)} />
        </div>
      </button>
    </Link>
  );
}
