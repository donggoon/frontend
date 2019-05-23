<template>
  <div>
    <v-data-iterator
      :items="directCosts"
      item-key="name"
      content-tag="v-layout"
      :expand="expand"
      row
      wrap
      disable-initial-sort
      hide-actions
    >
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-divider></v-divider>
            <router-link
              :to="{
                name: 'DirectCostUpdate',
                params: {
                  work_NO: work_NO,
                  work_PRGS_STAT_CD: work_PRGS_STAT_CD,
                  mat_SEQ: props.item.mat_SEQ
                }
              }"
              tag="span"
            >
            <v-card-title>
              <h4>{{ props.item.mat_NM.substr(props.item.mat_NM.indexOf(':') + 1, props.item.mat_NM.indexOf(':') + 15) }}</h4>
              <v-spacer></v-spacer>
              <h4>합계: {{ props.item.total_SUM }}</h4>
            </v-card-title>
            <div class="text-xs-right mr-3">
              <span>
                <h4>시간할증금: {{ props.item.tm_PRI_AMT }}</h4>
              </span>
            </div>
            </router-link>
            <v-switch
              v-model="props.item.expanded"
              :label="(props.item.expanded) ? '닫기' : '열기'"
              class="pl-3 mt-0"
            ></v-switch>
            <v-list v-if="props.item.expanded" dense>
              <v-list-tile>
                <v-list-tile-content>수량:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.mat_QTY }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>자재비금액:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.mcst_PRCE }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>인건비금액:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.pexp_PRCE }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>자재비합계:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.mcst_AMT }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>인건비합계:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.pexp_AMT }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
    <div class="text-xs-right mr-3" color="primary">
      <span class="justify-end">
        <h4>직접비합계: {{ mcstWholeCost + pexpWholeCost }}</h4>
      </span>
      <span class="justify-end">
        <h4>시간할증금: {{ timeWholeCost }}</h4>
      </span>
    </div>
    <v-btn
      :to="{
        name: 'DirectCostDetail',
        params: {
          work_NO: this.work_NO,
          work_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
          mat_SEQ: this.mat_SEQ
        }
      }"
      :hidden="isFinished"
      fixed
      dark
      icon
      bottom
      right
      color="red"
    >
    <v-icon>add</v-icon>
    </v-btn>
    <div class="text-xs-center">
      <v-btn
        :to="{
          name: 'WorkList'
        }"
        color="primary"
        dark
      >공사목록</v-btn>
      <v-btn
        :to="{
          name: 'OverheadCost',
          params: {
            work_NO: this.work_NO,
            work_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
            pexp_WHOLE_AMT: this.pexpWholeCost,
            mcst_WHOLE_AMT: this.mcstWholeCost,
            tm_PRI_WHOLE_AMT: this.timeWholeCost,
            pri_WHOLE_AMT: this.spaceWholeCost
          }
        }"
        color="red"
        dark
        class="pl-0 pr-0"
      >간접비현황</v-btn>
      <v-btn
        :to="{
          name: 'DirectCostDetail',
          params: {
            work_NO: this.work_NO,
            work_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
            mat_SEQ: this.mat_SEQ
          }
        }"
        color="primary"
        dark
      >항목추가</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'work_NO', 'work_PRGS_STAT_CD' ],
  data () {
    return {
      expand: false,
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      directCosts: [],
      directCostTotal: [],
      mat_SEQ: '',
      mcstWholeCost: 0,
      pexpWholeCost: 0,
      timeWholeCost: 0,
      spaceWholeCost: 0,
      directWholeCost: 0,
      isFinished: true,
      alert: true
    }
  },
  created () {
    this.isFinished = false
    this.$http.get('/m/getDirectCost.do', {
      params: { WORK_NO: this.work_NO }
    }).then(resp => {
      this.directCosts = resp.data.response
      for (let i = 0; i < this.directCosts.length; i++) {
        this.mcstWholeCost += parseInt(this.directCosts[i].mcst_AMT, '10')
        this.pexpWholeCost += parseInt(this.directCosts[i].pexp_AMT, '10')
        this.timeWholeCost += parseInt(this.directCosts[i].tm_PRI_AMT, '10')
        this.spaceWholeCost += parseInt(this.directCosts[i].pri_AMT, '10')
      }
      this.directWholeCost = this.mcstWholeCost + this.pexpWholeCost
      this.$http.get('/m/getMatSeq.do', {
        params: { WORK_NO: this.work_NO }
      }).then(resp => {
        console.log(resp)
        this.mat_SEQ = resp.data.response[0]
        console.log(this.mat_SEQ)
      })
      this.directCostTotal.push({
        mat_NM: '',
        total_SUM: this.mcstWholeCost + this.pexpWholeCost
      })
    })
  }
}
</script>
