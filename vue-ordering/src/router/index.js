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

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
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
  ]
})
