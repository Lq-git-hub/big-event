import { createRouter, createWebHistory } from 'vue-router'
import { useUserstore} from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login',component:()=> import('@/views/login/LoginPage.vue')},
    {
      path:'/',
      component:()=> import('@/views/layout/LayoutContainer.vue'),
      redirect:'/article/manage',
      children:[
        {path:'/article/manage',component:()=>import('@/views/article/ArticleManage.vue')},
        {path:'/article/channel',component:()=>import('@/views/article/ArticleChannel.vue')},
        {path:'/user/profile',component:()=>import('@/views/user/UserProfile.vue')},
        {path:'/user/avatar',component:()=>import('@/views/user/UserAvatar.vue')},
        {path:'/user/password',component:()=>import('@/views/user/UserPassword.vue')}
      ]
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserstore()
  // 如果用户没有token且访问的不是登录页，重定向到登录页
  if (!userStore.token && to.path !== '/login') {
    return '/login'
  }

  // 如果用户有token且访问的是登录页，重定向到首页
  if (userStore.token && to.path === '/login') {
    return '/'
  }
})

export default router
