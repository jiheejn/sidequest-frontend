import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"
import { SocialButtons } from "@/components/auth/SocialButtons"

export default function LoginPage() {
    return (
        // 배경 그라데이션 제거 -> bg-background로 변경
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                {/* shadow-lg 제거, border-border/50 추가, bg-card로 변경 */}
                <div className="bg-card rounded-xl border border-border/50 p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in to continue to SideQuest
                        </p>
                    </div>

                    <LoginForm />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            {/* 구분선 색상도 border/50으로 통일 */}
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            {/* 배경색을 카드의 배경색(bg-card)과 일치시켜 선이 겹치지 않게 함 */}
                            <span className="bg-card px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <SocialButtons />

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Don't have an account? </span>
                        <Link href="/signup" className="text-primary hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
