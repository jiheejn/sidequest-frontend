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
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked|| false);
    const [isBookmarking, setIsBookmarking] = useState(false);
    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: enUS });
    //const router = useRouter();
    const user = useAuthStore((state) => state.user);

    const handleBookmarkClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            alert("Please login to bookmark posts");
            return;
        }
        // 즉시 UI 업데이트 (낙관적)
        setIsBookmarked(!isBookmarked);

        try {
            await bookmarkApi.toggleBookmark(post.id);
            // 성공! 이미 UI 업데이트됨
        } catch (error) {
            // 실패 시 원래대로 되돌림
            setIsBookmarked(isBookmarked);
            console.error("Bookmark failed:", error);
        }

        // if (isBookmarking) return;
        //
        // setIsBookmarking(true);
        // try {
        //     if (onBookmarkToggle) {
        //         await onBookmarkToggle(post.id);
        //     }
        // } catch (error) {
        //     console.error("Bookmark toggle failed:", error);
        // } finally {
        //     setIsBookmarking(false);
        // }
    };

    return (
        <Link href={`/posts/${post.id}`} className="block group">
            <div className="
                relative p-6 bg-card rounded-lg border border-border/10
                shadow-lg shadow-black/20
                transition-all duration-300 ease-in-out
                md:hover:bg-accent/10 md:hover:border-primary/30
                md:hover:scale-[1.02]
            ">
                {/* 북마크 버튼 - 오른쪽 상단 */}
                <button
                    onClick={handleBookmarkClick}
                    disabled={isBookmarking}
                    className="
                        absolute top-4 right-4 p-2 rounded-full
                        transition-all duration-200
                        hover:bg-accent/20
                        disabled:opacity-50 disabled:cursor-not-allowed
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
                    {/* Position 뱃지 */}
                    <span className="
                        inline-block px-3 py-1 rounded-full text-xs font-semibold
                        bg-secondary text-secondary-foreground
                        transition-colors group-hover:bg-secondary/80
                    ">
                        {post.position.name}
                    </span>
                    {/* Tags 뱃지 (최대 3개 정도만 표시) */}
                    {post.tags?.slice(0, 4).map(tag => (
                        <span key={tag.id} className="
                            inline-block px-3 py-1 rounded-full text-xs font-medium
                            bg-muted text-muted-foreground
                            transition-colors group-hover:bg-muted/70
                        ">
                            {tag.name}
                        </span>
                    ))}
                    {/* 태그가 3개보다 많으면 + 표시 */}
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
                    {/* 작성자 정보 */}
                    <div className="flex items-center gap-2">
                        {/* Author Image (Avatar) */}
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
                            {post.author.image ? (
                                <img
                                    src={post.author.image}
                                    alt={post.author.nickname}
                                    className="h-full w-full object-cover"
                                    width={24} height={24}
                                />
                            ) : (
                                <span className="text-xs font-semibold text-primary">
                                    {post.author.nickname[0].toUpperCase()}
                                </span>
                            )}
                        </div>
                        {/* Author Nickname */}
                        <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                            {post.author.nickname}
                        </span>
                    </div>

                    {/* 메타데이터 (시간, 조회수, 댓글 수) */}
                    <div className="flex items-center gap-4">
                        {/* Created At */}
                        <span>{timeAgo}</span>
                        {/* Views */}
                        <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.viewCount}
                        </span>
                        {/* Comments */}
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