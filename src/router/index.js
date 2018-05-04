import Vue from 'vue'
import Router from 'vue-router'

import Index from 'components/index/index'
import Login from 'components/login/login'
import Register from 'components/register/register'
import Write from 'components/write/write'
import personalcenter from 'components/personalcenter'
import profile from 'components/in-personalcenter/profile'
import resetpwd from 'components/in-personalcenter/resetpwd'
import posts from 'components/in-personalcenter/posts'
import favorites from 'components/in-personalcenter/favorites'
import messages from 'components/in-personalcenter/messages'
import tasks from 'components/in-personalcenter/tasks'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/write',
      name: 'write',
      component: Write
    },
    {
      path: '/personalcenter',
      component: personalcenter,
      children: [
        {
          path: '',
          name: 'personalcenter',
          component: profile
        },
        {
          path: 'profile',
          name: 'personalcenter-profile',
          component: profile
        },
        {
          path: 'resetpwd',
          name: 'personalcenter-resetpwd',
          component: resetpwd
        },
        {
          path: 'posts',
          name: 'personalcenter-posts',
          component: posts
        },
        {
          path: 'favorites',
          name: 'personalcenter-favorites',
          component: favorites
        },
        {
          path: 'messages',
          name: 'personalcenter-messages',
          component: messages
        },
        {
          path: 'tasks',
          name: 'personalcenter-tasks',
          component: tasks
        }
      ]
    }
  ]
})
