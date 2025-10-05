// useAuth Hook
// 역할: Better-auth session을 react에서 쉽게 사용할 수 있게 해주는 훅
//
// 작동 방식:
// 1. useSession()이 자동으로 쿠키에서 세션 토큰을 읽은
// 2. 서버에 세션 정보 요청 (/api/auth/session)
// 3. session이 유효하면 사용자 정보 반환
// 4. 페이지 이동해도 쿠키 있으면 자동으로 로그인 상태유지
// 쿠키 브라우저에 저장(HttpOnly) - JavaScript로 접근 불가, 보안
// 세션 Postgresql session table에 저장

import {useSession} from "@/lib/auth-client"

export function useAuth(){
    const { data: session, isPending, error} = useSession()

    return{
        user: session?.user ?? null,
        isLoading: isPending,
        isAuthenticated: !!session?.user,
        error,
    }
}