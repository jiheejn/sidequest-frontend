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
                            className="group relative px-4 py-2 text-sm font-medium text-foreground overflow-hidden"
                        >
                            <span className="relative z-10">
                                <span className="bg-[linear-gradient(#a1f27b,#a1f27b)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-400 ease-out group-hover:bg-[length:100%_2px] pb-0.5">
                                    Find Project
                                </span>
                            </span>
                        </Link>

                        {/* New Project Button */}
                        <button
                            onClick={handleNewPost}
                            className="group relative flex items-center gap-2 px-3 py-2 rounded-lg
                                     bg-transparent border border-foreground/50 text-foreground text-sm font-medium
                                     overflow-hidden transition-all duration-200"
                        >
                            <span
                                className="absolute inset-0 bg-[#a1f27b] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 rounded-lg"
                                aria-hidden="true"
                            />
                            <Plus className="relative z-10 h-4 w-4" />
                            <span className="relative z-10 hidden sm:inline">
                                <span className="bg-[linear-gradient(#a1f27b,#a1f27b)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px] pb-0.5">
                                    New Project
                                </span>
                            </span>
                        </button>

                        {/* Auth Buttons / Avatar Dropdown */}
                        {isAuthenticated ? (
                            <AvatarDropdown />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="group relative px-4 py-2 rounded-lg text-sm font-medium
                                             bg-foreground text-background
                                             overflow-hidden"
                                >
                                    <span
                                        className="absolute inset-0 bg-[#a1f27b] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 rounded-lg"
                                        aria-hidden="true"
                                    />
                                    <span className="relative z-10">
                                        <span className="bg-[linear-gradient(#a1f27b,#a1f27b)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px] pb-0.5">
                                            Login
                                        </span>
                                    </span>
                                </Link>
                                <Link
                                    href="/signup"
                                    className="group relative px-4 py-2 rounded-lg text-sm font-medium
                                             bg-foreground text-background
                                             overflow-hidden"
                                >
                                    <span
                                        className="absolute inset-0 bg-[#a1f27b] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 rounded-lg"
                                        aria-hidden="true"
                                    />
                                    <span className="relative z-10">
                                        <span className="bg-[linear-gradient(#a1f27b,#a1f27b)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px] pb-0.5">
                                            Sign Up
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
