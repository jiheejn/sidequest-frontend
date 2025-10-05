"use client";

import {NavBar} from "@/components/NavBar";
import {useEffect, useState} from "react";
import PostList from "@/components/PostList";
import {authClient} from "@/lib/auth-client";

export default function Home(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div>
            {/*isLoggedIn binding with Backend*/}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <PostList board="TechNews"/>
                <PostList board="TeamUp"/>
                <PostList board="Q&A"/>
                <PostList board="Projects"/>
            </div>
        </div>
    )
}