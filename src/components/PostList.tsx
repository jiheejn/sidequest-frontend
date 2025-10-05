import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";

interface Post{
    id: number;
    title: string;
    author: string;
    createdAt : string;
}

export default function PostList({board}:{board:string}){
    const [posts, setPosts] = useState<Post[]>([]);
    //fetch.then.catch=>async/await
    useEffect(() => {
        fetch(`http://localhost:/8080/api/posts?board=${board.toLowerCase()}`)
            .then((res) => res.json())
            .then((data)=>setPosts(data))
            .catch(()=>{
                setPosts([
                    {id: 1, title: `${board} dummy`, author: "dummy", createdAt: "01-24-2026"},
                    {id: 2, title: `${board} dummy`, author: "dummy", createdAt: "01-24-2026"},
                    {id: 3, title: `${board} dummy`, author: "dummy", createdAt: "01-24-2026"},
                    {id: 4, title: `${board} dummy`, author: "dummy", createdAt: "01-24-2026"},
                    {id: 5, title: `${board} dummy`, author: "dummy", createdAt: "01-24-2026"}
                ]);
            });
    }, [board]);

    return(
        <Card>
            <CardHeader>
                <CardTitle>{board}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {posts.map((p)=><li key={p.id} className="test-sm text-gray-700">
                        {p.title} <span className="text-gray-400">| {p.author}</span>
                        <span className="text-gray-400"> | {p.createdAt}</span>
                    </li> )}
                </ul>
            </CardContent>
        </Card>
    )
}