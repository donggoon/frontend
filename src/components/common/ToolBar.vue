<template>
  <v-toolbar dark color="primary" absolute>
    <v-toolbar-side-icon
      @click.stop="onClickDrawer"
    >
    </v-toolbar-side-icon>

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
