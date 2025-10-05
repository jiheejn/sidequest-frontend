import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
})
//굳이 왜 이걸 파일 따로만들어서 추출함? 그냥 해당 파일에서 임포트 하면 안됨?
// 편의 함수들 export
export const {
    signIn,
    signUp,
    signOut,
    useSession,
} = authClient

// export default function AuthClientPage(){
//     const [isSignIn, setIsSignIn] = useState(true);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     const router = useRouter();
//     const searchParams = useSearchParams();
//
//     const handleSocialAuth
// }