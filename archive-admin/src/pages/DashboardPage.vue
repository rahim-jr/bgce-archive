<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderTree, FileText, MessageSquare, HeadphonesIcon } from 'lucide-vue-next'
import { useCategoryStore } from '@/stores/category'
import { usePostStore } from '@/stores/post'
import { useCommentStore } from '@/stores/comment'
import { useSupportStore } from '@/stores/support'

const categoryStore = useCategoryStore()
const postStore = usePostStore()
const commentStore = useCommentStore()
const supportStore = useSupportStore()

const stats = ref({
  categories: 0,
  posts: 0,
  pendingPosts: 0,
  pendingComments: 0,
  openTickets: 0,
})

onMounted(async () => {
  await Promise.all([
    categoryStore.fetchCategories(),
    postStore.fetchPosts(),
    commentStore.fetchComments({ status: 'pending' }),
    supportStore.fetchTickets({ status: 'open' }),
  ])

  stats.value = {
    categories: categoryStore.categories.length,
    posts: postStore.posts.length,
    pendingPosts: postStore.posts.filter(p => p.status === 'pending').length,
    pendingComments: commentStore.comments.length,
    openTickets: supportStore.tickets.length,
  }
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground">Welcome to Archive Admin Portal</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Categories</CardTitle>
          <FolderTree class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.categories }}</div>
          <p class="text-xs text-muted-foreground">Total categories</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Posts</CardTitle>
          <FileText class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.posts }}</div>
          <p class="text-xs text-muted-foreground">
            {{ stats.pendingPosts }} pending review
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Comments</CardTitle>
          <MessageSquare class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.pendingComments }}</div>
          <p class="text-xs text-muted-foreground">Pending moderation</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Support</CardTitle>
          <HeadphonesIcon class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">{{ stats.openTickets }}</div>
          <p class="text-xs text-muted-foreground">Open tickets</p>
        </CardContent>
      </Card>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">Activity feed coming soon...</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <router-link to="/posts/new" class="block p-3 rounded-md hover:bg-muted">
            <p class="font-medium">Create New Post</p>
            <p class="text-sm text-muted-foreground">Write and publish content</p>
          </router-link>
          <router-link to="/categories" class="block p-3 rounded-md hover:bg-muted">
            <p class="font-medium">Manage Categories</p>
            <p class="text-sm text-muted-foreground">Organize your content</p>
          </router-link>
          <router-link to="/comments" class="block p-3 rounded-md hover:bg-muted">
            <p class="font-medium">Moderate Comments</p>
            <p class="text-sm text-muted-foreground">Review pending comments</p>
          </router-link>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
