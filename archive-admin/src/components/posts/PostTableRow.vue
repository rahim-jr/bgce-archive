<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Eye, Calendar } from 'lucide-vue-next'

interface Post {
  id: number
  title: string
  slug: string
  category_id: number
  status: string
  created_at: string
}

interface Props {
  post: Post
}

defineProps<Props>()

const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
  publish: [id: number]
  reject: [id: number]
}>()

const getStatusBadge = (status: string) => {
  const badges = {
    draft: { class: 'bg-gray-100 text-gray-700 border-gray-200', text: 'Draft', icon: Edit },
    pending: { class: 'bg-yellow-100 text-yellow-700 border-yellow-200', text: 'Pending', icon: Calendar },
    published: { class: 'bg-green-100 text-green-700 border-green-200', text: 'Published', icon: CheckCircle },
    rejected: { class: 'bg-red-100 text-red-700 border-red-200', text: 'Rejected', icon: XCircle },
  }
  return badges[status as keyof typeof badges] || badges.draft
}
</script>

<template>
  <TableRow class="hover:bg-muted/30 transition-colors">
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
          <DropdownMenuItem @click="emit('edit', post.id)" class="gap-2">
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
            @click="emit('publish', post.id)"
            class="gap-2 text-green-600"
          >
            <CheckCircle class="h-4 w-4" />
            Publish
          </DropdownMenuItem>
          <DropdownMenuItem 
            v-if="post.status === 'pending'" 
            @click="emit('reject', post.id)"
            class="gap-2 text-orange-600"
          >
            <XCircle class="h-4 w-4" />
            Reject
          </DropdownMenuItem>
          <DropdownMenuSeparator v-if="post.status === 'pending'" />
          <DropdownMenuItem 
            @click="emit('delete', post.id)" 
            class="gap-2 text-red-600 focus:text-red-600"
          >
            <Trash2 class="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
</template>
