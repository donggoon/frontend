<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
              avatar
              ripple
              @click="toggle(index)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.work_NM }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">공사번호 : {{ item.work_NO }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.work_PRGS_STAT_NM }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ item.pchr_EMPN_NM }}</v-list-tile-action-text>
                <v-icon
                  v-if="selected.indexOf(index) < 0"
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-2"
                >
                  star
                </v-icon>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            ></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      selected: [2],
      items: []
    }
  },
  methods: {
    toggle (index) {
      const i = this.selected.indexOf(index)
      if (i > -1) {
        this.selected.splice(i, 1)
      } else {
        this.selected.push(index)
      }
    }
  },
  created () {
    this.$http.get('/m/M_WORK_WORK_INFO_LIST_07.do').then(resp => {
      this.items = resp.data.response
      console.log(resp)
    })
  }
}
</script>

<style>

</style>
