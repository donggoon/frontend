<!--
  - 1. 서브메뉴명 : 정산서 현황
  - 2. 프로그램ID : WorkList.vue
  - 3. 프로그램명 : 비용정산
  - 4. 작성자 : 김동건
  - 5. 작성일 : 2019.07.08
  -->
<template>
  <v-layout row>
    <template>
      <v-progress-linear :indeterminate="!isLoaded" :hidden="isLoaded" class="none-padding"></v-progress-linear>
    </template>
    <v-flex>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item.title"
              avatar
              ripple
              @click="onClickWorkList(item)"
            >
              <v-list-tile-content>
                <v-list-tile-title class="font-weight-medium">{{ item.work_NM }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">공사번호 : {{ item.work_NO }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>{{ item.work_PRGS_STAT_NM }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text class="text--primary">{{ item.pchr_EMPN_NM }}</v-list-tile-action-text>
                <v-icon
                  v-if="item.work_PRGS_STAT_CD !== '4'"
                  color="grey lighten-1"
                >edit</v-icon>

                <v-icon
                  v-else
                  color="yellow darken-2"
                >edit</v-icon>
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
  name: 'WorkList',
  data () {
    return {
      items: [],
      isLoaded: false
    }
  },
  created () {
    this.$http.get(this.$path + '/m/getWorkList.do').then(resp => {
      this.items = resp.data.response
      this.isLoaded = true
    })
  },
  methods: {
    onClickWorkList (item) {
      this.$router.push({
        name: 'DirectCost',
        params: {
          p_WORK_NO: item.work_NO,
          p_WORK_PRGS_STAT_CD: item.work_PRGS_STAT_CD,
          isChanged: true
        }
      })
    }
  }
}
</script>
