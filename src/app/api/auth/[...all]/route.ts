import {toNextJsHandler} from "better-auth/next-js";
import {auth} from "@/lib/auth";
//capture to array every path segment after /auth
//api/auth/callback/google -> ['callback', 'google']
//Catch-all Segment. Single Entry Point
//인증과 관련된 모든 API요청은 이 파일로 들어와서 toNextJsHandler라이브러리에 의해 처리된다
//auth->initailize auth config
export const {GET, POST} = toNextJsHandler(auth)