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
        <nav className="sticky top-0 z-50 w-full border-b-2 border-border bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="font-logo text-3xl tracking-tighter text-primary hover:text-secondary transition-colors"
                    >
                        Giggles
                    </Link>

                    {/* Right - Navigation */}
                    <div className="flex items-center gap-3">
                        {/* Find Project Link */}
                        <Link
                            href="/posts"
                            className="px-4 py-2 text-sm font-bold uppercase tracking-wide text-foreground
                                     hover:text-primary transition-colors"
                        >
                            Find Project
                        </Link>

                        {/* New Project Button */}
                        <button
                            onClick={handleNewPost}
                            className="flex items-center gap-2 px-3 py-2 rounded-md
                                     bg-transparent border-2 border-primary text-primary text-sm font-bold uppercase tracking-wide
                                     shadow-[2px_2px_0px_0px] shadow-primary/30
                                     hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
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
                                    className="px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wide
                                             border-2 border-border text-foreground
                                             hover:border-primary hover:text-primary transition-all"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 rounded-md text-sm font-bold uppercase tracking-wide
                                             bg-primary text-primary-foreground border-2 border-primary/60
                                             shadow-[2px_2px_0px_0px] shadow-primary/30
                                             hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150"
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
