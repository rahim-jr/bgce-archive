<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePostStore } from '@/stores/post'
import { useCategoryStore } from '@/stores/category'
import type { CreatePostRequest } from '@/types/api'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const categoryStore = useCategoryStore()

const isEdit = ref(!!route.params.id)
const form = ref<CreatePostRequest>({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  category_id: 0,
  status: 'draft',
  tags: [],
})

const handleSubmit = async () => {
  if (isEdit.value) {
    await postStore.updatePost(Number(route.params.id), form.value)
  } else {
    await postStore.createPost(form.value)
  }
  router.push('/posts')
}

onMounted(async () => {
  await categoryStore.fetchCategories()
  if (isEdit.value) {
    const post = await postStore.fetchPostById(Number(route.params.id))
    if (post) {
      form.value = { ...post }
    }
  }
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">{{ isEdit ? 'Edit' : 'Create' }} Post</h1>
    
    <Card>
      <CardHeader>
        <CardTitle>Post Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <Label>Title</Label>
            <Input v-model="form.title" required />
          </div>
          <div>
            <Label>Slug</Label>
            <Input v-model="form.slug" required />
          </div>
          <div>
            <Label>Category</Label>
            <select v-model="form.category_id" class="w-full p-2 border rounded" required>
              <option :value="0">Select category</option>
              <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
                {{ cat.label }}
              </option>
            </select>
          </div>
          <div>
            <Label>Content</Label>
            <textarea v-model="form.content" class="w-full p-2 border rounded min-h-[300px]" required />
          </div>
          <div class="flex gap-2">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" @click="router.push('/posts')">Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
