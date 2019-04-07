import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Header from '@/components/Header'
import Worklist from '@/components/Worklist'
import Work from '@/components/Work'
import DirectCost from '@/components/DirectCost'
import DirectCostDetail from '@/components/DirectCostDetail'
import DirectCostUpdate from '@/components/DirectCostUpdate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main',
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
    },
    {
      path: '/work',
      name: 'Work',
      component: Work
    },
    {
      path: '/directcost',
      name: 'DirectCost',
      component: DirectCost,
      props: true
    },
    {
      path: '/directcostdetail',
      name: 'DirectCostDetail',
      component: DirectCostDetail,
      props: true
    },
    {
      path: '/directcostupdate',
      name: 'DirectCostUpdate',
      component: DirectCostUpdate,
      props: true
    }
  ]
})
