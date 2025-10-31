export interface User{
    userId: number;
    email: string;
    nickname: string;
    authenticated: boolean;
    image?: string;
}