<template>
  <v-app>
    <tool-bar/>
    <nav-drawer/>
    <v-content>
      <transition>
        <keep-alive :include="['DirectCost']">
          <router-view/>
        </keep-alive>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import NavDrawer from './components/common/NavDrawer'
import ToolBar from './components/common/ToolBar'

export default {
  name: 'App',
  components: {
    NavDrawer,
    ToolBar
  },
  data () {
    return {}
  },
  created () {
    this.$http.get(this.$path + '/m/getCorpInfo.do').then(resp => {
      console.log(resp)
      this.setCorpInfo(resp.data.response)
    }).catch(error => {
      var errorPage
      console.log(error)
      if (this.getRunMode === 'local') {
        errorPage = error.response.request.responseURL.replace('7070', '9090')
      } else {
        errorPage = error.response.request.responseURL
      }
      window.location.href = errorPage
    })
  },
  computed: {
    ...mapGetters(['getDrawer', 'getRunMode', 'getContextPath'])
  },
  methods: {
    ...mapMutations(['setCorpInfo', 'setContextPath', 'onClickDrawer'])
  }
}
</script>

<style scoped>
.v-toolbar {
  position: sticky;
}
</style>
