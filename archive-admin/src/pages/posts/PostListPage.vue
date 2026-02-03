<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Plus, MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Eye } from 'lucide-vue-next'
import { usePostStore } from '@/stores/post'
import { useConfirm } from '@/composables/useConfirm'

const router = useRouter()
const postStore = usePostStore()
const { confirm } = useConfirm()

const statusFilter = ref<string>('all')

const filteredPosts = computed(() => {
  if (statusFilter.value === 'all') return postStore.posts
  return postStore.posts.filter(p => p.status === statusFilter.value)
})

const getStatusBadge = (status: string) => {
  const badges = {
    draft: { class: 'bg-gray-500 text-white', text: 'Draft' },
    pending: { class: 'bg-yellow-500 text-black', text: 'Pending' },
    published: { class: 'bg-green-500 text-white', text: 'Published' },
    rejected: { class: 'bg-red-500 text-white', text: 'Rejected' },
  }
  return badges[status as keyof typeof badges] || badges.draft
}

const handleEdit = (id: number) => {
  router.push(`/posts/${id}/edit`)
}

const handleDelete = async (id: number) => {
  const confirmed = await confirm({
    title: 'Delete Post',
    message: 'Are you sure you want to delete this post?',
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
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">Posts</h1>
        <p class="text-muted-foreground">Manage your content</p>
      </div>
      <Button @click="router.push('/posts/new')">
        <Plus class="h-4 w-4 mr-2" />
        Create Post
      </Button>
    </div>

    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle>All Posts</CardTitle>
          <div class="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              :class="statusFilter === 'all' ? 'bg-muted' : ''"
              @click="statusFilter = 'all'"
            >
              All
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              :class="statusFilter === 'pending' ? 'bg-muted' : ''"
              @click="statusFilter = 'pending'"
            >
              Pending
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              :class="statusFilter === 'published' ? 'bg-muted' : ''"
              @click="statusFilter = 'published'"
            >
              Published
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="post in filteredPosts" :key="post.id">
              <TableCell class="font-medium">{{ post.title }}</TableCell>
              <TableCell>Category {{ post.category_id }}</TableCell>
              <TableCell>
                <Badge :class="getStatusBadge(post.status).class">
                  {{ getStatusBadge(post.status).text }}
                </Badge>
              </TableCell>
              <TableCell>{{ new Date(post.created_at).toLocaleDateString() }}</TableCell>
              <TableCell class="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal class="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="handleEdit(post.id)">
                      <Edit class="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem v-if="post.status === 'pending'" @click="handlePublish(post.id)">
                      <CheckCircle class="mr-2 h-4 w-4 text-green-600" />
                      Publish
                    </DropdownMenuItem>
                    <DropdownMenuItem v-if="post.status === 'pending'" @click="handleReject(post.id)">
                      <XCircle class="mr-2 h-4 w-4 text-red-600" />
                      Reject
                    </DropdownMenuItem>
                    <DropdownMenuItem @click="handleDelete(post.id)" class="text-red-600">
                      <Trash2 class="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
