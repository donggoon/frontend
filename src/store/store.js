import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    drawer: true,
    items: [
      // { title: '외주공사(접수대기)리스트', icon: 'dashboard', link: this.$path + '/comp/WORK_WORK_INFO_LIST_05.do' },
      // { title: '품질평가리스트', icon: 'dashboard', link: this.$path + '/comp/WORK_WORK_INFO_LIST_06.do' },
      { title: '정산현황', icon: require('@/assets/dashboard-24px.svg'), link: 'WorkList' } // ,
      // { title: '표준단가계약', icon: 'dashboard', link: this.$path + '/comp/WORK_CORP_MAT_INFO_LIST_02.do' },
      // { title: '작업현황조회', icon: 'dashboard', link: this.$path + '/comp/WORK_WORK_INFO_LIST_03.do' },
      // { title: '시설공사 게시판', icon: 'dashboard', link: this.$path + '/bbs/WORK_BBS_INFO_LIST_02.do' },
      // { title: '시설공사 게시판', icon: 'dashboard', link: this.$path + '/bbs/WORK_BBS_INFO_LIST_01.do' }
    ],
    corpInfo: [],
    corpName: '',
    runMode: location.host === ('localhost:7070' || 'localhost:9090') ? 'local' : (location.host === ('55.101.200.107:9443' || 'stg-us.hanwhatechwin.co.kr:9443') ? 'dev' : 'prod'),
    contextPath: '',
    icons: {
      edit: require('@/assets/edit-24px.svg'),
      close: require('@/assets/close-24px.svg'),
      dashboard: require('@/assets/dashboard-24px.svg'),
      add: require('@/assets/add-24px.svg'),
      menu: require('@/assets/menu-24px.svg'),
      warning: require('@/assets/warning-24px.svg')
    }
  },
  getters,
  mutations,
  actions
})
