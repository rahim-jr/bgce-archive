<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle, XCircle, AlertTriangle, Trash2 } from 'lucide-vue-next'
import { useCommentStore } from '@/stores/comment'

const commentStore = useCommentStore()
const statusFilter = ref('pending')

const getStatusBadge = (status: string) => {
  const badges = {
    pending: { class: 'bg-yellow-500 text-black', text: 'Pending' },
    approved: { class: 'bg-green-500 text-white', text: 'Approved' },
    rejected: { class: 'bg-red-500 text-white', text: 'Rejected' },
    spam: { class: 'bg-orange-500 text-white', text: 'Spam' },
  }
  return badges[status as keyof typeof badges] || badges.pending
}

onMounted(() => {
  commentStore.fetchComments({ status: statusFilter.value })
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Comment Moderation</h1>
    
    <Card>
      <CardHeader>
        <CardTitle>Pending Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Author</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="comment in commentStore.comments" :key="comment.id">
              <TableCell>{{ comment.author_name }}</TableCell>
              <TableCell class="max-w-md truncate">{{ comment.content }}</TableCell>
              <TableCell>
                <Badge :class="getStatusBadge(comment.status).class">
                  {{ getStatusBadge(comment.status).text }}
                </Badge>
              </TableCell>
              <TableCell>{{ new Date(comment.created_at).toLocaleDateString() }}</TableCell>
              <TableCell class="text-right">
                <div class="flex gap-2 justify-end">
                  <Button size="sm" variant="outline" @click="commentStore.approveComment(comment.id)">
                    <CheckCircle class="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" @click="commentStore.rejectComment(comment.id)">
                    <XCircle class="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" @click="commentStore.markAsSpam(comment.id)">
                    <AlertTriangle class="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" @click="commentStore.deleteComment(comment.id)">
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>
