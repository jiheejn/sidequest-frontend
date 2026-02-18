"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store/authStore"
import { ChevronDown, User, LogOut } from "lucide-react"

export function AvatarDropdown() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    if (!user) return null;

    const handleLogout = async () => {
        await logout();
        router.push("/posts");
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg
                         hover:bg-secondary transition-colors outline-none"
            >
                <div className="h-7 w-7 rounded-full overflow-hidden bg-secondary
                              flex items-center justify-center">
                    {user.image ? (
                        <img
                            src={user.image}
                            alt={user.nickname}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="text-xs font-medium text-foreground">
                            {user.nickname[0].toUpperCase()}
                        </span>
                    )}
                </div>
                <span className="text-sm text-foreground hidden sm:block">
                    {user.nickname}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform
                    ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-xl bg-card border border-border
                              shadow-lg overflow-hidden z-50">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            router.push("/profile");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground
                                 hover:bg-secondary transition-colors"
                    >
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Profile</span>
                    </button>
                    <div className="h-px bg-border" />
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive
                                 hover:bg-secondary transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}
