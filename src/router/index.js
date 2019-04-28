import Vue from 'vue'
import Router from 'vue-router'
import Work from '@/components/Work'
import DirectCost from '@/components/DirectCost'
import DirectCostDetail from '@/components/DirectCostDetail'
import DirectCostUpdate from '@/components/DirectCostUpdate'
import OverheadCost from '@/components/OverheadCost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/work',
      name: 'Work',
      component: Work,
      meta: {
        title: '정산서 현황'
      }
    },
    {
      path: '/directcost',
      name: 'DirectCost',
      component: DirectCost,
      props: true,
      meta: {
        title: '직접비 현황'
      }
    },
    {
      path: '/directcostdetail',
      name: 'DirectCostDetail',
      component: DirectCostDetail,
      props: true,
      meta: {
        title: '직접비 추가'
      }
    },
    {
      path: '/directcostupdate',
      name: 'DirectCostUpdate',
      component: DirectCostUpdate,
      props: true,
      meta: {
        title: '직접비 수정'
      }
    },
    {
      path: '/overheadcost',
      name: 'OverheadCost',
      component: OverheadCost,
      props: true,
      meta: {
        title: '간접비 현황'
      }
    }
  ]
})
