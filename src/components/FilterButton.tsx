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
                shrink-0 rounded-md px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition-all duration-150
                border-2
                ${
                isActive
                    ? "bg-primary text-primary-foreground border-primary/60 shadow-[2px_2px_0px_0px] shadow-primary/25"
                    : "bg-muted/40 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }
            `}
        >
            {children}
        </button>
    )
}
