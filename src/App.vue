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
      this.setCorpInfo(resp)
    })
  },
  computed: {
    ...mapGetters(['getDrawer'])
  },
  methods: {
    ...mapMutations(['setCorpInfo', 'onClickDrawer'])
  }
}
</script>

<style scoped>
.v-toolbar {
  position: sticky;
}
</style>
