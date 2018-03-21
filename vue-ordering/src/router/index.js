import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Menu from '../components/Menu'
import Admin from '../components/Admin'
import Login from '../components/Login'
import Register from '../components/Register'
import About from '../components/about/About'

// 二级路由
import Contact from '../components/about/Contact'
import Delivery from '../components/about/Delivery'
import History from '../components/about/History'
import OrderingGuide from '../components/about/OrderingGuide'

// 三级路由
import Phone from '../components/about/contact/Phone'
import PersonName from '../components/about/contact/PersonName'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      // component: Home
      components: {
        default: Home, // 默认显示Home组件
        'orderingGuide': OrderingGuide,
        'delivery': Delivery,
        'history': History
      }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      // beforeEnter(to, next, from) {
      //   alert('非登录状态不能此页面')
      // }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      children: [
        {
          path: 'path',
          name: 'Contact',
          component: Contact,
          children: [
            {
              path: 'phone',
              name: 'Phone',
              component: Phone
            },
            {
              path: 'personName',
              name: 'PersonName',
              component: PersonName
            }
          ]
        },
        {
          path: 'delivery',
          name: 'Delivery',
          component: Delivery
        },
        {
          path: 'history',
          name: 'History',
          component: History
        },
        {
          path: 'orderingGuide',
          name: 'OrderingGuide',
          component: OrderingGuide
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '*',
      redirect: '/home'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // return {
      // x: 0,
      // y: 100
      // selector: 'button'
    // }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 全局守卫
// 在点击任何一个路由之前，都会执行
// router.beforeEach((to, from, next) => {
//   /**
//    * to: 进入到哪个路由
//    * from: 从哪个路由跳转的
//    * next: 决定是否要继续进行下去，是一个函数，如果执行next()，则跳转到下一个路由
//    *       否则不跳转，所以按照刚刚说的，在未登录的情况下，如果当前页面不是登录页，则
//    *       不执行next()或者执行next('/login')，如果是登录状态，路由跳转的执行执行next()
//    * */
//   if (to.path === '/login' || to.path === '/register') {
//     next()
//   } else {
//     alert('尚未登录，请登录或注册')
//     next('/login')
//   }
// })

// 后置钩子
// router.afterEach((to, from) => {
//
// })

export default router
