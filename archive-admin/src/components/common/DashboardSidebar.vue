<script setup lang="ts">
import { LayoutDashboard, FolderTree, FileText, MessageSquare, HeadphonesIcon, User } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    url: '/',
  },
  {
    title: 'Categories',
    icon: FolderTree,
    url: '/categories',
  },
  {
    title: 'Posts',
    icon: FileText,
    url: '/posts',
  },
  {
    title: 'Comments',
    icon: MessageSquare,
    url: '/comments',
  },
  {
    title: 'Support',
    icon: HeadphonesIcon,
    url: '/support',
  },
]
</script>

<template>
  <Sidebar>
    <SidebarHeader class="border-b px-6 py-4">
      <div class="flex items-center gap-2">
        <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <span class="text-primary-foreground font-bold text-sm">AA</span>
        </div>
        <div>
          <h2 class="font-semibold text-sm">Archive Admin</h2>
          <p class="text-xs text-muted-foreground">Admin Portal</p>
        </div>
      </div>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Management</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in menuItems" :key="item.title">
              <SidebarMenuButton as-child>
                <router-link :to="item.url" class="flex items-center gap-3">
                  <component :is="item.icon" class="h-4 w-4" />
                  <span>{{ item.title }}</span>
                </router-link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter class="border-t p-4">
      <router-link to="/profile" class="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted">
        <User class="h-4 w-4" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">{{ authStore.user?.full_name || 'User' }}</p>
          <p class="text-xs text-muted-foreground truncate">{{ authStore.user?.email }}</p>
        </div>
      </router-link>
    </SidebarFooter>
  </Sidebar>
</template>
