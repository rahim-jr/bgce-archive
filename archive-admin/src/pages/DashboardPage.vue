<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FolderTree, FileText, MessageSquare, HeadphonesIcon, TrendingUp, Clock, CheckCircle2, AlertCircle } from 'lucide-vue-next'
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
  publishedPosts: 0,
  pendingComments: 0,
  openTickets: 0,
})

const recentActivity = ref([
  { type: 'post', action: 'published', title: 'Getting Started with Vue 3', time: '2 hours ago' },
  { type: 'comment', action: 'approved', title: 'Comment on "Understanding TypeScript"', time: '3 hours ago' },
  { type: 'ticket', action: 'resolved', title: 'Support ticket #1234', time: '5 hours ago' },
  { type: 'post', action: 'pending', title: 'New post awaiting review', time: '6 hours ago' },
])

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
    publishedPosts: postStore.posts.filter(p => p.status === 'published').length,
    pendingComments: commentStore.comments.length,
    openTickets: supportStore.tickets.length,
  }
})

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'post': return FileText
    case 'comment': return MessageSquare
    case 'ticket': return HeadphonesIcon
    default: return Clock
  }
}

const getActivityColor = (action: string) => {
  switch (action) {
    case 'published': return 'text-green-600'
    case 'approved': return 'text-blue-600'
    case 'resolved': return 'text-purple-600'
    case 'pending': return 'text-yellow-600'
    default: return 'text-gray-600'
  }
}
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-muted-foreground mt-2">Welcome back! Here's what's happening today.</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock class="h-4 w-4" />
        <span>{{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <!-- Total Posts -->
      <Card class="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Total Posts</CardTitle>
          <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FileText class="h-5 w-5 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-bold">{{ stats.posts }}</div>
          <div class="flex items-center gap-2 mt-2">
            <span class="text-xs text-green-600 font-medium flex items-center gap-1">
              <TrendingUp class="h-3 w-3" />
              {{ stats.publishedPosts }} published
            </span>
          </div>
        </CardContent>
      </Card>

      <!-- Pending Review -->
      <Card class="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
          <div class="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock class="h-5 w-5 text-yellow-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-bold">{{ stats.pendingPosts }}</div>
          <p class="text-xs text-muted-foreground mt-2">Posts awaiting approval</p>
        </CardContent>
      </Card>

      <!-- Comments -->
      <Card class="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Comments</CardTitle>
          <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <MessageSquare class="h-5 w-5 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-bold">{{ stats.pendingComments }}</div>
          <p class="text-xs text-muted-foreground mt-2">Pending moderation</p>
        </CardContent>
      </Card>

      <!-- Support Tickets -->
      <Card class="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium text-muted-foreground">Support Tickets</CardTitle>
          <div class="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
            <HeadphonesIcon class="h-5 w-5 text-red-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div class="text-3xl font-bold">{{ stats.openTickets }}</div>
          <p class="text-xs text-muted-foreground mt-2">Open tickets</p>
        </CardContent>
      </Card>
    </div>

    <!-- Content Grid -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Recent Activity -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle class="text-xl">Recent Activity</CardTitle>
          <CardDescription>Latest updates across your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div 
              v-for="(activity, index) in recentActivity" 
              :key="index"
              class="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <component :is="getActivityIcon(activity.type)" class="h-5 w-5" :class="getActivityColor(activity.action)" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-sm">{{ activity.title }}</p>
                <p class="text-xs text-muted-foreground mt-1">
                  <span class="capitalize" :class="getActivityColor(activity.action)">{{ activity.action }}</span>
                  · {{ activity.time }}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Quick Actions -->
      <Card>
        <CardHeader>
          <CardTitle class="text-xl">Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent class="space-y-3">
          <router-link 
            to="/posts/new" 
            class="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <FileText class="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p class="font-medium text-sm">Create New Post</p>
              <p class="text-xs text-muted-foreground">Write and publish content</p>
            </div>
          </router-link>

          <router-link 
            to="/categories" 
            class="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div class="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <FolderTree class="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p class="font-medium text-sm">Manage Categories</p>
              <p class="text-xs text-muted-foreground">Organize your content</p>
            </div>
          </router-link>

          <router-link 
            to="/comments" 
            class="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div class="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <MessageSquare class="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p class="font-medium text-sm">Moderate Comments</p>
              <p class="text-xs text-muted-foreground">Review pending comments</p>
            </div>
          </router-link>

          <router-link 
            to="/support" 
            class="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div class="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <HeadphonesIcon class="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p class="font-medium text-sm">Support Tickets</p>
              <p class="text-xs text-muted-foreground">Help your users</p>
            </div>
          </router-link>
        </CardContent>
      </Card>
    </div>

    <!-- Categories Overview -->
    <Card>
      <CardHeader>
        <CardTitle class="text-xl">Categories Overview</CardTitle>
        <CardDescription>Your content organization structure</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div 
            v-for="category in categoryStore.categories.slice(0, 4)" 
            :key="category.id"
            class="p-4 rounded-lg border border-border hover:border-primary hover:shadow-md transition-all cursor-pointer"
            @click="$router.push('/categories')"
          >
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FolderTree class="h-6 w-6 text-white" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">{{ category.label }}</p>
                <p class="text-xs text-muted-foreground">{{ category.slug }}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
