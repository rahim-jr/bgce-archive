"use client";

import { Input } from "@/components/ui/input";

interface FormFieldProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    required?: boolean;
}

export function FormField({
    id,
    name,
    type,
    label,
    placeholder,
    value,
    onChange,
    icon,
    required = false,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
            >
                {icon}
                {label}
            </label>
            <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                className="bg-background/50 h-11 focus-visible:ring-primary/30 transition-all border-border/60 hover:border-primary/50"
            />
        </div>
    );
}
