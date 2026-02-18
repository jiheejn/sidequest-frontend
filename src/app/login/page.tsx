import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"
import { SocialButtons } from "@/components/auth/SocialButtons"

export default function LoginPage() {
    return (
        // 배경 그라데이션 제거 -> bg-background로 변경
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">
                {/* shadow-lg 제거, border-border/50 추가, bg-card로 변경 */}
                <div className="bg-card rounded-md border-2 border-border shadow-[4px_4px_0px_0px] shadow-border/20 p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-black tracking-tight text-foreground uppercase">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium">
                            Sign in to continue to Giggles
                        </p>
                    </div>

                    <LoginForm />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t-2 border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-3 text-muted-foreground font-bold tracking-wide">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <SocialButtons />

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">{"Don't have an account? "}</span>
                        <Link href="/signup" className="text-primary hover:underline font-bold">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
