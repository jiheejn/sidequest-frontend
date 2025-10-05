import {notFound} from "next/navigation";
import {getPostDetail} from "@/lib/api";
import {RecruitBadge} from "@/components/RecruitBadge";
import {PostDetailPage} from "@/components/PostDetailPage";

//이거 굳이 왜 인터페이스?????
interface PostDetailPageProps{
    //Next.js 동적 라우팅 파라미터 타입 정의
    params: {
        postId: string; //URL에서 오는 값은 항상 문자열!
    };
}

export default async function TeamUpPostDetailPage({params}: PostDetailPageProps){
    //1. URL 파라미터에서 postId를 추출하고 숫자로 변환 radix:10 10진법
    const postId = parseInt(params.postId, 10);

    if(isNaN(postId)) {
        //ID is not a number? -> 404 page redirect
        notFound();
    }
    //2. async fetch data from server
    const post = await getPostDetail(postId);

    if(!post){
        //post not exist
        notFound();
    }
    const status = post.recruitStatus as 'open' | 'closed' | undefined;
    //모집상태 ui결정
    const recruitingUI = status ? (
        <RecruitBadge status={status}/>
    ) : null;

    return (
        <PostDetailPage
            post={post}
            headerExtra={recruitingUI}
        />
    );
}