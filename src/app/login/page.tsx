// "use client";
//
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { FaGoogle, FaGithub } from "react-icons/fa";
// import {FcGoogle} from "react-icons/fc";
// import {PiRabbitFill} from "react-icons/pi";
// import {authClient, signIn} from "@/lib/auth-client";
// import {socialProviders} from "better-auth/social-providers";
// import {getAccessToken} from "better-auth/api";
// import {useRouter} from "next/navigation";
// import {useState} from "react";
//
// export default function LoginPage() {
//     const router = useRouter()
//     const [isLoading, setIsLoading] = useState(false)
//     const [email, setEmail] = useState("")
//     const [name, setName] = useState("")
//     const [password, setPassword] = useState("")
//     const [error, setError] = useState("")
//
//
//     // const handleLogin = (provider: string) => {
//     //     window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
//     // };
//     const handleEmailLogin = async () => {
//         const { data, error } = await authClient.signUp.email({
//             email, // user email address
//             password, // user password -> min 8 characters by default
//             name, // user display name
//             //image, // User image URL (optional)
//             callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
//         }, {
//             onRequest: (ctxw) => {
//                 //show loading
//             },
//             onSuccess: (ctx) => {
//                 //redirect to the dashboard or sign in page
//             },
//             onError: (ctx) => {
//                 // display the error message
//                 alert(ctx.error.message);
//             },
//         });
//     }
//
//     const gitHubSignIn = async () => {
//         const data = await authClient.signIn.social({
//             provider: "github"
//         })
//     }
//     const googleSignIn = async ()=>{
//         const data = await authClient.signIn.social({
//             provider: "google",
//         })
//     }
//
//     return (
//         <div className="flex min-h-screen items-center justify-center">
//             <Card className="w-96 shadow-lg items-center justify-center">
//                 <CardContent className=" p-8 text-center items-center justify-center">
//                     <h1 className="w-full flex gap-1 text-black text-2xl font-mono mb-6">
//                         <PiRabbitFill size={30}/>SideQuest</h1>
//                     <p className="text-gray-500 text-lg font-mono mb-6">Sign In</p>
//
//                     <div className="space-y-4">
//                         <Button
//                             onClick={() => googleSignIn()}
//                             className="font-sans w-full flex items-center gap-3 bg-white hover:bg-gray-100 text-black border-2 border-gray-100"
//                         >
//                             <FcGoogle size={18} />
//                             Login with Google
//                         </Button>
//
//                         <Button
//                             onClick={() => gitHubSignIn()}
//                             className="font-sans w-full flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white"
//                         >
//                             <FaGithub size={18} />
//                             Login with GitHub
//                         </Button>
//                     </div>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }
import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"
import { SocialButtons } from "@/components/auth/SocialButtons"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg p-8 space-y-6">
                    {/* 헤더 */}
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold">로그인</h1>
                        <p className="text-sm text-muted-foreground">
                            계정에 로그인하여 계속하세요
                        </p>
                    </div>

                    {/* 이메일 로그인 폼 */}
                    <LoginForm />

                    {/* 구분선 */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-2 text-muted-foreground">
                또는
              </span>
                        </div>
                    </div>

                    {/* 소셜 로그인 */}
                    <SocialButtons callbackURL="/" />

                    {/* 회원가입 링크 */}
                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">계정이 없으신가요? </span>
                        <Link href="/signup" className="text-primary hover:underline font-medium">
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

