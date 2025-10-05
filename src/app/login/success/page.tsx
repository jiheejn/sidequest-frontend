"use client";

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function LoginSuccessPage(){
    const router = useRouter();

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search)
        const token = params.get("token");

        if(token){
            //1.save JWT in LocalStorage or Cookie
            //LocalStorage vs Cookie where should I save my JWT?
            localStorage.setItem("token", token);
            //2.redirect to main page
            router.push("/");
        }
    }, [router])
    //activate effect only router values changed
    return(
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg font-mono">login...</p>
        </div>
    );
}