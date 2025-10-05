
/**
 * NavBar 컴포넌트
 *
 * 로그인 상태를 표시하고 로그아웃 기능 제공
 *
 * 세션 유지 메커니즘:
 * 1. useAuth() 훅이 자동으로 쿠키 확인
 * 2. 쿠키에 session_token 있으면 → 서버에 세션 조회
 * 3. 세션 유효하면 → user 정보 반환
 * 4. 페이지 이동해도 쿠키는 계속 유지 (만료 전까지)
 *
 * 로그아웃 시:
 * 1. authClient.signOut() 호출
 * 2. PostgreSQL에서 세션 삭제
 * 3. 브라우저 쿠키 삭제
 * 4. useAuth()가 자동으로 null 반환
 */

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LogOut, User } from "lucide-react"

export function NavBar() {
    const router = useRouter()
    const { user, isLoading, isAuthenticated } = useAuth()

    const handleLogout = async () => {
        await authClient.signOut()
        router.push("/login")
        router.refresh()
    }

    return (
        <nav className="border-b bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* 로고 */}
                <Link href="/" className="text-xl font-bold">
                    게시판
                </Link>

                {/* 로그인 상태 표시 */}
                <div className="flex items-center gap-4">
                    {isLoading ? (
                        // 로딩 중일 때 Skeleton 표시
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ) : isAuthenticated && user ? (
                        // 로그인 상태
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.name || "User"}
                                        className="h-8 w-8 rounded-full"
                                    />
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-4 w-4" />
                                    </div>
                                )}
                                <span className="text-sm font-medium">{user.name}</span>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4" />
                                로그아웃
                            </Button>
                        </div>
                    ) : (
                        // 로그아웃 상태
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm">
                                    로그인
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">
                                    회원가입
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
// "use client";
//
// import Link from "next/link";
// import {useState} from "react";
// import {PiRabbitFill} from "react-icons/pi";
// import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
// import {Button} from "@/components/ui/button";
// import {BiPlus} from "react-icons/bi";
// import {Avatar, AvatarFallback} from "@/components/ui/avatar";
// import {useRouter} from "next/navigation";
//
// export default function Navbar({isLoggedIn}: {isLoggedIn: boolean}){
//     const [open, setOpen] = useState(false);
//
//     return(
//         <nav className="flex items-center justify-center px-10 py-4 border-b shadow-sm bg-white gap-10">
//             <div className="flex items-center justify-center gap-6">
//                 <Link href="/" className="flex items-center gap-1 text-xl font-bold">
//                     <PiRabbitFill /> SideQuest
//                 </Link>
//             </div>
//             <div className="flex items-center justify-center gap-10">
//                 <Link href="/technews" className="text-gray-700 hover:text-blue-700">
//                     TechNews
//                 </Link>
//
//                 <DropdownMenu open={open} onOpenChange={setOpen}>
//                     <DropdownMenuTrigger className="text-gray-700 hover:text-blue-700" onMouseEnter={() => setOpen(true)}>
//                         Community
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent onMouseLeave={()=>setOpen(false)}
//                                          onCloseAutoFocus={(e) => {e.preventDefault();}}>
//                         <DropdownMenuItem>
//                             <Link href="/community/qna">Q&A</Link>
//                         </DropdownMenuItem>
//                         <DropdownMenuItem>
//                             <Link href="/community/projects">Projects</Link>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//
//                 <Link href="/teamup" className="text-gray-700 hover:text-blue-700">
//                     TeamUp
//                 </Link>
//             </div>
//         <div className="flex items-center gap-4">
//             <Button variant="outline" size="icon" >
//                 <Link href="/posts">
//                 <BiPlus className="h-5 w-5"/>
//                 </Link>
//             </Button>
//
//             {!isLoggedIn? (
//                 <Button asChild>
//                     <Link href="/login">Login</Link>
//                 </Button>
//             ) : (<UserMenu/>
//             )}
//         </div>
//         </nav>
//     )
// }
//
// function UserMenu(){
//     const router = useRouter();
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         router.push("/");
//         window.location.reload();
//     };
//
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger>
//                 <Avatar>
//                     <AvatarFallback>{"U"}</AvatarFallback>
//                 </Avatar>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//                 <DropdownMenuItem>
//                     <Link href="/profile">My Profile</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                     <Link href="/profile/myposts">My Posts</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                     <Button onClick={handleLogout}>Logout</Button>
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }