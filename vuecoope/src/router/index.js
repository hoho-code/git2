import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'//首页
import Regist from '../views/Regist.vue'//注册页
import Login from '../views/Login.vue'//登录页
import AdminLogin from '../views/AdminLogin.vue'//管理员登录页
import Admin from '../views/Admin.vue'//后台页面
import Action from '../components/Action.vue'//首页的右下边活动页面
import Lostinfo from '../views/Lostinfo.vue'
import Goodsinfo from '../views/Goodsinfo.vue'
import Lost from '../components/Lost.vue'//失物启事提交页面
import Find from '../components/Find.vue'//招领启事提交页面
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      //首页子页面（右下）
      path: 'action',
      component: Action,
    },
    {
      path: 'lostinfo',
      component: Lostinfo
    },
    {
      path: 'goodsinfo',
      component: Goodsinfo
    },
    {
      path: 'lost',
      component: Lost
    },
    {
      path: 'find',
      component: Find
    }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/regist',
    name: 'Regist',
    component: Regist
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/AdminLogin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  }
]

const router = new VueRouter({
  routes
})

export default router
