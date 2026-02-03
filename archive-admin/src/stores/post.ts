import { defineStore } from 'pinia'
import { ref } from 'vue'
import { postService } from '@/services'
import { useToast } from '@/composables/useToast'
import type { Post, CreatePostRequest, UpdatePostRequest } from '@/types/api'

export const usePostStore = defineStore('post', () => {
    const posts = ref<Post[]>([])
    const currentPost = ref<Post | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const toast = useToast()

    const fetchPosts = async (params?: { status?: string; category_id?: number; limit?: number; offset?: number }) => {
        loading.value = true
        error.value = null
        try {
            const response = await postService.getPosts(params)
            if (response.status && response.data) {
                posts.value = response.data
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch posts'
            toast.error('Error', error.value)
        } finally {
            loading.value = false
        }
    }

    const fetchPostById = async (id: number) => {
        loading.value = true
        error.value = null
        try {
            const response = await postService.getPostById(id)
            if (response.status && response.data) {
                currentPost.value = response.data
                return response.data
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch post'
            toast.error('Error', error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    const createPost = async (data: CreatePostRequest) => {
        loading.value = true
        error.value = null
        try {
            const response = await postService.createPost(data)
            if (response.status) {
                toast.success('Success', 'Post created successfully')
                await fetchPosts()
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to create post'
            toast.error('Error', error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    const updatePost = async (id: number, data: UpdatePostRequest) => {
        loading.value = true
        error.value = null
        try {
            const response = await postService.updatePost(id, data)
            if (response.status) {
                toast.success('Success', 'Post updated successfully')
                await fetchPosts()
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to update post'
            toast.error('Error', error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    const deletePost = async (id: number) => {
        loading.value = true
        error.value = null
        try {
            const response = await postService.deletePost(id)
            if (response.status) {
                toast.success('Success', 'Post deleted successfully')
                posts.value = posts.value.filter(p => p.id !== id)
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to delete post'
            toast.error('Error', error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    const publishPost = async (id: number) => {
        loading.value = true
        error.value = null
        try {
            const response = await postService.publishPost(id)
            if (response.status) {
                toast.success('Success', 'Post published successfully')
                await fetchPosts()
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to publish post'
            toast.error('Error', error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    const rejectPost = async (id: number, reason?: string) => {
        loading.value = true
        error.value = null
        try {
            const response = await postService.rejectPost(id, reason)
            if (response.status) {
                toast.success('Success', 'Post rejected')
                await fetchPosts()
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to reject post'
            toast.error('Error', error.value)
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        posts,
        currentPost,
        loading,
        error,
        fetchPosts,
        fetchPostById,
        createPost,
        updatePost,
        deletePost,
        publishPost,
        rejectPost
    }
})
