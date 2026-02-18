// components/AvatarDropdown.tsx
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

    // 외부 클릭 감지
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
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg
                         hover:bg-accent/20 transition-colors outline-none"
            >
                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary flex items-center justify-center">
                    {user.image ? (
                        <img src={user.image} alt={user.nickname} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-sm font-bold text-secondary-foreground">
                            {user.nickname[0].toUpperCase()}
                        </span>
                    )}
                </div>
                {/* Name */}
                <span className="text-sm font-medium text-foreground hidden sm:block">
                    {user.nickname}
                </span>
                {/* Arrow */}
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-card border border-border/50 shadow-lg py-1 z-50">
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            router.push("/profile");
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground
                                 hover:bg-accent/20 transition-colors"
                    >
                        <User className="h-4 w-4 text-muted-foreground" />
                        Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-destructive
                                 hover:bg-accent/20 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
