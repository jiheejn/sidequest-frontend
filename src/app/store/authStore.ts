/**
 * Zustand Auth Store
 *
 * Context API보다 장점:
 * - Provider 래핑 불필요
 * - 여러 store 쉽게 추가 가능 (chat, notification)
 * - DevTools 지원
 * - 더 나은 TypeScript 타입 추론
 */
import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {authApi} from '@/lib/api-client'

interface User {
    userId: number
    email: string
    nickname: string
    image?: string
    portfolioUrl?: string
    bio?: string
}

interface AuthState{
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    //Actions
    setUser: (user: User | null) => void
    login: (email: string, password: string) => Promise<void>
    signup: (email: string, password: string, nickname: string) => Promise<void>
    logout: () => Promise<void>
    fetchCurrentUser: () => Promise<void>
    updateProfile: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            user: null,
            isLoading: true,
            isAuthenticated: false,

            setUser: (user) => set({
                user,
                isAuthenticated: !!user,
                isLoading: false
            }),
            fetchCurrentUser: async () => {
                try {
                    set({isLoading: true})
                    const data: any = await authApi.getCurrentUser()

                    if (data.userId){
                        set({
                            user: {
                                userId: data.userId,
                                email: data.email,
                                nickname: data.nickname,
                                image: data.image,
                                portfolioUrl: data.portfolioUrl,
                                bio: data.bio,
                            },
                            isAuthenticated: true,
                            isLoading: false,
                        })
                    } else {
                        set({user:null, isAuthenticated: false, isLoading: false})
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error)
                    set({user: null, isAuthenticated: false, isLoading: false})
                }
            },
            login: async (email, password) => {
                const  data: any = await authApi.login({email, password})
                if (data.userId) {
                    set({
                        user: {
                            userId: data.userId,
                            email: data.email,
                            nickname: data.nickname,
                            image: data.image,
                        },
                        isAuthenticated: true,
                    })
                }
            },

            signup: async (email, password, nickname) => {
                const data: any = await authApi.signup({email, password, nickname})

                if(data.userId){
                    set({
                        user: {
                            userId: data.userId,
                            email: data.email,
                            nickname: data.nickname,
                            image: data.image,
                        },
                        isAuthenticated: true,
                    })
                }
            },
            logout: async () => {
                await authApi.logout()
                set({user: null, isAuthenticated:false})
            },
            updateProfile: (data) => set((state) => ({
                user: state.user ? { ...state.user, ...data} : null
            })),
        }),
        { name: 'auth-store'}
    )
)
//앱시작시 자동으로 사용자 정보 로드
if (typeof window !== 'undefined'){
    useAuthStore.getState().fetchCurrentUser()
}
