<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">시설공사</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Work from './components/Work'

export default {
  name: 'App',
  components: {
    Work
  },
  data () {
    return {
      //
    }
  }
}
</script>
