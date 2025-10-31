"use client"

import { useState, useEffect } from "react"
import { positionApi, tagApi } from "@/lib/api-client"

export interface Tag {
    id: number
    name: string
}

export interface Position {
    id: number
    name: string
}

export function usePostFormData() {
    const [tags, setTags] = useState<Tag[]>([])
    const [positions, setPositions] = useState<Position[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const loadData = async () => {
            try {
                const [tagsData, positionsData] = await Promise.all([
                    tagApi.getAllTags(),
                    positionApi.getAllPositions(),
                ])
                setTags(tagsData as Tag[])
                setPositions(positionsData as Position[])
            } catch (err) {
                console.error("Failed to load tags/positions:", err)
                setError("Could not load necessary data. Please try again later.")
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    return { tags, positions, isLoading, error }
}