"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import {useRouter} from "next/navigation";

interface Post {
    id: number;
    title: string;
    content: string;
}

export default function MyPostsPage() {
    const { user, loading: userLoading } = useUser();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // user 체크가 끝났는데 로그인 안 돼 있으면 → /login으로 이동
        if (!userLoading && !user) {
            router.push("/login");
        }
    }, [user, userLoading, router]);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/posts/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch my posts");
                return res.json();
            })
            .then((data) => setPosts(data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    if (!user) {
        return <p className="p-4">로그인 후 이용 가능합니다.</p>;
    }

    if (loading) {
        return <p className="p-4">내 글을 불러오는 중...</p>;
    }

    if (posts.length === 0) {
        return <p className="p-4">작성한 글이 없습니다.</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">{user.nickname}님의 글</h1>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="border p-4 rounded-lg">
                        <h2 className="text-lg font-semibold">{post.title}</h2>
                        <p className="text-gray-600">{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
