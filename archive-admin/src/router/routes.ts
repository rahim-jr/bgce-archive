import AboutPage from '@/pages/AboutPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import MainLayout from '@/components/layouts/MainLayout.vue'
import LoginPage from '@/pages/LoginPage.vue'
import CategoryHierarchyPage from '@/pages/archive/CategoryHierarchyPage.vue'
import ProfilePage from '@/pages/profile/ProfilePage.vue'

export const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true },
      },
      {
        path: 'archive',
        name: 'archive',
        meta: { requiresAuth: true },
        children: [
          {
            path: 'categories',
            name: 'archive-categories',
            component: CategoryHierarchyPage,
          },
        ],
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfilePage,
        meta: { requiresAuth: true },
      },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
]
