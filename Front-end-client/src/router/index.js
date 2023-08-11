import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutViewVue from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import ThemeChangerView from '../views/ThemeChangerView.vue'
import AccountSettingsView from '../views/AccountSettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: AboutViewVue
    },
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/profileView/',
      name: 'profileView',
      component: ProfileView
    },
    {
      path: '/themechanger/',
      name: 'themeChanger',
      component: ThemeChangerView
    },
    {
      path: '/accountsettings/',
      name: 'accountSettings',
      component: AccountSettingsView
    }
  ]
})

export default router
