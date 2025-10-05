"use client"

import {useState} from "react";
import {Button} from "@/components/ui/button";
import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {authClient} from "@/lib/auth-client";

interface SocialButtonsProps{
    callbackURL?: string
}

export function SocialButtons({callbackURL="/"}: SocialButtonsProps){
    const [isLoading, setIsLoading] = useState(false)

    const handleSocialLogin = async (provider: "github" | "google") => {
        setIsLoading(true)
        try{
            await authClient.signIn.social({
                provider,
                callbackURL,
            })
        } catch (error) {
            console.error("Social login error:", error)
            setIsLoading(false)
        }
    }

    return(
        <div className="space-y-3">
            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin("github")}
                disabled={isLoading}>
                <FaGithub className="h-4 w-4"/>
                Continue with Github
            </Button>

            <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={()=>handleSocialLogin("google")}
                disabled={isLoading}
                >
                <FcGoogle className="h-4 w-4"/>
                Continue with Google
            </Button>
        </div>
    )
}