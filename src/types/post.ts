export interface Post{
    id: number;

    boardType: 'technews' | 'community' | 'teamup';

    title: string;
    authorNickname: string;
    content: string;
    createdAt: string;

    comments: number;
    views: number;

    //teamup에서만 존재. 나머지는 undefined(null)
    recruitStatus?: 'open' | 'closed';
}