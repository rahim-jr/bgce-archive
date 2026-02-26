"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "./mockData";

export function EventsSidebar() {
    return (
        <aside className="hidden xl:block xl:w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-4">
                {/* Upcoming Events */}
                <div className="p-4 rounded-lg border-2 border-primary/20 dark:border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 backdrop-blur-sm">
                    <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        Upcoming Events
                    </h3>
                    <div className="space-y-3">
                        {events.map((event, i) => (
                            <div
                                key={i}
                                className="flex gap-3 p-2 rounded-lg bg-card/50 dark:bg-card/30 hover:bg-card dark:hover:bg-card/50 transition-colors border border-border/50 dark:border-input/30"
                            >
                                <div className="flex flex-col items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-md p-1.5 min-w-[40px] text-primary border border-primary/20">
                                    <span className="text-[8px] font-bold uppercase">{event.date.split(" ")[0]}</span>
                                    <span className="text-sm font-black">{event.date.split(" ")[1].split("-")[0]}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-bold leading-tight mb-1 line-clamp-2">{event.title}</div>
                                    <div className="text-[9px] text-muted-foreground flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-green-500"></span>
                                        {event.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        size="sm"
                        className="w-full mt-3 h-8 text-[10px] font-bold bg-primary/20 hover:bg-primary/30 dark:bg-primary/30 dark:hover:bg-primary/40 text-primary border border-primary/20"
                    >
                        See All Events
                    </Button>
                </div>
            </div>
        </aside>
    );
}
