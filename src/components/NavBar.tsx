"use client"

import Link from "next/link"
import { useAuthStore } from "@/app/store/authStore"
import { AvatarDropdown } from "@/components/AvatarDropdown"

/**
 * NavBar — Swiss Bauhaus data-grid style
 *
 * A single horizontal row divided into cells by thin vertical borders.
 * Sharp 90° corners, monochromatic palette, flat 2D vector aesthetic.
 * Hover fills the cell with a slate-grey background sliding left→right.
 */
export function NavBar() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-foreground bg-background">
            <div className="grid grid-cols-[1fr_1fr_1fr] h-12">
                {/* ── Cell: Home ── */}
                <Link
                    href="/"
                    className="group relative flex items-center justify-center
                               border-r border-foreground overflow-hidden"
                >
                    {/* hover fill – slides in from the left */}
                    <span
                        className="pointer-events-none absolute inset-0 origin-left scale-x-0
                                   bg-foreground/10 transition-transform duration-300 ease-out
                                   group-hover:scale-x-100"
                        aria-hidden="true"
                    />
                    <span className="relative z-10 text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground">
                        Home
                    </span>
                </Link>

                {/* ── Cell: About ── */}
                <Link
                    href="/posts"
                    className="group relative flex items-center justify-center
                               border-r border-foreground overflow-hidden"
                >
                    <span
                        className="pointer-events-none absolute inset-0 origin-left scale-x-0
                                   bg-foreground/10 transition-transform duration-300 ease-out
                                   group-hover:scale-x-100"
                        aria-hidden="true"
                    />
                    <span className="relative z-10 text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground">
                        About
                    </span>
                </Link>

                {/* ── Cell: Login / Avatar ── */}
                {isAuthenticated ? (
                    <div className="flex items-center justify-center">
                        <AvatarDropdown />
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="group relative flex items-center justify-center overflow-hidden"
                    >
                        <span
                            className="pointer-events-none absolute inset-0 origin-left scale-x-0
                                       bg-[oklch(0.55_0_0)] transition-transform duration-300 ease-out
                                       group-hover:scale-x-100"
                            aria-hidden="true"
                        />
                        <span className="relative z-10 text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground
                                         transition-colors duration-300 group-hover:text-background">
                            Login
                        </span>
                    </Link>
                )}
            </div>
        </nav>
    )
}
