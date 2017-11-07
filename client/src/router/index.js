import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/home/HomePage'
import LoginPage from '@/components/login/LoginPage'
import SignUpPage from '@/components/login/SignUpPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'SignUpPage',
      component: SignUpPage
    }
  ],
  mode: 'history'
})
