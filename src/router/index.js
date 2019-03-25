import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Header from '@/components/Header'
import Worklist from '@/components/Worklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '',
          component: Header
        },
        {
          path: '',
          component: Worklist
        }
      ]
    }
  ]
})
