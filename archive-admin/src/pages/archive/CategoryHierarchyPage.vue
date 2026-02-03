<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Archive, Edit, Trash2, CheckCircle, Clock, XCircle, MoreHorizontal, Plus, ChevronRight, Home } from "lucide-vue-next"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCategoryStore } from "@/stores/category"
import { useSubcategoryStore } from "@/stores/subcategory"
import { useConfirm } from "@/composables/useConfirm"
import CategoryModal from "@/components/platform/CategoryModal.vue"
import SubcategoryModal from "@/components/platform/SubcategoryModal.vue"
import type { Category, CreateCategoryRequest, UpdateCategoryRequest, Subcategory, CreateSubcategoryRequest, UpdateSubcategoryRequest } from "@/types/api"

const route = useRoute()
const router = useRouter()
const categoryStore = useCategoryStore()
const subcategoryStore = useSubcategoryStore()
const { confirm } = useConfirm()

const isCategoryModalOpen = ref(false)
const isSubcategoryModalOpen = ref(false)
const categoryModalMode = ref<'create' | 'edit'>('create')
const subcategoryModalMode = ref<'create' | 'edit'>('create')
const selectedCategory = ref<Category | null>(null)
const selectedSubcategory = ref<Subcategory | null>(null)
const currentParentId = ref<number | undefined>(undefined)

// Breadcrumb trail
const breadcrumbs = ref<Array<{ id: number; label: string }>>([])

// Get current view items (either top-level categories or subcategories of current parent)
const currentItems = computed(() => {
    if (!currentParentId.value) {
        // Show only top-level categories (no parent_id)
        // Backend already filters this, but double-check on frontend
        return categoryStore.categories.filter(cat => !cat.parent_id)
    } else {
        // Show subcategories of current parent
        return subcategoryStore.subcategories.filter(sub => sub.parent_id === currentParentId.value)
    }
})

const isViewingCategories = computed(() => !currentParentId.value)

// Watch route changes
watch(() => route.query.parent, (newParent) => {
    if (newParent) {
        currentParentId.value = parseInt(newParent as string)
        buildBreadcrumbs()
    } else {
        currentParentId.value = undefined
        breadcrumbs.value = []
    }
}, { immediate: true })

// Build breadcrumb trail
const buildBreadcrumbs = () => {
    breadcrumbs.value = []
    if (!currentParentId.value) return

    let parentId: number | undefined = currentParentId.value
    const trail: Array<{ id: number; label: string }> = []

    // Build trail by walking up the hierarchy
    while (parentId) {
        const item = findItemById(parentId)
        if (item) {
            trail.unshift({ id: item.id, label: item.label })
            parentId = item.parent_id
        } else {
            break
        }
    }

    breadcrumbs.value = trail
}

const findItemById = (id: number): Category | Subcategory | undefined => {
    return categoryStore.categories.find(c => c.id === id) || 
           subcategoryStore.subcategories.find(s => s.id === id)
}

// Navigation
const navigateToParent = (parentId?: number) => {
    if (parentId) {
        router.push({ query: { parent: parentId.toString() } })
    } else {
        router.push({ query: {} })
    }
}

const navigateInto = (item: Category | Subcategory) => {
    router.push({ query: { parent: item.id.toString() } })
}

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
    await loadData()
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
        await loadData()
    }
}

const handleUpdateCategoryStatus = async (category: Category, newStatus: Category['status']) => {
    try {
        await categoryStore.updateCategory(category.slug, { status: newStatus } as any)
        await loadData()
    } catch (error) {
        console.error(`Failed to update status for ${category.label}:`, error)
    }
}

// Subcategory handlers
const handleCreateSubcategory = () => {
    subcategoryModalMode.value = 'create'
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
        // Set parent_id to current parent
        const createData = { ...data, parent_id: currentParentId.value } as CreateSubcategoryRequest
        await subcategoryStore.createSubcategory(createData)
    } else if (selectedSubcategory.value) {
        await subcategoryStore.updateSubcategory(selectedSubcategory.value.id, data as UpdateSubcategoryRequest)
    }
    isSubcategoryModalOpen.value = false
    await loadData()
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
        await loadData()
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

const hasChildren = (item: Category | Subcategory): boolean => {
    return subcategoryStore.subcategories.some(sub => sub.parent_id === item.id)
}

const loadData = async () => {
    await categoryStore.fetchCategories()
    await subcategoryStore.fetchSubcategories()
    buildBreadcrumbs()
}

onMounted(() => {
    loadData()
})
</script>

<template>
    <Card class="bg-gradient-card border-0 shadow-md">
        <CardHeader>
            <div class="space-y-3">
                <!-- Breadcrumbs -->
                <div v-if="breadcrumbs.length > 0" class="flex items-center gap-2 text-sm text-muted-foreground">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        @click="navigateToParent()"
                        class="h-8 px-2"
                    >
                        <Home class="h-4 w-4" />
                    </Button>
                    <template v-for="(crumb, index) in breadcrumbs" :key="crumb.id">
                        <ChevronRight class="h-4 w-4" />
                        <Button 
                            variant="ghost" 
                            size="sm"
                            @click="navigateToParent(crumb.id)"
                            :class="index === breadcrumbs.length - 1 ? 'font-semibold text-foreground' : ''"
                            class="h-8"
                        >
                            {{ crumb.label }}
                        </Button>
                    </template>
                </div>

                <!-- Title and Actions -->
                <CardTitle class="flex items-center justify-between">
                    <span class="flex items-center gap-2">
                        <Archive class="h-5 w-5 text-primary" />
                        {{ isViewingCategories ? 'Categories' : breadcrumbs[breadcrumbs.length - 1]?.label || 'Subcategories' }}
                    </span>
                    <Button 
                        variant="default" 
                        size="sm" 
                        @click="isViewingCategories ? handleCreateCategory() : handleCreateSubcategory()"
                    >
                        <Plus class="h-4 w-4 mr-2" />
                        {{ isViewingCategories ? 'Create Category' : 'Create Subcategory' }}
                    </Button>
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <div v-if="categoryStore.loading || subcategoryStore.loading" class="p-8 text-center text-muted-foreground flex justify-center items-center gap-2">
                <Clock class="animate-spin h-5 w-5" />
                <span>Loading...</span>
            </div>
            
            <div v-else-if="categoryStore.error || subcategoryStore.error" class="p-8 text-center text-red-500 bg-red-50 border border-red-200 rounded-lg">
                Error: {{ categoryStore.error || subcategoryStore.error }}
                <Button variant="link" class="mt-2" @click="loadData">Retry</Button>
            </div>

            <div v-else-if="currentItems.length === 0" class="p-8 text-center text-muted-foreground">
                {{ isViewingCategories ? 'No categories found. Click "Create Category" to add one.' : 'No subcategories found. Click "Create Subcategory" to add one.' }}
            </div>
            
            <Table v-else>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name / Slug</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow 
                        v-for="item in currentItems" 
                        :key="item.id"
                        class="hover:bg-muted/50"
                        :class="hasChildren(item) ? 'cursor-pointer' : ''"
                    >
                        <TableCell class="font-medium">
                            <div 
                                class="flex items-center gap-2"
                                @click="hasChildren(item) ? navigateInto(item) : null"
                            >
                                <Archive class="h-4 w-4 text-primary" />
                                <div>
                                    <p class="text-foreground flex items-center gap-2">
                                        {{ item.label }}
                                        <ChevronRight v-if="hasChildren(item)" class="h-4 w-4 text-muted-foreground" />
                                    </p>
                                    <p class="text-sm text-muted-foreground">/{{ item.slug }}</p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell class="text-muted-foreground max-w-xs truncate">
                            {{ item.description || 'No description' }}
                        </TableCell>
                        <TableCell class="text-muted-foreground">
                            {{ new Date(item.created_at).toLocaleDateString() }}
                        </TableCell>
                        <TableCell>
                            <Badge 
                                :class="getStatusBadge(item.status).class"
                                class="capitalize flex items-center gap-1 w-fit">
                                <component :is="getStatusBadge(item.status).icon" class="h-3 w-3" />
                                {{ getStatusBadge(item.status).text }}
                            </Badge>
                        </TableCell>
                        <TableCell class="text-right">
                            <div class="flex items-center justify-end gap-2">
                                <Button 
                                    v-if="hasChildren(item)"
                                    variant="outline" 
                                    size="sm"
                                    @click="navigateInto(item)"
                                >
                                    <ChevronRight class="h-3 w-3 mr-1" />
                                    View
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal class="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem @click="isViewingCategories ? handleEditCategory(item as Category) : handleEditSubcategory(item as Subcategory)">
                                            <Edit class="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        
                                        <template v-if="isViewingCategories && item.status !== 'approved'">
                                            <DropdownMenuItem @click="handleUpdateCategoryStatus(item as Category, 'approved')">
                                                <CheckCircle class="mr-2 h-4 w-4 text-green-600" />
                                                Approve
                                            </DropdownMenuItem>
                                        </template>
                                        <template v-if="isViewingCategories && item.status !== 'rejected'">
                                            <DropdownMenuItem @click="handleUpdateCategoryStatus(item as Category, 'rejected')">
                                                <XCircle class="mr-2 h-4 w-4 text-red-600" />
                                                Reject
                                            </DropdownMenuItem>
                                        </template>

                                        <DropdownMenuItem 
                                            @click="isViewingCategories ? handleDeleteCategory(item as Category) : handleDeleteSubcategory(item as Subcategory)" 
                                            class="text-red-600 focus:text-red-700"
                                        >
                                            <Trash2 class="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </TableCell>
                    </TableRow>
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

    <!-- Subcategory Modal (no parent selector needed - uses current parent) -->
    <SubcategoryModal
        v-model:open="isSubcategoryModalOpen"
        :mode="subcategoryModalMode"
        :subcategory="selectedSubcategory"
        :categories="categoryStore.categories"
        :preselected-parent-id="currentParentId"
        :hide-parent-selector="true"
        @submit="handleSubcategoryModalSubmit"
    />
</template>
