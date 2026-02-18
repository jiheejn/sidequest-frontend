"use client"

import { ReactNode } from "react"

interface FilterButtonProps {
    onClick: () => void
    isActive: boolean
    children: ReactNode
}

export function FilterButton({ onClick, isActive, children }: FilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors
                ${
                isActive
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }
            `}
        >
            {children}
        </button>
    )
}
