<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
      >
      </v-toolbar-side-icon>

      <v-toolbar-title class="white--text">{{ this.$route.meta.title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="./assets/hanwha.jpg">
          </v-list-tile-avatar>

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

          <router-link :to="{
            name: item.link
          }">
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </router-link>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: null,
      items: [
        { title: '외주공사(접수대기) 리스트', icon: 'dashboard', link: 'OverheadCost' },
        { title: '품질평가 리스트', icon: 'question_answer', link: 'DirectCost' },
        { title: '정산현황', icon: 'question_answer', link: 'Work' },
        { title: '표준단가계약', icon: 'question_answer', link: 'DirectCostDetail' },
        { title: '작업현황조회', icon: 'question_answer', link: 'DirectCostUpdate' },
        { title: '시설공사 게시판', icon: 'question_answer', link: 'Work' },
        { title: '협력사 공지', icon: 'question_answer', link: 'Work' }
      ],
      corpName: '한화시스템/ICT'
    }
  }
}
</script>

<style scoped>
.v-toolbar {
  position: sticky;
}
</style>
