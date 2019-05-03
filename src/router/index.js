import Vue from 'vue'
import Router from 'vue-router'
import Work from '@/components/Work'
import DirectCost from '@/components/DirectCost'
import DirectCost1 from '@/components/DirectCost1'
import DirectCostDetail from '@/components/DirectCostDetail'
import DirectCostUpdate from '@/components/DirectCostUpdate'
import OverheadCost from '@/components/OverheadCost'
import AttachFile from '@/components/AttachFile'

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
        title: '직접비 현황',
        icon: 'add'
      }
    },
    {
      path: '/directcost1',
      name: 'DirectCost1',
      component: DirectCost1,
      props: true,
      meta: {
        title: '직접비 현황',
        icon: 'add'
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
    },
    {
      path: '/attachfile',
      name: 'AttachFile',
      component: AttachFile,
      props: true,
      meta: {
        title: '증빙자료'
      }
    }
  ]
})
