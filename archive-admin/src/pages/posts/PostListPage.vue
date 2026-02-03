<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Eye, Search, Filter, Calendar } from 'lucide-vue-next'
import { usePostStore } from '@/stores/post'
import { useConfirm } from '@/composables/useConfirm'

const router = useRouter()
const postStore = usePostStore()
const { confirm } = useConfirm()

const statusFilter = ref<string>('all')
const searchQuery = ref('')

const filteredPosts = computed(() => {
  let posts = postStore.posts
  
  if (statusFilter.value !== 'all') {
    posts = posts.filter(p => p.status === statusFilter.value)
  }
  
  if (searchQuery.value) {
    posts = posts.filter(p => 
      p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  return posts
})

const statusCounts = computed(() => ({
  all: postStore.posts.length,
  published: postStore.posts.filter(p => p.status === 'published').length,
  pending: postStore.posts.filter(p => p.status === 'pending').length,
  draft: postStore.posts.filter(p => p.status === 'draft').length,
}))

const getStatusBadge = (status: string) => {
  const badges = {
    draft: { class: 'bg-gray-100 text-gray-700 border-gray-200', text: 'Draft', icon: Edit },
    pending: { class: 'bg-yellow-100 text-yellow-700 border-yellow-200', text: 'Pending', icon: Calendar },
    published: { class: 'bg-green-100 text-green-700 border-green-200', text: 'Published', icon: CheckCircle },
    rejected: { class: 'bg-red-100 text-red-700 border-red-200', text: 'Rejected', icon: XCircle },
  }
  return badges[status as keyof typeof badges] || badges.draft
}

const handleEdit = (id: number) => {
  router.push(`/posts/${id}/edit`)
}

const handleDelete = async (id: number) => {
  const confirmed = await confirm({
    title: 'Delete Post',
    message: 'Are you sure you want to delete this post? This action cannot be undone.',
    confirmText: 'Delete',
    type: 'danger',
  })
  if (confirmed) {
    await postStore.deletePost(id)
  }
}

const handlePublish = async (id: number) => {
  await postStore.publishPost(id)
}

const handleReject = async (id: number) => {
  await postStore.rejectPost(id)
}

onMounted(() => {
  postStore.fetchPosts()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Posts</h1>
        <p class="text-muted-foreground mt-1">Manage and organize your content</p>
      </div>
      <Button @click="router.push('/posts/new')" size="lg" class="gap-2">
        <Plus class="h-4 w-4" />
        Create Post
      </Button>
    </div>

    <!-- Filters -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- Search -->
          <div class="flex-1 relative">
            <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              v-model="searchQuery"
              placeholder="Search posts by title or slug..." 
              class="pl-10"
            />
          </div>
          
          <!-- Status Filters -->
          <div class="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm"
              :class="statusFilter === 'all' ? 'bg-primary text-primary-foreground' : ''"
              @click="statusFilter = 'all'"
            >
              All
              <Badge variant="secondary" class="ml-2">{{ statusCounts.all }}</Badge>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              :class="statusFilter === 'published' ? 'bg-green-600 text-white hover:bg-green-700' : ''"
              @click="statusFilter = 'published'"
            >
              Published
              <Badge variant="secondary" class="ml-2">{{ statusCounts.published }}</Badge>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              :class="statusFilter === 'pending' ? 'bg-yellow-600 text-white hover:bg-yellow-700' : ''"
              @click="statusFilter = 'pending'"
            >
              Pending
              <Badge variant="secondary" class="ml-2">{{ statusCounts.pending }}</Badge>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              :class="statusFilter === 'draft' ? 'bg-gray-600 text-white hover:bg-gray-700' : ''"
              @click="statusFilter = 'draft'"
            >
              Draft
              <Badge variant="secondary" class="ml-2">{{ statusCounts.draft }}</Badge>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Posts Table -->
    <Card>
      <CardHeader>
        <CardTitle class="text-xl">
          {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'Post' : 'Posts' }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow class="bg-muted/50">
                <TableHead class="font-semibold">Title</TableHead>
                <TableHead class="font-semibold">Category</TableHead>
                <TableHead class="font-semibold">Status</TableHead>
                <TableHead class="font-semibold">Created</TableHead>
                <TableHead class="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow 
                v-for="post in filteredPosts" 
                :key="post.id"
                class="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <div>
                    <p class="font-semibold text-sm">{{ post.title }}</p>
                    <p class="text-xs text-muted-foreground mt-1">/{{ post.slug }}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" class="font-normal">
                    Category {{ post.category_id }}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge :class="getStatusBadge(post.status).class" class="border font-medium gap-1">
                    <component :is="getStatusBadge(post.status).icon" class="h-3 w-3" />
                    {{ getStatusBadge(post.status).text }}
                  </Badge>
                </TableCell>
                <TableCell class="text-sm text-muted-foreground">
                  {{ new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </TableCell>
                <TableCell class="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" size="icon" class="h-8 w-8">
                        <MoreHorizontal class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-48">
                      <DropdownMenuItem @click="handleEdit(post.id)" class="gap-2">
                        <Edit class="h-4 w-4" />
                        Edit Post
                      </DropdownMenuItem>
                      <DropdownMenuItem class="gap-2">
                        <Eye class="h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        v-if="post.status === 'pending'" 
                        @click="handlePublish(post.id)"
                        class="gap-2 text-green-600"
                      >
                        <CheckCircle class="h-4 w-4" />
                        Publish
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        v-if="post.status === 'pending'" 
                        @click="handleReject(post.id)"
                        class="gap-2 text-orange-600"
                      >
                        <XCircle class="h-4 w-4" />
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuSeparator v-if="post.status === 'pending'" />
                      <DropdownMenuItem 
                        @click="handleDelete(post.id)" 
                        class="gap-2 text-red-600 focus:text-red-600"
                      >
                        <Trash2 class="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredPosts.length === 0" class="text-center py-12">
          <div class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Search class="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 class="text-lg font-semibold mb-2">No posts found</h3>
          <p class="text-sm text-muted-foreground mb-4">
            {{ searchQuery ? 'Try adjusting your search' : 'Get started by creating your first post' }}
          </p>
          <Button v-if="!searchQuery" @click="router.push('/posts/new')">
            <Plus class="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
