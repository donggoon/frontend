<template>
  <v-navigation-drawer
    :value="getDrawer"
    fixed
    right
    temporary
    stateless
  >
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ this.getCorpName }} 님 환영합니다!</v-list-tile-title>
        </v-list-tile-content>
        <i class="close-btn" @click="onClickDrawer"/>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider/>
      <v-list-tile
        v-for="item in getItems"
        :key="item.title"
      >
        <v-list-tile-action>
          <img :src="item.icon">
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title @click="onClickMenu(item)">{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getDrawer', 'getItems', 'getCorpInfo', 'getCorpName'])
  },
  methods: {
    ...mapMutations(['setCorpInfo', 'onClickDrawer', 'closeDrawer']),
    onClickMenu (item) {
      this.closeDrawer()
      if (item.link === 'WorkList') {
        this.$router.push({
          name: item.link
        })
      } else {
        window.location.href = item.link
      }
    }
  }
}
</script>

<style scoped>
.close-btn {
  width: 24px;
  height: 24px;
  -webkit-mask-image: url('../../assets/close-24px.svg');
  mask-image: url('../..//assets/close-24px.svg');
  background-color: grey;
}
</style>
