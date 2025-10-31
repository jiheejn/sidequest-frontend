"use client"
//필터버튼 클릭했을때 URL Update 액션들
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";

export function useFilterActions(){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateURL = useCallback((newParams: Record<string, string | string[] | null>) =>{
        const currentParams = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            currentParams.delete(key);
            if(Array.isArray(value) && value.length >0) {
                value.forEach(v=>currentParams.append(key, v));
            } else if (value && !Array.isArray(value)){
                currentParams.set(key, value);
            }
        });
        if(!('page' in newParams)){
            currentParams.set('page', '1');
        }
        router.push(`${pathname}?${currentParams.toString()}`);
    }, [searchParams, router, pathname]);

    const handleTagToggle = useCallback((tagId: number) => {
        const currentTags = searchParams.getAll("tagIds").map(Number);
        const newTags = currentTags.includes(tagId)
            ? currentTags.filter(id => id !==tagId)
            : [...currentTags, tagId];
        updateURL({tagIds: newTags.map(String)});
    }, [searchParams, updateURL]);

    const handlePositionChange = useCallback((positionId: number | null) => {
        updateURL({ positionId: positionId ? String(positionId) : null }); // 백엔드 파라미터 이름 사용
    }, [updateURL]);

    const handleClearStacks = useCallback(() => {
        updateURL({ tagIds: null }); // 백엔드 파라미터 이름 사용
    }, [updateURL]);

    const handleShowOpenOnlyChange = useCallback((value: boolean) => {
        // value가 true면 OPEN만, false면 전체(파라미터 없음)
        updateURL({ status: value ? 'OPEN' : null });
    }, [updateURL]);

    const showOpenOnly = searchParams.get("status") === 'OPEN';

    return { handleTagToggle, handlePositionChange, handleClearStacks,
        handleShowOpenOnlyChange, showOpenOnly };
}
