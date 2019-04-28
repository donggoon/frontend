<template>
  <div>
    <v-toolbar flat dark color="primary">
      <v-checkbox
        v-model="etcCost"
        @change="changeEtcCost"
      ></v-checkbox>
      <v-btn
        :to="{
          name: 'DirectCost',
          params: {
            work_NO: this.work_NO,
            work_PRGS_STAT_CD: this.work_PRGS_STAT_CD
          }
        }"
        color="pink"
        dark
      >직접비 계산</v-btn>
      <v-btn
        color="primary"
        dark
        @click="updateOverheadCost"
        :disabled="isFinished">
        임시저장
      </v-btn>
      <v-btn
        :to="{
          name: 'Work'
        }"
        :hidden="isFinished"
        color="red"
        dark
        @click="updateWorkInfo"
        :disabled="isFinished"
      >{{ expand ? 'Close' : '정산요청' }}</v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="overheadCosts"
      class="elevation-1"
      disable-initial-sort
      hide-actions
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.ocst_NM }}</td>
        <td class="text-xs-right">{{ props.item.appl_AMT }}</td>
        <td class="text-xs-right">{{ props.item.appl_RATE }}</td>
        <td class="text-xs-center">{{ props.item.appl_NM === null ? props.item.appl_NM : props.item.appl_NM.substr(0, 8) }}</td>
      </template>
    </v-data-table>
    <v-data-table
      :headers="headers"
      :items="overheadCostTotal"
      class="elevation-1"
      disable-initial-sort
      hide-headers
      hide-actions
    >
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.ocst_NM }}</td>
        <td class="text-xs-right">{{ props.item.appl_AMT }}</td>
        <td class="text-xs-right">{{ props.item.appl_RATE }}</td>
        <td class="text-xs-right">{{ props.item.appl_NM }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'OverheadCost',
  props: [ 'work_NO', 'work_PRGS_STAT_CD', 'mcst_WHOLE_AMT', 'pexp_WHOLE_AMT', 'tm_PRI_WHOLE_AMT' ],
  data () {
    return {
      expand: false,
      headers: [
        {
          text: '구분',
          align: 'center',
          sortable: false,
          value: 'ocst_NM',
          width: '35%'
        },
        {
          text: '금액',
          align: 'center',
          sortable: false,
          value: 'appl_AMT',
          width: '20%'
        },
        {
          text: '요율',
          align: 'center',
          sortable: false,
          value: 'appl_RATE',
          width: '10%'
        },
        {
          text: '적용기준(%)',
          align: 'center',
          sortable: false,
          value: 'appl_NM',
          width: '35%'
        }
      ],
      etcCost: false,
      overheadCosts: [],
      overheadCostTotal: [],
      directWholeCost: 0,
      overheadWholeCost: 0,
      workCost: 0,
      isFinished: true,
      mat_SEQ: ''
    }
  },
  created () {
    console.log(this.work_PRGS_STAT_CD)
    this.isFinished = this.work_PRGS_STAT_CD !== '4'
    console.log(this.isFinished)
    this.directWholeCost = this.mcst_WHOLE_AMT + this.pexp_WHOLE_AMT
    this.$http.get('/corp/m/selectOverheadCost.do', {
      params: { WORK_NO: this.work_NO }
    }).then(resp => {
      this.overheadCosts = resp.data.response
      this.overheadCosts[0].appl_AMT = Math.round(this.directWholeCost * this.overheadCosts[0].appl_RATE / 100) // 공과잡비
      this.overheadCosts[1].appl_AMT = Math.round(this.directWholeCost * this.overheadCosts[1].appl_RATE / 100) // 안전관리비
      this.overheadCosts[2].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[2].appl_RATE / 100) // 산재보험료
      this.overheadCosts[3].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[3].appl_RATE / 100) // 고용보험료
      // this.overheadCosts[4].appl_AMT  소규모할증
      this.overheadCosts[5].appl_AMT = Math.round(this.tm_PRI_WHOLE_AMT) // 시간할증금
      if (this.overheadCosts[0].etc_COST_USE_CD === 'Y') {
        this.etcCost = true
      } else {
        this.etcCost = false
      }
      if (this.etcCost) {
        this.overheadCosts[6].appl_AMT = Math.round(this.mcst_WHOLE_AMT * this.overheadCosts[6].appl_RATE / 100) // 잡재료
        this.overheadCosts[7].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[7].appl_RATE / 100) // 공구손료
      } else {
        this.overheadCosts[6].appl_AMT = 0
        this.overheadCosts[7].appl_AMT = 0
      }
      this.workCost = this.directWholeCost + this.overheadWholeCost
      this.overheadCostTotal.push({
        ocst_NM: '간접비합계',
        appl_AMT: this.overheadWholeCost
      })
      this.overheadCostTotal.push({
        ocst_NM: '총계',
        appl_AMT: this.workCost
      })
      this.changeEtcCost()
    })
  },
  methods: {
    updateOverheadCost () {
      for (let i = 0; i < this.overheadCosts.length; i++) {
        this.$http.get('/corp/m/mergeOverheadCost.do', {
          params: {
            WORK_NO: this.work_NO,
            OCST_CD: this.overheadCosts[i].ocst_CD,
            APPL_RATE: this.overheadCosts[i].appl_RATE,
            APPL_AMT: this.overheadCosts[i].appl_AMT
          }
        })
      }
    },
    changeEtcCost () {
      if (this.etcCost) {
        this.overheadCosts[6].appl_AMT = Math.round(this.mcst_WHOLE_AMT * this.overheadCosts[6].appl_RATE / 100) // 잡재료
        this.overheadCosts[7].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[7].appl_RATE / 100) // 공구손료
      } else {
        this.overheadCosts[6].appl_AMT = 0
        this.overheadCosts[7].appl_AMT = 0
      }
      this.overheadWholeCost = 0
      for (let i = 0; i < this.overheadCosts.length; i++) {
        this.overheadWholeCost += parseInt(this.overheadCosts[i].appl_AMT, '10')
      }
      this.workCost = this.directWholeCost + this.overheadWholeCost
      this.overheadCostTotal[0].appl_AMT = this.overheadWholeCost
      this.overheadCostTotal[1].appl_AMT = this.workCost
    },
    updateWorkInfo () {
      for (let i = 0; i < this.overheadCosts.length; i++) {
        this.$http.get('/corp/m/mergeOverheadCost.do', {
          params: {
            WORK_NO: this.work_NO,
            OCST_CD: this.overheadCosts[i].ocst_CD,
            APPL_RATE: this.overheadCosts[i].appl_RATE,
            APPL_AMT: this.overheadCosts[i].appl_AMT
          }
        })
      }
      this.$http.get('/corp/m/updateWorkInfo.do', {
        params: {
          WORK_NO: this.work_NO,
          PEXP_WHOLE_AMT: this.pexpWholeCost,
          MCST_WHOLE_AMT: this.mcstWholeCost,
          WORK_PRGS_STAT_CD: '5',
          ETC_COST_USE_CD: (this.etcCost ? 'Y' : 'N'),
          OCST_WHOLE_AMT: this.overheadWholeCost,
          WRK_COST: this.workCost
        }
      })
    }
  }
}
</script>

<style>

</style>
