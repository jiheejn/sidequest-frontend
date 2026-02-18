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
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    <Link
                        href="/"
                        className="font-logo text-2xl tracking-tight text-foreground hover:opacity-70 transition-opacity"
                    >
                        Giggles
                    </Link>

                    <div className="flex items-center gap-1">
                        <Link
                            href="/posts"
                            className="px-3 py-1.5 text-sm text-muted-foreground
                                     hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
                        >
                            Find Project
                        </Link>

                        <button
                            onClick={handleNewPost}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                                     text-sm text-muted-foreground
                                     hover:text-foreground hover:bg-secondary transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">New Project</span>
                        </button>

                        <div className="w-px h-5 bg-border mx-1" />

                        {isAuthenticated ? (
                            <AvatarDropdown />
                        ) : (
                            <div className="flex items-center gap-1">
                                <Link
                                    href="/login"
                                    className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground
                                             hover:text-foreground hover:bg-secondary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium
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
