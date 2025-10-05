"use client";

import {useRouter} from "next/navigation";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useUser} from "@/hooks/useUser";


export default function ProfilePage(){
    const {user,loading} = useUser();
    const router = useRouter();

    if(loading) return <p className="text-center mt-10">Loading...</p>;

    if(!user){
        return <p className="text-center mt-10">need login</p>;
    }

    return(
        <div className="flex justify-center mt-12">
            <Card className="w-96 shadow-lg">
                <CardContent className="p-6 space y-4">
                    <h1 className="text-2xl font-bold text-blue-900">My Profile</h1>
                    <div className="space-y-2">
                        <p><strong>ID:</strong> {user.userId}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Nickname:</strong> {user.nickname}</p>
                    </div>
                    <Button
                        className="w-full bg-red-500 hover:bg-red-600"
                        onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/login");
                        }}
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>

    )
}