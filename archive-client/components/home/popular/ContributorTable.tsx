"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { contributors } from "./data";

export function ContributorTable() {
    return (
        <div className="rounded-md bg-card/50 border border-gray-200 dark:border-white/10 backdrop-blur-md overflow-hidden shadow-lg">
            <Table className="w-full text-sm">
                <TableHeader className="bg-muted/80 border-b border-white/10">
                    <TableRow>
                        <TableHead className="p-4 font-bold text-center text-foreground uppercase tracking-widest text-[10px]">
                            Rank
                        </TableHead>
                        <TableHead className="p-4 font-bold text-left text-foreground uppercase tracking-widest text-[10px]">
                            Name
                        </TableHead>
                        <TableHead className="p-4 font-bold text-left text-foreground uppercase tracking-widest text-[10px]">
                            Points
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {contributors.map((contributor) => (
                        <TableRow
                            key={contributor.rank}
                            className="border-b border-gray-200 last:border-0 dark:border-white/10 transition-colors"
                        >
                            <TableCell className="p-4 font-medium text-center">
                                {contributor.rank <= 3 ? (
                                    <span className="text-xl">
                                        {contributor.rank === 1 && "🥇"}
                                        {contributor.rank === 2 && "🥈"}
                                        {contributor.rank === 3 && "🥉"}
                                    </span>
                                ) : (
                                    <span className="font-mono">{contributor.rank}</span>
                                )}
                            </TableCell>

                            <TableCell className="p-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 border border-primary/20">
                                        <AvatarImage src={contributor.avatar} />
                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                            {contributor.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="font-medium">{contributor.name}</span>
                                </div>
                            </TableCell>

                            <TableCell className="p-4 font-mono font-bold text-primary">
                                {contributor.points}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
