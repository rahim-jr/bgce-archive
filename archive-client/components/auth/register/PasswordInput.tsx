"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    icon?: React.ReactNode;
    required?: boolean;
}

export function PasswordInput({
    id,
    name,
    value,
    onChange,
    label,
    icon,
    required = false,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
            >
                {icon || <Lock className="h-4 w-4 text-muted-foreground" />}
                {label}
            </label>
            <div className="relative">
                <Input
                    id={id}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className="bg-background/50 pr-10 h-11 focus-visible:ring-primary/30 transition-all border-border/60 hover:border-primary/50"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                        {showPassword ? "Hide password" : "Show password"}
                    </span>
                </Button>
            </div>
        </div>
    );
}
