import Link from "next/link"
import { SignupForm } from "@/components/auth/SignupForm"
import { SocialButtons } from "@/components/auth/SocialButtons"

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg p-8 space-y-6">
                    {/* 헤더 */}
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold">회원가입</h1>
                        <p className="text-sm text-muted-foreground">
                            새 계정을 만들어 시작하세요
                        </p>
                    </div>

                    {/* 회원가입 폼 */}
                    <SignupForm />

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

                    {/* 소셜 회원가입 */}
                    <SocialButtons callbackURL="/" />

                    {/* 로그인 링크 */}
                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">이미 계정이 있으신가요? </span>
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}