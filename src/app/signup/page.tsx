import Link from "next/link"
import { SignupForm } from "@/components/auth/SignupForm"
import { SocialButtons } from "@/components/auth/SocialButtons"

export default function SignupPage() {
    return (
        // bg-gradient 제거 -> bg-background로 변경
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                {/* shadow-lg 제거, border 추가, bg-white -> bg-card로 변경 */}
                <div className="bg-card rounded-xl border border-border/50 p-8 space-y-6">
                    {/* 헤더 */}
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Join Giggles today.
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create an account to get started.
                        </p>
                    </div>

                    {/* 회원가입 폼 */}
                    <SignupForm />

                    {/* 구분선 */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            {/* border-t의 투명도 조절 */}
                            <span className="w-full border-t border-border/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            {/* bg-white -> bg-card로 변경하여 일치시킴 */}
                            <span className="bg-card px-2 text-muted-foreground">
                                or
                            </span>
                        </div>
                    </div>

                    {/* 소셜 회원가입 */}
                    <SocialButtons />

                    {/* 로그인 링크 */}
                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}