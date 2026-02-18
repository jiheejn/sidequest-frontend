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
        if (!nickname.trim()) { setError("Nickname is required"); return; }

        setIsSubmitting(true);
        try {
            await authApi.updateProfile({
                nickname: nickname.trim(),
                image: imageUrl.trim() || undefined,
            });
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
            <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground
                             transition-colors mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                </button>

                <div className="bg-card rounded-xl border border-border p-8">
                    <h1 className="text-lg font-semibold text-foreground mb-6">Edit Profile</h1>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Avatar Preview */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="h-20 w-20 rounded-full overflow-hidden bg-secondary
                                              flex items-center justify-center">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Avatar preview"
                                             className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-2xl font-semibold text-foreground">
                                            {nickname[0]?.toUpperCase() || "?"}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 p-1.5 bg-foreground rounded-full">
                                    <Camera className="h-3 w-3 text-background" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Profile Image URL
                            </label>
                            <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm
                                         text-foreground placeholder:text-muted-foreground
                                         focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-ring/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Nickname *
                            </label>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="Enter your nickname"
                                required
                                className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm
                                         text-foreground placeholder:text-muted-foreground
                                         focus:outline-none focus:border-foreground/30 focus:ring-1 focus:ring-ring/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm
                                         text-muted-foreground cursor-not-allowed"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Email cannot be changed
                            </p>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium
                                         text-foreground hover:bg-secondary transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground
                                         text-sm font-medium hover:bg-primary/90 transition-colors
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
