import Vue from 'vue'
// import Router from 'vue-router'
import Router from '@/vue-router'
// import store from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/home'),
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/vue-router/about'),
    },
    {
      path: '/vuex',
      name: 'VuexDemo',
      component: () => import('@/vuex/VuexDemo'),
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/pages/NotFound')
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   // console.log(to, from)
//   next()
//   // to.meta.from = from.name
//   // if (to.matched.some(record => record.meta.requiresAuth)) {
//   //   if (!store.getters.hasLogin) {

//   //   } else {
//   //     next()
//   //   }
//   // } else {
//   //   next()
//   // }
// })

export default router
