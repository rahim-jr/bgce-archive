import { ref, computed } from 'vue'
import type { Post } from '@/types/api'

export function usePostFilters(posts: () => Post[]) {
    const statusFilter = ref<string>('all')
    const searchQuery = ref('')

    const filteredPosts = computed(() => {
        let filtered = posts()

        if (statusFilter.value !== 'all') {
            filtered = filtered.filter(p => p.status === statusFilter.value)
        }

        if (searchQuery.value) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                p.slug.toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        }

        return filtered
    })

    const statusCounts = computed(() => ({
        all: posts().length,
        published: posts().filter(p => p.status === 'published').length,
        pending: posts().filter(p => p.status === 'pending').length,
        draft: posts().filter(p => p.status === 'draft').length,
    }))

    return {
        statusFilter,
        searchQuery,
        filteredPosts,
        statusCounts,
    }
}
