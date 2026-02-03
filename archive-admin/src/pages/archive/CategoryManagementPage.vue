<script setup lang="ts">
import { onMounted, ref, computed } from "vue"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Archive, Edit, Trash2, CheckCircle, Clock, XCircle, MoreHorizontal, Plus, ChevronDown, ChevronRight, Layers } from "lucide-vue-next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCategoryStore } from "@/stores/category"
import { useSubcategoryStore } from "@/stores/subcategory"
import { useConfirm } from "@/composables/useConfirm"
import { MESSAGES } from "@/constants/messages"
import CategoryModal from "@/components/platform/CategoryModal.vue"
import SubcategoryModal from "@/components/platform/SubcategoryModal.vue"
import type { Category, CreateCategoryRequest, UpdateCategoryRequest, Subcategory, CreateSubcategoryRequest, UpdateSubcategoryRequest } from "@/types/api"

const categoryStore = useCategoryStore()
const subcategoryStore = useSubcategoryStore()
const { confirm } = useConfirm()

const isCategoryModalOpen = ref(false)
const isSubcategoryModalOpen = ref(false)
const categoryModalMode = ref<'create' | 'edit'>('create')
const subcategoryModalMode = ref<'create' | 'edit'>('create')
const selectedCategory = ref<Category | null>(null)
const selectedSubcategory = ref<Subcategory | null>(null)
const expandedCategories = ref<Set<number>>(new Set())

// Computed property to organize data hierarchically
const hierarchicalData = computed(() => {
    return categoryStore.categories.map(category => ({
        category,
        subcategories: subcategoryStore.subcategories.filter(sub => sub.parent_id === category.id)
    }))
})

const toggleCategory = (categoryId: number) => {
    if (expandedCategories.value.has(categoryId)) {
        expandedCategories.value.delete(categoryId)
    } else {
        expandedCategories.value.add(categoryId)
    }
}

const isExpanded = (categoryId: number) => expandedCategories.value.has(categoryId)

// Category handlers
const handleCreateCategory = () => {
    categoryModalMode.value = 'create'
    selectedCategory.value = null
    isCategoryModalOpen.value = true
}

const handleEditCategory = (category: Category) => {
    categoryModalMode.value = 'edit'
    selectedCategory.value = category
    isCategoryModalOpen.value = true
}

const handleCategoryModalSubmit = async (data: CreateCategoryRequest | UpdateCategoryRequest) => {
    if (categoryModalMode.value === 'create') {
        await categoryStore.createCategory(data as CreateCategoryRequest)
    } else if (selectedCategory.value) {
        await categoryStore.updateCategory(selectedCategory.value.slug, data as UpdateCategoryRequest)
    }
    isCategoryModalOpen.value = false
}

const handleDeleteCategory = async (category: Category) => {
    const confirmed = await confirm({
        title: 'Delete Category',
        message: `Are you sure you want to delete "${category.label}"? This will also affect its subcategories.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        type: 'danger',
    })

    if (confirmed) {
        await categoryStore.deleteCategory(category.uuid)
    }
}

const handleUpdateCategoryStatus = async (category: Category, newStatus: Category['status']) => {
    try {
        await categoryStore.updateCategory(category.slug, { status: newStatus } as any)
    } catch (error) {
        console.error(`Failed to update status for ${category.label}:`, error)
    }
}

// Subcategory handlers
const handleCreateSubcategory = (parentCategory: Category) => {
    subcategoryModalMode.value = 'create'
    selectedCategory.value = parentCategory
    selectedSubcategory.value = null
    isSubcategoryModalOpen.value = true
}

const handleEditSubcategory = (subcategory: Subcategory) => {
    subcategoryModalMode.value = 'edit'
    selectedSubcategory.value = subcategory
    isSubcategoryModalOpen.value = true
}

const handleSubcategoryModalSubmit = async (data: CreateSubcategoryRequest | UpdateSubcategoryRequest) => {
    if (subcategoryModalMode.value === 'create') {
        await subcategoryStore.createSubcategory(data as CreateSubcategoryRequest)
    } else if (selectedSubcategory.value) {
        await subcategoryStore.updateSubcategory(selectedSubcategory.value.id, data as UpdateSubcategoryRequest)
    }
    isSubcategoryModalOpen.value = false
}

const handleDeleteSubcategory = async (subcategory: Subcategory) => {
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

const getStatusBadge = (status: string) => {
    switch (status) {
        case 'approved':
            return { icon: CheckCircle, text: 'Approved', class: 'bg-green-500 hover:bg-green-600 text-white' }
        case 'pending':
            return { icon: Clock, text: 'Pending', class: 'bg-yellow-500 hover:bg-yellow-600 text-black' }
        case 'rejected':
            return { icon: XCircle, text: 'Rejected', class: 'bg-red-500 hover:bg-red-600 text-white' }
        case 'deleted':
            return { icon: Trash2, text: 'Deleted', class: 'bg-gray-500 hover:bg-gray-600 text-white' }
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
                    <Archive class="h-5 w-5 text-primary" />
                    Category & Subcategory Management
                </span>
                <Button variant="default" size="sm" @click="handleCreateCategory">
                    <Plus class="h-4 w-4 mr-2" />
                    Create Category
                </Button>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div v-if="categoryStore.loading || subcategoryStore.loading" class="p-8 text-center text-muted-foreground flex justify-center items-center gap-2">
                <Clock class="animate-spin h-5 w-5" />
                <span>Loading...</span>
            </div>
            
            <div v-else-if="categoryStore.error || subcategoryStore.error" class="p-8 text-center text-red-500 bg-red-50 border border-red-200 rounded-lg">
                Error: {{ categoryStore.error || subcategoryStore.error }}
                <Button variant="link" class="mt-2" @click="() => { categoryStore.fetchCategories(); subcategoryStore.fetchSubcategories() }">Retry</Button>
            </div>

            <div v-else-if="hierarchicalData.length === 0" class="p-8 text-center text-muted-foreground">
                No categories found. Click "Create Category" to add one.
            </div>
            
            <Table v-else>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[40px]"></TableHead>
                        <TableHead>Name / Slug</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-for="item in hierarchicalData" :key="item.category.id">
                        <!-- Category Row -->
                        <TableRow class="hover:bg-muted/50 bg-muted/20">
                            <TableCell>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    class="h-6 w-6"
                                    @click="toggleCategory(item.category.id)"
                                    v-if="item.subcategories.length > 0"
                                >
                                    <ChevronRight v-if="!isExpanded(item.category.id)" class="h-4 w-4" />
                                    <ChevronDown v-else class="h-4 w-4" />
                                </Button>
                            </TableCell>
                            <TableCell class="font-semibold">
                                <div class="flex items-center gap-2">
                                    <Archive class="h-4 w-4 text-primary" />
                                    <div>
                                        <p class="text-foreground">{{ item.category.label }}</p>
                                        <p class="text-sm text-muted-foreground font-normal">/{{ item.category.slug }}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell class="text-muted-foreground max-w-xs truncate">
                                {{ item.category.description || 'No description' }}
                            </TableCell>
                            <TableCell class="text-muted-foreground">
                                {{ new Date(item.category.created_at).toLocaleDateString() }}
                            </TableCell>
                            <TableCell>
                                <Badge 
                                    :class="getStatusBadge(item.category.status).class"
                                    class="capitalize flex items-center gap-1 w-fit">
                                    <component :is="getStatusBadge(item.category.status).icon" class="h-3 w-3" />
                                    {{ getStatusBadge(item.category.status).text }}
                                </Badge>
                            </TableCell>
                            <TableCell class="text-right">
                                <div class="flex items-center justify-end gap-2">
                                    <Button 
                                        variant="outline" 
                                        size="sm"
                                        @click="handleCreateSubcategory(item.category)"
                                    >
                                        <Plus class="h-3 w-3 mr-1" />
                                        Add Sub
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger as-child>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal class="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem @click="handleEditCategory(item.category)">
                                                <Edit class="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            
                                            <template v-if="item.category.status !== 'approved'">
                                                <DropdownMenuItem @click="handleUpdateCategoryStatus(item.category, 'approved')">
                                                    <CheckCircle class="mr-2 h-4 w-4 text-green-600" />
                                                    Approve
                                                </DropdownMenuItem>
                                            </template>
                                            <template v-if="item.category.status !== 'rejected'">
                                                <DropdownMenuItem @click="handleUpdateCategoryStatus(item.category, 'rejected')">
                                                    <XCircle class="mr-2 h-4 w-4 text-red-600" />
                                                    Reject
                                                </DropdownMenuItem>
                                            </template>

                                            <DropdownMenuItem @click="handleDeleteCategory(item.category)" class="text-red-600 focus:text-red-700">
                                                <Trash2 class="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>

                        <!-- Subcategory Rows -->
                        <template v-if="isExpanded(item.category.id)">
                            <TableRow 
                                v-for="subcategory in item.subcategories" 
                                :key="`sub-${subcategory.id}`"
                                class="hover:bg-muted/30"
                            >
                                <TableCell></TableCell>
                                <TableCell class="pl-12">
                                    <div class="flex items-center gap-2">
                                        <Layers class="h-3 w-3 text-muted-foreground" />
                                        <div>
                                            <p class="text-foreground">{{ subcategory.label }}</p>
                                            <p class="text-sm text-muted-foreground">/{{ subcategory.slug }}</p>
                                        </div>
                                    </div>
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
                                            <DropdownMenuItem @click="handleEditSubcategory(subcategory)">
                                                <Edit class="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem @click="handleDeleteSubcategory(subcategory)" class="text-red-600 focus:text-red-700">
                                                <Trash2 class="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </template>
                    </template>
                </TableBody>
            </Table>
        </CardContent>
    </Card>

    <!-- Category Modal -->
    <CategoryModal
        v-model:open="isCategoryModalOpen"
        :mode="categoryModalMode"
        :category="selectedCategory"
        @submit="handleCategoryModalSubmit"
    />

    <!-- Subcategory Modal -->
    <SubcategoryModal
        v-model:open="isSubcategoryModalOpen"
        :mode="subcategoryModalMode"
        :subcategory="selectedSubcategory"
        :categories="categoryStore.categories"
        :preselected-parent-id="selectedCategory?.id"
        @submit="handleSubcategoryModalSubmit"
    />
</template>
