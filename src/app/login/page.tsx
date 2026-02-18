import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"
import { SocialButtons } from "@/components/auth/SocialButtons"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-sm">
                <div className="bg-card rounded-xl border border-border p-8 space-y-6">
                    <div className="text-center space-y-1">
                        <h1 className="text-xl font-semibold tracking-tight text-foreground">
                            Welcome back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in to continue to Giggles
                        </p>
                    </div>

                    <LoginForm />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-card px-3 text-muted-foreground">
                                or
                            </span>
                        </div>
                    </div>

                    <SocialButtons />

                    <div className="text-center text-sm">
                        <span className="text-muted-foreground">{"Don't have an account? "}</span>
                        <Link href="/signup" className="text-foreground font-medium hover:underline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
