import {Post} from "@/types/post";

const BASE_URL = 'http://localhost:8080/api';

//SoC: api.ts 에서는 fetch data에만 집중하며 가져온 데이터가 화면에서 어떻게 표시될지(UI 상태)에는 전혀 관여하지않음
//재사용성: Next.js의 서버컴포넌트, 클라이언트 컴포넌트, 혹은 React의 외부 환경 등 어디서든 호출되야하기 때문에 React의 Hook을 포함해서는 안됨
type SortType = 'latest' | 'views';

export async function getPosts(
    boardType: string,
    sortBy: SortType = 'latest',
    filterStatus?: 'open' // 👈 필터 상태 인자 추가
    ): Promise<Post[]>{
    try {
        // 1. URL 쿼리 파라미터 구성
        const params = new URLSearchParams({
            board: boardType,
            sort: sortBy
        });

        if (filterStatus) {
            // filterStatus가 있으면 쿼리 파라미터에 추가
            params.append('status', filterStatus);
        }

        const url = `${BASE_URL}/posts?${params.toString()}`;
        const response = await fetch(url, {cache: 'no-store'});

        if(!response.ok){
            throw new Error(`Failed to fetch posts for ${boardType}: HTTP ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching posts for ${boardType}:`, error);
        return [];
    }
}
// ----------------------------------------------------
// 2. 단일 게시물 가져오기 (새로 추가)
// ----------------------------------------------------
/**
 * 특정 ID의 게시물 상세 정보를 가져오는 함수
 * @param postId 게시물 ID
 * @returns 게시물 객체
 */
export async function getPostDetail(postId: number): Promise<Post|null>{
    try{
        const url = `${BASE_URL}/posts/${postId}`;
        // Next.js의 fetch는 자동으로 서버에서 동작하며 캐싱 및 재검증 기능이 내장되어 있습니다.
        const response = await fetch(url, {
            cache: 'no-store'});
        // 캐싱 옵션 설정: 'no-store'는 매번 요청 시 최신 데이터를 가져옵니다.
        // revalidate: 60 을 사용하면 60초마다 데이터를 갱신합니다.
        if(response.status===404){
            //no post?
            return null;
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching post detail for ID ${postId}:`, error);
        // 오류 발생 시 빈 배열 반환 또는 오류 페이지 렌더링을 고려할 수 있습니다.
        return null;
    }
}

