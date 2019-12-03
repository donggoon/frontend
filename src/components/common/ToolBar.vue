<template>
  <v-toolbar dark color="primary" absolute>
    <i class="menu-btn" @click.stop="onClickDrawer"/>
    <v-toolbar-title class="white--text">{{ this.$route.meta.title === undefined ? this.$appName : this.$route.meta.title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['onClickDrawer', 'openDrawer'])
  },
  activated () {
    if (this.$route.meta.title === undefined) {
      this.openDrawer()
    }
  }
}
</script>

<style scoped>
.menu-btn {
  width: 24px;
  height: 24px;
  -webkit-mask-image: url('../../assets/menu-24px.svg');
  mask-image: url('../..//assets/menu-24px.svg');
  background-color: white;
}
</style>
