import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/Layout"
import Home from "@/views/Home"
import GoodsList from "@/views/goods/List"
import GoodsCreate from "@/views/goods/Create"
import {getToken} from "@/utils/token"
import Login from "@/views/Login"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children:[
      {
        name:"home",
        path:"",
        component:Home,
      },
      {
        name:"goodslist",
        path:"goods/list",
        component:GoodsList
      },
      {
        name:"goodscreate",
        path:"goods/create",
        component:GoodsCreate
      },
    ]
  },
  {
    name:"login",
    path:"/login",
    component:Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  let token = getToken();
  if(!token){//还没登录
    if(to.path !== "/login"){
      next({name: "login", query:{redirect: to.path}});
    }
  }
  //登陆了或者不需要登录
  next();//去目标页面

});
export default router
