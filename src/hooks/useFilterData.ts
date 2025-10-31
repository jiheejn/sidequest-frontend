//fetch Tags and Positions Data
"use client"

import {useEffect, useState} from "react";
import {positionApi, tagApi} from "@/lib/api-client";

interface Tag {
    id: number;
    name: string;
}

interface Position {
    id: number;
    name: string;
}
//하는 일: 최초호출될때 한번 백앤드에서 tags positions data를 fetch해 온다
export function useFilterData(){
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [allPositions, setAllPositions] = useState<Position[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    useEffect(()=>{
        const loadFilterData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const[tagsData, positionsData] = await Promise.all([
                    tagApi.getAllTags(),
                    positionApi.getAllPositions(),
                ]);
                setAllTags(tagsData as Tag[]);
                setAllPositions(positionsData as Position[]);
            } catch (err) {
                console.error("Failed to load filter data:", err);
                setError("Could not load filter options.");
            } finally {
                setIsLoading(false);
            }
        };
        loadFilterData();
    },[]);//컴포넌트 로드될때 최초 1회실행
    return {allTags, allPositions, isLoading, error};
}