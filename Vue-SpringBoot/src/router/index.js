import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'//组件的位置
import Login from '@/components/Login'
import Students from '@/components/Students'
import Add from '@/components/Add'
import Update from '@/components/Update'
import Books from '@/components/Books'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',//系统的首页面url
      name: 'Login',
      component: Login//对应上文的import
    },{
      path: '/index',//系统的首页面url
      name: 'index',
      component: Index//对应上文的import

    },
    
   {
      path: '/students',
      name: 'students',
      component : Students
    },{
      path: '/add',
      name: 'add',
      component : Add
    },{
      path: '/update',
      name: 'update',
      component : Update
    }
    ,{
      path: '/books',
      name: 'books',
      component : Books
    }
  ]
})
