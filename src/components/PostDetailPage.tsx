import {Post} from "@/types/post";

interface PostDetailPageProps {
    //렌더링할 데이터
    post: Post;
    //teamup에만 필요한 추가 UI 위한 slot
    headerExtra?: React.ReactNode;
    //recruitStatus?: 'open' | 'close';
}

export const PostDetailPage: React.FC<PostDetailPageProps>=({post, headerExtra})=>{
    return (
        <div className="container mx-auto p-4 md:m-8">
            <header className="mb-6 border-b pb-4">
                {/* 게시물 제목과 추가 UI(예: 모집 상태 뱃지) */}
                <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
                    {/*teamup 'open|closed' ui*/}
                    {headerExtra}
                </div>

                <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>author: {post.authorNickname}</span>
                    <span>views: {post.views} | comments: {post.comments} | createAt: {post.createdAt}</span>
                </div>
            </header>

            <main className="prose lg:prose-lg max-w-none mb-10">
                <p className="whitespace-pre-wrap">????</p>
            </main>

            <div className="flex justify-end">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    to list
                </button>
            </div>
        </div>
    )
}