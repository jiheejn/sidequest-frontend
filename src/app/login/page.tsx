import Link from "next/link"
import { LoginForm } from "@/components/auth/LoginForm"
import { SocialButtons } from "@/components/auth/SocialButtons"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-950 rounded-lg shadow-lg p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold">Welcome Back</h1>
                        <p className="text-sm text-muted-foreground">
                            Sign in to continue to SideQuest
                        </p>
                    </div>

                    <LoginForm />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-2 text-muted-foreground">
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

