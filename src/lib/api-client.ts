/**
 * Spring Boot API 클라이언트
 */
import {PostDetailDto} from "@/hooks/usePostDetail";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

interface ApiOptions extends RequestInit {
    data?: any
}
// API 응답 타입 정의
interface PostCreationResponse {
    id: number;
}

export interface PageData<T> {
    content: T[];          // 실제 데이터 목록 (가장 중요)
    totalPages: number;    // 전체 페이지 수
    totalElements: number; // 전체 요소 개수
    size: number;          // 현재 페이지의 크기 (요청한 size)
    number: number;        // 현재 페이지 번호 (0부터 시작)
    first: boolean;        // 첫 페이지 여부
    last: boolean;         // 마지막 페이지 여부
    numberOfElements: number; // 현재 페이지의 요소 개수
    empty: boolean;        // 현재 페이지가 비어있는지 여부
    // sort: any;          // 정렬 정보 (필요하면 구체적으로 정의)
    // pageable: any;      // 페이징 정보 (필요하면 구체적으로 정의)
}

// PostListDto 타입 정의 (PostListItem에서 사용한 것과 동일하게)
export interface PostListDto {
    id: number;
    title: string;
    status?: 'OPEN' | 'CLOSED';
    position: { id: number; name: string };
    tags: { id: number; name: string }[];
    author: {
        userId: number;
        nickname: string;
        image?: string;
    };
    viewCount: number;
    commentCount: number;
    createdAt: string;
    isBookmarked: boolean;
}

async function apiClient<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { data, headers, ...rest } = options

    const config: RequestInit = {
        ...rest,
        credentials: "include", // 쿠키 자동 포함
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    }

    if (data) {
        config.body = JSON.stringify(data)
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

    // 204 No Content는 body 없음
    if (response.status === 204) {
        return {} as T
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }))
        throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
}

// 인증 API
export const authApi = {
    signup: (data: { email: string; password: string; nickname: string }) =>
        apiClient("/api/auth/signup", { method: "POST", data }),

    login: (data: { email: string; password: string }) =>
        apiClient("/api/auth/login", { method: "POST", data }),

    logout: () =>
        apiClient("/api/auth/logout", { method: "POST" }),

    getCurrentUser: () =>
        apiClient("/api/auth/me", { method: "GET" }),

    updateProfile: (data: { nickname?: string; image?: string }) =>
        apiClient("/api/auth/profile", { method: "PUT", data }),
}

// Post API
export const postApi = {
    createPost: (data: any) =>
        apiClient<PostCreationResponse>("/api/posts", { method: "POST", data }),

    updatePost: (postId: number, data: {
        title: string
        content: string
        recruitStatus: string
        positionId: number
        tagIds: number[]
    }) => apiClient(`/api/posts/${postId}`, {
        method: "PUT",
        data,
    }),

    deletePost: (id: number) =>
        apiClient(`/api/posts/${id}`, { method: "DELETE" }),

    getPosts: (params: {
        page?: number;
        size?: number;
        status?: string;
        tags?: number[];
        position?: number;
    }) => {
        const query = new URLSearchParams();
        if (params.page) query.append("page", String(params.page));
        if (params.size) query.append("size", String(params.size));
        if (params.status) query.append("status", params.status);
        if (params.tags && params.tags.length > 0) {
            params.tags.forEach(tagId => query.append("tagIds", String(tagId)));
        }
        if (params.position) {
            query.append("positionId", String(params.position));
        }
        return apiClient<PageData<PostListDto>>(`/api/posts?${query.toString()}`, { method: "GET" });   },

    getPost: (id: number) =>
        apiClient<PostDetailDto>(`/api/posts/${id}`, { method: "GET" }),

    getMyPosts: (userId: number) =>
        apiClient<PostListDto[]>(`/api/posts/my`, { method: "GET" }),
}

// Tag & Position API
export const tagApi = {
    getAllTags: () =>
        apiClient("/api/tags", { method: "GET" }),
}
export const positionApi = {
    getAllPositions: () =>
        apiClient<any[]>("/api/positions", { method: "GET" }),
}
export const bookmarkApi = {
    toggleBookmark: (postId: number) =>
        apiClient<{ bookmarked: boolean }>(`/api/posts/${postId}/bookmark`, { method: "POST" }),

    checkBookmark: (postId: number) =>
        apiClient<{ bookmarked: boolean }>(`/api/posts/${postId}/bookmark/status`, { method: "GET" }),
    getMyBookmarks: () =>
        apiClient<Array<{ id: number; postId: number; postTitle: string; userId: number }>>(
        "/api/bookmarks",
        { method: "GET" }
        ),

    deleteBookmark: (bookmarkId: number) =>
        apiClient("/api/bookmarks/" + bookmarkId, { method: "DELETE" }),
}

export const commentApi = {
    createComment: (postId: number, data: { content: string }) =>
        apiClient(`/api/posts/${postId}/comments`, { method: "POST", data }),

    updateComment: (postId: number, commentId: number, data: { content: string }) =>
        apiClient(`/api/posts/${postId}/comments/${commentId}`, { method: "PUT", data }),

    deleteComment: (postId: number, commentId: number) =>
        apiClient(`/api/posts/${postId}/comments/${commentId}`, { method: "DELETE" }),
}

export default apiClient