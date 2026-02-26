import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileViewAllButtonProps {
    href: string;
    text: string;
}

export function MobileViewAllButton({ href, text }: MobileViewAllButtonProps) {
    return (
        <div className="mt-6 sm:hidden">
            <Button variant="outline" asChild className="w-full h-10 rounded-lg border-2">
                <Link href={href}>
                    {text}
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                </Link>
            </Button>
        </div>
    );
}
