// src/app/teamup/components/TeamupFilter.tsx
'use client'; // 🚨 클라이언트 컴포넌트

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const RecruitStatusFilter: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 현재 URL의 status 쿼리 파라미터를 가져옴
    const currentStatus = searchParams.get('status');
    const isShowingOpen = currentStatus === 'open';

    const toggleFilter = () => {
        const newParams = new URLSearchParams(searchParams.toString());

        if (isShowingOpen) {
            // 필터 해제: status 파라미터 제거
            newParams.delete('status');
        } else {
            // 필터 적용: status=open 추가
            newParams.set('status', 'open');
        }

        // 새로운 URL로 이동하여 페이지를 리로드 (서버 컴포넌트 재실행 유도)
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <div className="flex justify-end mb-4">
            <button
                onClick={toggleFilter}
                className={`px-4 py-2 rounded-lg transition duration-200 font-medium ${
                    isShowingOpen
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
                {isShowingOpen ? '✅ 전체 글 보기' : '모집 중인 글만 보기'}
            </button>
        </div>
    );
};