"use client"

import Link from "next/link"
import {Bookmark, Eye, MessageSquare} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/app/store/authStore";
import {RecruitStatusBadge} from "@/components/RecruitStatusBadge";
import {bookmarkApi} from "@/lib/api-client";
//독일 시간 기준으로 만들건데 페이지는 영어여야함!

// 백엔드 PostListDto와 일치하는 타입 정의
interface PostListDto {
    id: number;
    title: string;
    recruitStatus?: 'OPEN' | 'CLOSED'; // 백엔드 DTO에 있다면 추가
    position: { id: number; name: string };
    tags: { id: number; name: string }[];
    author: {
        userId: number; // author_id 대신 userId 사용 (백엔드 DTO 기준)
        nickname: string;
        image?: string; // author_image 대신 image 사용 (백엔드 DTO 기준)
    };
    viewCount: number; // 백엔드 타입이 Long이면 number로 충분
    commentCount: number; // 백엔드 타입이 Integer면 number로 충분
    createdAt: string; // ISO String format
    isBookmarked?: boolean;//북마크
}

interface PostListItemProps {
    post: PostListDto
    //onBookmarkToggle?: (postId:number) => void
}

export function PostListItem({ post }: PostListItemProps) {
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
    const [isBookmarking, setIsBookmarking] = useState(false);
    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: enUS });
    const user = useAuthStore((state) => state.user);

    const handleBookmarkClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert("Please login to bookmark posts");
            return;
        }

        setIsBookmarked(!isBookmarked);

        try {
            await bookmarkApi.toggleBookmark(post.id);
        } catch (error) {
            setIsBookmarked(isBookmarked);
            console.error("Bookmark failed:", error);
        }
    };

    return (
        <Link href={`/posts/${post.id}`} className="block group">
            <div className="
                relative p-6 bg-card rounded-md
                border-2 border-border
                shadow-[3px_3px_0px_0px] shadow-border/20
                transition-all duration-150 ease-in-out
                hover:shadow-[1px_1px_0px_0px] hover:shadow-border/20 hover:translate-x-[2px] hover:translate-y-[2px]
            ">
                {/* 북마크 버튼 */}
                <button
                    onClick={handleBookmarkClick}
                    disabled={isBookmarking}
                    className="
                        absolute top-4 right-4 p-2 rounded-md
                        transition-all duration-150
                        hover:bg-primary/10
                        disabled:opacity-50 disabled:cursor-not-allowed
                        z-10
                    "
                    aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                >
                    <Bookmark
                        className={`h-5 w-5 transition-colors ${
                            isBookmarked
                                ? "fill-primary text-primary"
                                : "text-muted-foreground hover:text-primary"
                        }`}
                    />
                </button>

                {/* 상단: 포지션 및 태그 */}
                <div className="mb-4 flex flex-wrap items-center gap-2 pr-12">
                    <RecruitStatusBadge status={post.recruitStatus || 'OPEN'} />
                    <span className="
                        inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide
                        bg-secondary/20 text-secondary border border-secondary/40
                    ">
                        {post.position.name}
                    </span>
                    {post.tags?.slice(0, 4).map(tag => (
                        <span key={tag.id} className="
                            inline-block px-3 py-1 rounded-md text-xs font-medium
                            bg-muted text-muted-foreground border border-border
                        ">
                            {tag.name}
                        </span>
                    ))}
                    {post.tags?.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                            +{post.tags.length - 3} more
                        </span>
                    )}
                </div>

                {/* 중앙: 제목 */}
                <h2 className="
                    mb-4 text-xl font-bold text-foreground
                    line-clamp-2
                    transition-colors group-hover:text-primary
                ">
                    {post.title}
                </h2>

                {/* 하단: 작성자 정보 및 메타데이터 */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
                            {post.author.image ? (
                                <img
                                    src={post.author.image}
                                    alt={post.author.nickname}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-xs font-semibold text-primary">
                                    {post.author.nickname[0].toUpperCase()}
                                </span>
                            )}
                        </div>
                        <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                            {post.author.nickname}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span>{timeAgo}</span>
                        <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.viewCount}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {post.commentCount}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
