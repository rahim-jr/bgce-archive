<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Edit, Trash2, Plus, MoreHorizontal, CheckCircle, Clock, XCircle, Filter } from "lucide-vue-next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSubcategoryStore } from "@/stores/subcategory"
import { useCategoryStore } from "@/stores/category"
import { useConfirm } from "@/composables/useConfirm"
import { MESSAGES } from "@/constants/messages"
import SubcategoryModal from "@/components/platform/SubcategoryModal.vue"
import type { Subcategory, CreateSubcategoryRequest, UpdateSubcategoryRequest } from "@/types/api"

const subcategoryStore = useSubcategoryStore()
const categoryStore = useCategoryStore()
const { confirm } = useConfirm()

const isModalOpen = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const selectedSubcategory = ref<Subcategory | null>(null)
const selectedParentId = ref<number | undefined>(undefined)

const filteredSubcategories = computed(() => {
    if (!selectedParentId.value) {
        return subcategoryStore.subcategories
    }
    return subcategoryStore.subcategories.filter(s => s.parent_id === selectedParentId.value)
})

const handleCreate = () => {
    modalMode.value = 'create'
    selectedSubcategory.value = null
    isModalOpen.value = true
}

const handleEdit = (subcategory: Subcategory) => {
    modalMode.value = 'edit'
    selectedSubcategory.value = subcategory
    isModalOpen.value = true
}

const handleModalSubmit = async (data: CreateSubcategoryRequest | UpdateSubcategoryRequest) => {
    if (modalMode.value === 'create') {
        await subcategoryStore.createSubcategory(data as CreateSubcategoryRequest)
    } else if (selectedSubcategory.value) {
        await subcategoryStore.updateSubcategory(selectedSubcategory.value.id, data as UpdateSubcategoryRequest)
    }
}

const handleDelete = async (subcategory: Subcategory) => {
    const confirmed = await confirm({
        title: 'Delete Subcategory',
        message: `Are you sure you want to delete "${subcategory.label}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'danger',
    })

    if (confirmed) {
        await subcategoryStore.deleteSubcategory(subcategory.id)
    }
}

const handleParentFilter = (parentId: number | undefined) => {
    selectedParentId.value = parentId
}

const getCategoryName = (parentId: number) => {
    const category = categoryStore.categories.find(c => c.id === parentId)
    return category?.label || 'Unknown'
}

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'approved':
            return { icon: CheckCircle, text: 'Approved', class: 'bg-green-500 hover:bg-green-600 text-white' }
        case 'pending':
            return { icon: Clock, text: 'Pending', class: 'bg-yellow-500 hover:bg-yellow-600 text-black' }
        case 'rejected':
            return { icon: XCircle, text: 'Rejected', class: 'bg-red-500 hover:bg-red-600 text-white' }
        default:
            return { icon: Clock, text: status, class: 'bg-gray-200 text-gray-700' }
    }
}

onMounted(() => {
    categoryStore.fetchCategories()
    subcategoryStore.fetchSubcategories()
})
</script>

<template>
    <Card class="bg-gradient-card border-0 shadow-md">
        <CardHeader>
            <CardTitle class="flex items-center justify-between">
                <span class="flex items-center gap-2">
                    <Layers class="h-5 w-5 text-primary" />
                    Subcategory Management
                </span>
                <div class="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline" size="sm">
                                <Filter class="h-4 w-4 mr-2" />
                                {{ selectedParentId ? getCategoryName(selectedParentId) : 'All Categories' }}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" class="w-[200px]">
                            <DropdownMenuItem @click="handleParentFilter(undefined)">
                                All Categories
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                v-for="category in categoryStore.categories" 
                                :key="category.id"
                                @click="handleParentFilter(category.id)"
                            >
                                {{ category.label }}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="default" size="sm" @click="handleCreate">
                        <Plus class="h-4 w-4 mr-2" />
                        Create Subcategory
                    </Button>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div v-if="subcategoryStore.loading" class="p-8 text-center text-muted-foreground flex justify-center items-center gap-2">
                <Clock class="animate-spin h-5 w-5" />
                <span>Loading subcategories...</span>
            </div>
            
            <div v-else-if="subcategoryStore.error" class="p-8 text-center text-red-500 bg-red-50 border border-red-200 rounded-lg">
                Error: {{ subcategoryStore.error }}
                <Button variant="link" class="mt-2" @click="subcategoryStore.fetchSubcategories()">Retry</Button>
            </div>

            <div v-else-if="filteredSubcategories.length === 0" class="p-8 text-center text-muted-foreground">
                {{ MESSAGES.EMPTY.NO_SUBCATEGORIES }}
            </div>
            
            <Table v-else>
                <TableHeader>
                    <TableRow>
                        <TableHead>Label / Slug</TableHead>
                        <TableHead>Parent Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow v-for="subcategory in filteredSubcategories" :key="subcategory.id" class="hover:bg-muted/50">
                        <TableCell class="font-medium">
                            <p class="text-foreground">{{ subcategory.label }}</p>
                            <p class="text-sm text-muted-foreground">/{{ subcategory.slug }}</p>
                        </TableCell>
                        <TableCell>
                            <Badge variant="outline" class="font-normal">
                                {{ getCategoryName(subcategory.parent_id) }}
                            </Badge>
                        </TableCell>
                        <TableCell class="text-muted-foreground max-w-xs truncate">
                            {{ subcategory.description || 'No description' }}
                        </TableCell>
                        <TableCell class="text-muted-foreground">
                            {{ new Date(subcategory.created_at).toLocaleDateString() }}
                        </TableCell>
                        <TableCell>
                            <Badge 
                                :class="getStatusBadge(subcategory.status).class"
                                class="capitalize flex items-center gap-1 w-fit">
                                <component :is="getStatusBadge(subcategory.status).icon" class="h-3 w-3" />
                                {{ getStatusBadge(subcategory.status).text }}
                            </Badge>
                        </TableCell>
                        <TableCell class="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger as-child>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal class="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem @click="handleEdit(subcategory)">
                                        <Edit class="mr-2 h-4 w-4" />
                                        Edit Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem @click="handleDelete(subcategory)" class="text-red-600 focus:text-red-700">
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

    <SubcategoryModal
        v-model:open="isModalOpen"
        :mode="modalMode"
        :subcategory="selectedSubcategory"
        :categories="categoryStore.categories"
        @submit="handleModalSubmit"
    />
</template>
