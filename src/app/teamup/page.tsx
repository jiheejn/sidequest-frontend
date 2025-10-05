// src/app/teamup/page.tsx
// Server Component

import {BoardPage} from '@/components/BoardPage';
import { getPosts } from '@/lib/api';
import { RecruitStatusFilter } from '@/components/RecruitStatusFilter'; // 👈 클라이언트 필터 컴포넌트

// Next.js는 page.tsx에 자동으로 searchParams를 prop으로 주입합니다.
interface TeamupPageProps {
    searchParams: { status?: string }; // URL 쿼리스트링 (예: ?status=open)
}

export default async function TeamupPage({ searchParams }: TeamupPageProps) {
    const boardType = "teamup";

    // URL 쿼리 파라미터에서 모집 상태 필터를 확인하여 API 호출 인자로 변환
    const filterStatus = searchParams.status === 'open' ? 'open' : undefined;

    // 1. 서버에서 데이터 페칭 (filterStatus를 포함하여 요청)
    // 🚨 getPosts(boardType, sortBy, filterStatus) 시그니처를 따른다고 가정
    const teamupPosts = await getPosts(boardType, 'latest', filterStatus);

    const pageTitle = "팀업 게시판";
    const pageDescription = "함께 프로젝트를 할 동료를 찾아보세요.";
    const basePath = "/teamup";

    return (
        <div className="container mx-auto p-4 md:p-8">
            {/* 2. 클라이언트 컴포넌트: 필터링 버튼 (상태 관리 및 URL 변경 담당) */}
            <RecruitStatusFilter />

            {/* 3. 서버 컴포넌트: BoardPage에 필터링된 데이터를 전달하여 렌더링 */}
            <BoardPage
                title={pageTitle}
                description={pageDescription}
                posts={teamupPosts}
                basePath={basePath}
            />
        </div>
    );
}