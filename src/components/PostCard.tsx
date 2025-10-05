// src/app/components/PostCard.tsx
import Link from 'next/link';
// 🚨 RecruitingBadge 컴포넌트가 components 폴더에 있다고 가정합니다.
import { RecruitBadge } from '@/components/RecruitBadge';

// Post 타입에 맞춰 Props를 정의합니다.
interface PostCardProps {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    views: number;
    date: string;
    href: string; // 게시물 상세 페이지 경로

    // 👈 teamup 게시판 전용 필드 (다른 게시판에서는 undefined/null)
    recruitStatus?: 'open' | 'closed';
}

export const PostCard: React.FC<PostCardProps> = ({
                                                      title,
                                                      excerpt,
                                                      author,
                                                      views,
                                                      date,
                                                      href,
                                                      recruitStatus, // recruitStatus를 prop으로 받습니다.
                                                  }) => {
    return (
        <Link href={href} className="block p-4 border rounded-lg hover:shadow-md transition duration-300 bg-white">

            {/* 1. 제목과 뱃지를 함께 표시하는 영역 */}
            <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-xl font-semibold truncate text-gray-800">{title}</h3>

                {/* 2. recruitStatus가 있을 때만 뱃지 표시 (조건부 렌더링) */}
                {recruitStatus && <RecruitBadge status={recruitStatus} />}
            </div>

            {/* 본문 요약 */}
            <p className="text-gray-600 mb-3 line-clamp-2">{excerpt}</p>

            {/* 메타 정보 */}
            <div className="flex justify-between text-sm text-gray-500">
                <span>By {author}</span>
                <div className="flex items-center space-x-3">
                    <span>{date}</span>
                    <span>👀 {views}</span>
                </div>
            </div>
        </Link>
    );
};