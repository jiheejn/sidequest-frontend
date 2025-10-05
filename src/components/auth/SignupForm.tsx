"use client"

//1.사용자가 이메일 닉네임 비번 입력
//2. auth.signup.email호출->POST /api/auth/sign-up/email
//3. Better-auth가: 비밀번호 해싱(bcrypt) PostgreSQL user 테이블에 저장
//4. 자동 로그인(signIn.email)
//5. 세션 생성 + 쿠키 설정
//6. 홈으로 리다이렉트
import {useRouter} from "next/navigation";
import {useState} from "react";
import {authClient} from "@/lib/auth-client";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react";

export function SignupForm(){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        nickname:"",
        password:"",
        confirmPassword:"",
    })
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        if(formData.password !== formData.confirmPassword) {
            setError("Password does not match")
            setIsLoading(false)
            return
        }

        if(formData.password.length<8){
            setError("Password must be longer than 8 characters")
            setIsLoading(false)
            return
        }

        try{
            await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                name: formData.nickname,
            })
            // 자동 로그인
            await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            })

            router.push("/")
            router.refresh()
        } catch (err: any) {
            setError(err.message || "회원가입에 실패했습니다")
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
                <Label htmlFor="email">이메일</Label>
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
                <Label htmlFor="nickname">닉네임</Label>
                <Input
                    id="nickname"
                    type="text"
                    placeholder="홍길동"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    disabled={isLoading}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    required
                />
                <p className="text-xs text-muted-foreground">최소 8자 이상</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    disabled={isLoading}
                    required
                />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                회원가입
            </Button>
        </form>
    )
}