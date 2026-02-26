"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileBanner } from "./ProfileBanner";
import { ProfileEditForm } from "./ProfileEditForm";
import { ProfileInfoDisplay } from "./ProfileInfoDisplay";
import { ProfileStats } from "./ProfileStats";

export function ProfilePageOptimized() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        full_name: "",
        email: "",
    });

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                full_name: user.full_name || "",
                email: user.email,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        // TODO: Implement profile update API call
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
        }, 1000);
    };

    const handleCancel = () => {
        if (user) {
            setFormData({
                username: user.username,
                full_name: user.full_name || "",
                email: user.email,
            });
        }
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <section className="relative overflow-hidden py-8">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container mx-auto px-6 max-w-6xl">
                <div className="space-y-8">
                    <ProfileHeader isEditing={isEditing} onEditClick={() => setIsEditing(true)} />

                    {/* Profile Card */}
                    <div className="rounded-md bg-card/50 border border-gray-200 dark:border-white/10 backdrop-blur-md shadow-lg overflow-hidden">
                        <ProfileBanner user={user} />

                        <div className="p-8">
                            {isEditing ? (
                                <ProfileEditForm
                                    formData={formData}
                                    isSaving={isSaving}
                                    onChange={handleChange}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                />
                            ) : (
                                <ProfileInfoDisplay user={user} />
                            )}
                        </div>
                    </div>

                    <ProfileStats />
                </div>
            </div>
        </section>
    );
}
