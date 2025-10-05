// src/app/components/BoardPage.tsx
import React from 'react';
import {PostCard} from '@/components/PostCard';
import { Post } from '@/types/post'; // Post 타입 임포트 가정

// BoardPage는 게시물 목록을 Prop으로 받습니다.
interface BoardPageProps {
    title: string;
    description: string;
    posts: Post[];
    basePath: string;
}

export const BoardPage: React.FC<BoardPageProps> = ({ title, description, posts, basePath }) => {
    return (
        <div className="container mx-auto p-4 md:p-8">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
                <p className="text-lg text-gray-600 mt-2">{description}</p>
            </header>

            <main className="space-y-4">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        // PostCard에 모든 Post 데이터를 전달합니다.
                        // PostCard 내부에서 teamup 게시판인지 확인하고 recruitStatus를 표시합니다.
                        <PostCard
                            excerpt={""} author={""} date={""} key={post.id}
                            {...post}
                            href={`${basePath}/${post.id}`}
                            // PostCard는 boardType에 따라 recruitStatus를 표시할지 결정합니다.
                            // 모든 Post에 recruitStatus가 undefined일 수 있으므로 이를 타입 헬퍼로 전달
                            recruitStatus={post.recruitStatus}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 py-10">아직 등록된 게시물이 없습니다.</p>
                )}
            </main>
        </div>
    );
};