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
        <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="font-logo text-3xl tracking-tighter text-foreground hover:text-muted-foreground transition-colors"
                    >
                        Giggles
                    </Link>

                    {/* Right - Navigation */}
                    <div className="flex items-center gap-4">
                        {/* Find Project Link */}
                        <Link
                            href="/posts"
                            className="px-4 py-2 text-sm font-medium text-foreground
                                     hover:text-primary transition-colors"
                        >
                            Find Project
                        </Link>

                        {/* New Project Button */}
                        <button
                            onClick={handleNewPost}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg
                                     bg-transparent border border-foreground/50 text-foreground text-sm font-medium
                                     hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-200"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">New Project</span>
                        </button>

                        {/* Auth Buttons / Avatar Dropdown */}
                        {isAuthenticated ? (
                            <AvatarDropdown />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="px-4 py-2 rounded-lg text-sm font-medium
                                             bg-foreground text-background /* 흰색 배경, 검은 글씨 */
                                             hover:bg-foreground/80 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 rounded-lg text-sm font-medium
                                             bg-primary text-primary-foreground /* 보라색 배경, 흰 글씨 */
                                             hover:bg-primary/80 transition-colors"
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