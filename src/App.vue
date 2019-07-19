<template>
  <v-app>
    <v-toolbar dark color="primary" absolute>
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
      >
      </v-toolbar-side-icon>

      <v-toolbar-title class="white--text">{{ this.$route.meta.title }}</v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ corpName }} 님 환영합니다!</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="onClickMenu(item)">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
export default {
  name: 'App',
  data () {
    return {
      drawer: true,
      items: [
        { title: '정산현황', icon: 'dashboard', link: 'WorkList' },
        { title: 'PC버전으로 보기', icon: 'dashboard', link: '/main/WORK_CORP_MAIN_LIST_01.do' }
      ],
      corpInfo: [],
      corpName: ''
    }
  },
  created () {
    this.$http.get(this.$path + '/m/getCorpInfo.do').then(resp => {
      this.corpInfo = resp.data.response
      this.corpName = this.corpInfo.coNm
    })
  },
  methods: {
    onClickMenu (item) {
      if (item.link === '/main/WORK_CORP_MAIN_LIST_01.do') {
        window.location.href = this.$path + item.link
      } else {
        this.$router.push({
          name: item.link
        })
      }
    }
  }
}
</script>

<style scoped>
.v-toolbar {
  position: sticky;
}
</style>
