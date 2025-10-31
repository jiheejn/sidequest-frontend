"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    totalPages: number
    className?: string
}

export function Pagination({ totalPages, className }: PaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return

        const currentParams = new URLSearchParams(searchParams.toString())
        currentParams.set("page", String(newPage))
        router.push(`?${currentParams.toString()}`)
    }

    const renderPageNumbers = () => {
        // 페이지네이션 로직 (예: 1... 5, 6, 7 ...10)
        // 여기서는 간단하게 앞뒤 버튼만 구현합니다.
        return null;
    }

    return (
        <div className={`flex items-center justify-center gap-4 ${className}`}>
            <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Page</span>
            </Button>
            <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
            </span>
            <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Page</span>
            </Button>
        </div>
    )
}