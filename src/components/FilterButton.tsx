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
                shrink-0 rounded-full px-5 py-2 text-sm font-medium transition-all duration-200
                ${
                isActive
                    ? // 활성 상태: Primary 색상으로 "켜짐"
                    "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : // 비활성 상태: "유리" 느낌
                    "border border-white/10 bg-white/5 backdrop-blur-sm text-text/80 hover:bg-white/10 hover:text-text"
            }
            `}
        >
            {children}
        </button>
    )
}