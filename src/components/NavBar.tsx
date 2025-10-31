// components/Navbar.tsx
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/authStore"
import { AvatarDropdown } from "@/components/AvatarDropdown"
import { Plus } from "lucide-react"

export function NavBar() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const handleNewPost = () => {
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }
        router.push("/posts/new");
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left - Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                        SideQuest
                    </Link>

                    {/* Right - Navigation */}
                    <div className="flex items-center gap-4">
                        {/* TeamBuild Link */}
                        <Link
                            href="/posts"
                            className="px-4 py-2 text-sm font-medium text-foreground
                                     hover:text-primary transition-colors"
                        >
                            TeamBuild
                        </Link>

                        {/* Create Post Button (Always visible) */}
                        <button
                            onClick={handleNewPost}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg
                                     bg-primary text-primary-foreground font-medium
                                     hover:bg-primary/90 transition-all duration-200
                                     shadow-sm hover:shadow-md"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">New Post</span>
                        </button>

                        {/* Auth Buttons / Avatar Dropdown */}
                        {isAuthenticated ? (
                            <AvatarDropdown />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 text-sm font-medium text-foreground
                                             hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 rounded-lg text-sm font-medium
                                             bg-primary text-primary-foreground
                                             hover:bg-primary/90 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}