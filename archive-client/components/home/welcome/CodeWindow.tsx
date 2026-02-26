"use client";

import { useState, useEffect, useRef, memo } from "react";
import { Code2, Terminal } from "lucide-react";
import type { TechStack } from "./types";
import { codeExamples } from "./codeExamples";
import { renderCodeLine } from "./syntaxHighlighter";

interface CodeWindowProps {
    activeTech: TechStack;
    onTechChange: (tech: TechStack) => void;
}

export const CodeWindow = memo(function CodeWindow({ activeTech, onTechChange }: CodeWindowProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        setDisplayedLines([]);
        setIsTyping(true);

        const currentCode = codeExamples[activeTech];
        let lineIndex = 0;
        let lastTime = 0;
        const interval = 80;

        const animate = (currentTime: number) => {
            if (lastTime === 0) lastTime = currentTime;
            const elapsed = currentTime - lastTime;

            if (elapsed >= interval) {
                if (lineIndex < currentCode.lines.length) {
                    setDisplayedLines(prev => [...prev, currentCode.lines[lineIndex]]);
                    lineIndex++;
                    lastTime = currentTime;
                    animationFrameRef.current = requestAnimationFrame(animate);
                } else {
                    setIsTyping(false);
                }
            } else {
                animationFrameRef.current = requestAnimationFrame(animate);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [activeTech]);

    return (
        <div className="relative hidden lg:block lg:pl-8">
            <div className="relative">
                {/* Code Window */}
                <div className="rounded-xl border-2 border-border bg-gradient-to-br from-card to-card/80 dark:from-card dark:to-card/50 shadow-2xl shadow-primary/10 overflow-hidden backdrop-blur-sm">
                    {/* Window Header */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-muted to-muted/80 dark:from-muted/80 dark:to-muted/50 border-b border-border backdrop-blur-sm">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-sm" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-sm" />
                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-sm" />
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-[10px] font-mono text-muted-foreground">{codeExamples[activeTech].filename}</span>
                        </div>
                    </div>

                    {/* Code Content */}
                    <div className="p-4 text-xs space-y-1.5 bg-gradient-to-br from-background/50 to-muted/30 dark:from-background/30 dark:to-muted/20 h-[320px] overflow-y-auto custom-scrollbar font-mono">
                        {displayedLines.map((line, index) => (
                            <div
                                key={`${activeTech}-${index}`}
                                className="text-muted-foreground whitespace-pre"
                            >
                                {renderCodeLine(line, activeTech)}
                            </div>
                        ))}
                        {isTyping && (
                            <span className="inline-block w-1.5 h-3.5 bg-primary animate-pulse ml-0.5" />
                        )}
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 p-3 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/30">
                    <Code2 className="h-4 w-4" />
                </div>
                <div className="absolute -bottom-3 -left-3 p-3 rounded-lg bg-gradient-to-br from-card to-card/80 dark:from-card dark:to-card/50 border-2 border-border shadow-xl backdrop-blur-sm">
                    <Terminal className="h-4 w-4 text-primary" />
                </div>

                {/* Tech Stack Buttons */}
                <div className="absolute -bottom-6 right-4 flex items-center gap-2">
                    {(['go', 'docker', 'k8s'] as const).map((tech) => (
                        <button
                            key={tech}
                            onClick={() => onTechChange(tech)}
                            className={`px-3 py-1.5 rounded-md border shadow-lg backdrop-blur-sm transition-all ${activeTech === tech
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-card border-border hover:border-primary/50"
                                }`}
                        >
                            <span className="text-[9px] font-semibold">{tech === 'k8s' ? 'K8s' : tech.charAt(0).toUpperCase() + tech.slice(1)}</span>
                        </button>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--primary) / 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--primary) / 0.5);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--primary) / 0.3) transparent;
        }
      `}</style>
        </div>
    );
});
