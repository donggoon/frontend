<template>
  <v-toolbar dark color="primary" absolute>
    <v-toolbar-side-icon
      @click.stop="onClickDrawer"
    >
    </v-toolbar-side-icon>

    <v-toolbar-title class="white--text">{{ this.$route.meta.title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      ...mapState(['drawer'])
    }
  },
  methods: {
    ...mapMutations(['onClickDrawer'])
  }
}
</script>
