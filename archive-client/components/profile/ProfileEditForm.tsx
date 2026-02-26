"use client";

import { User, Mail, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormData {
    username: string;
    full_name: string;
    email: string;
}

interface ProfileEditFormProps {
    formData: FormData;
    isSaving: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

export function ProfileEditForm({
    formData,
    isSaving,
    onChange,
    onSave,
    onCancel,
}: ProfileEditFormProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label
                        htmlFor="username"
                        className="text-sm font-medium flex items-center gap-2 uppercase tracking-wider text-[10px] text-muted-foreground"
                    >
                        <User className="h-4 w-4 text-primary" />
                        Username
                    </label>
                    <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        className="bg-background/50 h-11 border-gray-200 dark:border-white/10"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="full_name"
                        className="text-sm font-medium flex items-center gap-2 uppercase tracking-wider text-[10px] text-muted-foreground"
                    >
                        <User className="h-4 w-4 text-primary" />
                        Full Name
                    </label>
                    <Input
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={onChange}
                        placeholder="Enter your full name"
                        className="bg-background/50 h-11 border-gray-200 dark:border-white/10"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium flex items-center gap-2 uppercase tracking-wider text-[10px] text-muted-foreground"
                    >
                        <Mail className="h-4 w-4 text-primary" />
                        Email
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onChange}
                        className="bg-background/50 h-11 border-gray-200 dark:border-white/10"
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                <Button
                    onClick={onSave}
                    disabled={isSaving}
                    size="sm"
                    className="rounded-xl shadow-lg shadow-primary/20"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </>
                    )}
                </Button>
                <Button
                    onClick={onCancel}
                    variant="outline"
                    disabled={isSaving}
                    size="sm"
                    className="rounded-xl"
                >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                </Button>
            </div>
        </div>
    );
}
