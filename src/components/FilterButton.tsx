"use client"

interface FilterButtonProps {
    children: React.ReactNode
    onClick: () => void
    isActive: boolean
}

export function FilterButton({ children, onClick, isActive }: FilterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`
                shrink-0 rounded-full px-4 py-1 text-sm font-medium transition-all duration-200
                border
                ${
                isActive
                    ? // 활성 상태: 텍스트와 배경 반전, 테두리도 명확하게
                    "bg-foreground text-background border-foreground"
                    : // 비활성 상태: 아주 연한 테두리, 호버 시 진해짐
                    "bg-white/60 border-border/20 text-muted-foreground hover:border-border hover:text-foreground"
            }
            `}
        >
            {children}
        </button>
    )
}
