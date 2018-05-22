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
import Article from 'components/article/article'
import ArticleDetail from 'components/article/article-detail'

Vue.use(Router)

let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
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
      path: '/article',
      name: 'article',
      component: Article,
      children: [
      {
        path: ':id',
        component: ArticleDetail
      }
      ]
    },
    {
      path: '/write',
      name: 'write',
      component: Write
    },
    {
      path: '/personalcenter',
      component: personalcenter,
      name: 'personalcenter',
      meta: {requireLogin: true},
      children: [
        {
          path: '',
          name: 'personalcenter',
          component: profile,
          meta: {requireLogin: true}
        },
        {
          path: 'profile',
          name: 'personalcenter-profile',
          component: profile,
          meta: {requireLogin: true}
        },
        {
          path: 'resetpwd',
          name: 'personalcenter-resetpwd',
          component: resetpwd,
          meta: {requireLogin: true}
        },
        {
          path: 'posts',
          name: 'personalcenter-posts',
          component: posts,
          meta: {requireLogin: true}
        },
        {
          path: 'favorites',
          name: 'personalcenter-favorites',
          component: favorites
          // meta: {requireLogin: true}
        },
        {
          path: 'messages',
          name: 'personalcenter-messages',
          component: messages,
          meta: {requireLogin: true}
        },
        {
          path: 'tasks',
          name: 'personalcenter-tasks',
          component: tasks,
          meta: {requireLogin: true}
        }
      ]
    }
  ],

})

// router.beforeEach(async (to, from, next) => {
//   const { name, meta } = to;
//   const { requireLogin } = meta;
//   if (name === 'login') {  // 如果是登录页则用next方法resolve掉这个钩子，如果不是，进行到下一个判断
//     return next();   
//   }
//   const needLogin = requireLogin && !window.localStorage.getItem('token');  // 从store中读取是否获取了已登录的信息
//   if (needLogin) {
//     return next({   //  如果没有则跳转到登录页，将当前路由路径放到参数中
//       name: 'login'
//       // params: { back: to },
//     });
//   }
//   return next();  
// })


router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem('token') 
  if (to.matched.some(record => record.meta.requireLogin) && (!token || token === null)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
