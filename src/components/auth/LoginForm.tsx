"use client"

import {useRouter} from "next/navigation";
import {useState} from "react";
import {authClient} from "@/lib/auth-client";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export function LoginForm(){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const [error, setError] = useState((""))

    //Form Submission 기본 구조.
    //e.preventDefault() 페이지 새로고침을 막음
    //setIsLoading(true)
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault()
        setIsLoading(true)
        setError("")

        try{
            await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            })
            router.push("/")
            router.refresh()
        } catch (err: any){
            setError((err.message||"Login failed"))
        } finally {
            setIsLoading(false)
        }

    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    required
                />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Login
            </Button>
        </form>
    )
}

