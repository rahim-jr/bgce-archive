import { api } from './api'
import { postMockService } from './mocks/postMock'
import { API_CONFIG } from '@/config/api.config'
import type {
    ApiResponse,
    Post,
    CreatePostRequest,
    UpdatePostRequest,
} from '@/types/api'

export const postService = {
    async getPosts(params?: { status?: string; category_id?: number; limit?: number; offset?: number }): Promise<ApiResponse<Post[]>> {
        if (API_CONFIG.USE_MOCK_POSTS) return postMockService.getPosts(params)
        const response = await api.get<ApiResponse<Post[]>>('/posts', { params })
        return response.data
    },

    async getPostById(id: number): Promise<ApiResponse<Post>> {
        if (API_CONFIG.USE_MOCK_POSTS) return postMockService.getPostById(id)
        const response = await api.get<ApiResponse<Post>>(`/posts/${id}`)
        return response.data
    },

    async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
        if (API_CONFIG.USE_MOCK_POSTS) return postMockService.createPost(data)
        const response = await api.post<ApiResponse<Post>>('/posts', data)
        return response.data
    },

    async updatePost(id: number, data: UpdatePostRequest): Promise<ApiResponse<Post>> {
        if (API_CONFIG.USE_MOCK_POSTS) return postMockService.updatePost(id, data)
        const response = await api.put<ApiResponse<Post>>(`/posts/${id}`, data)
        return response.data
    },

    async deletePost(id: number): Promise<ApiResponse<null>> {
        if (API_CONFIG.USE_MOCK_POSTS) return postMockService.deletePost(id)
        const response = await api.delete<ApiResponse<null>>(`/posts/${id}`)
        return response.data
    },

    async publishPost(id: number): Promise<ApiResponse<Post>> {
        if (API_CONFIG.USE_MOCK_POSTS) return postMockService.publishPost(id)
        const response = await api.post<ApiResponse<Post>>(`/posts/${id}/publish`)
        return response.data
    },

    async rejectPost(id: number, reason?: string): Promise<ApiResponse<Post>> {
        if (API_CONFIG.USE_MOCK_POSTS) return postMockService.rejectPost(id, reason)
        const response = await api.post<ApiResponse<Post>>(`/posts/${id}/reject`, { reason })
        return response.data
    }
}
