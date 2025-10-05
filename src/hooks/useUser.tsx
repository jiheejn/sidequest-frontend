import {useEffect, useState} from "react";
import {User} from "@/types/user";

export function useUser(){
    const [user, setUser] = useState<User|null>(null);
    // loading 들어가야하는 이유????
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchUser = async()=> {
            try {
                const res = await fetch("http://localhost:8080/api/auth/me", {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
                });
                const data = await res.json();
                if (data.authenticated) {
                    setUser(data);
                }
            } catch (e) {
                console.error("Failed to fetch user:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    },[]);
    return{user,loading};
}