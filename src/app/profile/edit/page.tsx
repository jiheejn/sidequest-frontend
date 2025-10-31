// app/profile/edit/page.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/authStore"
import { authApi } from "@/lib/api-client"
import { ArrowLeft, Camera } from "lucide-react"

export default function EditProfilePage() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const updateProfile = useAuthStore((state) => state.updateProfile);

    const [nickname, setNickname] = useState(user?.nickname || "");
    const [imageUrl, setImageUrl] = useState(user?.image || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    if (!user) {
        router.push("/login");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!nickname.trim()) {
            setError("Nickname is required");
            return;
        }

        setIsSubmitting(true);
        try {
            await authApi.updateProfile({
                nickname: nickname.trim(),
                image: imageUrl.trim() || undefined,
            });

            // Zustand store 업데이트
            updateProfile({
                nickname: nickname.trim(),
                image: imageUrl.trim() || undefined,
            });

            router.push("/profile");
        } catch (err: any) {
            setError(err.message || "Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground
                             transition-colors mb-6"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back</span>
                </button>

                {/* Form Card */}
                <div className="bg-card rounded-lg border border-border/10 shadow-lg p-8">
                    <h1 className="text-2xl font-bold text-foreground mb-6">Edit Profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar Preview */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full overflow-hidden bg-primary/20
                                              flex items-center justify-center">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt="Avatar preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-3xl font-bold text-primary">
                                            {nickname[0]?.toUpperCase() || "?"}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 p-2 bg-primary rounded-full">
                                    <Camera className="h-4 w-4 text-primary-foreground" />
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                Profile picture preview
                            </p>
                        </div>

                        {/* Image URL Input */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Profile Image URL
                            </label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border/20
                                         text-foreground placeholder:text-muted-foreground
                                         focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Enter a URL to your profile image
                            </p>
                        </div>

                        {/* Nickname Input */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Nickname *
                            </label>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Enter your nickname"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-background border border-border/20
                                         text-foreground placeholder:text-muted-foreground
                                         focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>

                        {/* Email (Read-only) */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full px-4 py-2 rounded-lg bg-muted border border-border/20
                                         text-muted-foreground cursor-not-allowed"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Email cannot be changed
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 px-6 py-2 rounded-lg border border-border/20
                                         text-foreground font-medium
                                         hover:bg-accent/20 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-2 rounded-lg bg-primary text-primary-foreground
                                         font-medium hover:bg-primary/90 transition-colors
                                         disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}