import Link from "next/link"
import { SignupForm } from "@/components/auth/SignupForm"
import { SocialButtons } from "@/components/auth/SocialButtons"

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-sm">
                <div className="bg-card rounded-xl border border-border p-8 space-y-6">
                    <div className="text-center space-y-1">
                        <h1 className="text-xl font-semibold tracking-tight text-foreground">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Join Giggles and start building.
                        </p>
                    </div>

                    <SignupForm />

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
                        <span className="text-muted-foreground">Already have an account? </span>
                        <Link href="/login" className="text-foreground font-medium hover:underline">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
