<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>간접비 현황</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="overheadCosts"
      class="elevation-1"
      disable-initial-sort
      hide-actions=""
    >
      <template v-slot:items="props">
        <td class="text-xs-right">{{ props.item.ocst_NM }}</td>
        <td class="text-xs-right">{{ props.item.appl_AMT }}</td>
        <td class="text-xs-right">{{ props.item.appl_RATE }}</td>
        <td class="text-xs-right">{{ props.item.appl_NM }}</td>
      </template>
    </v-data-table>
    <v-btn color="primary" dark @click="updateOverheadCost">
      {{ expand ? 'Close' : '임시저장' }}
    </v-btn>
    <router-link :to="{
      name: 'OverheadCost',
      params: {
        work_NO: this.work_NO,
        pexp_WHOLE_AMT: this.pexpWholeCost,
        mcst_WHOLE_AMT: this.mcstWholeCost,
        tm_PRI_WHOLE_AMT: this.timeWholeCost
        }
      }">
      <v-btn color="primary" dark @click="expand = !expand">
        {{ expand ? 'Close' : '정산요청' }}
      </v-btn>
    </router-link>
    <router-link :to="{
      name: 'DirectCost',
      params: {
        work_NO: this.work_NO
        }
      }">
      <v-btn color="red" dark @click="expand = !expand">
        {{ expand ? 'Close' : '직접비 계산' }}
      </v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'DirectCost',
  props: [ 'work_NO', 'mcst_WHOLE_AMT', 'pexp_WHOLE_AMT', 'tm_PRI_WHOLE_AMT' ],
  data () {
    return {
      expand: false,
      headers: [
        { text: '구분', value: 'ocst_NM' },
        { text: '금액', value: 'appl_AMT' },
        { text: '적용요율', value: 'appl_RATE' },
        { text: '적용기준', value: 'appl_NM' }
      ],
      overheadCosts: [],
      directWholeCost: 0,
      mat_SEQ: ''
    }
  },
  created () {
    this.directWholeCost = this.mcst_WHOLE_AMT + this.pexp_WHOLE_AMT
    console.log(this.work_NO)
    this.$http.get('/m/selectOverheadCost.do', {
      params: { WORK_NO: this.work_NO }
    }).then(resp => {
      this.overheadCosts = resp.data.response
      this.overheadCosts[0].appl_AMT = Math.round(this.directWholeCost * this.overheadCosts[0].appl_RATE / 100) // 공과잡비
      this.overheadCosts[1].appl_AMT = Math.round(this.directWholeCost * this.overheadCosts[1].appl_RATE / 100) // 안전관리비
      this.overheadCosts[2].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[2].appl_RATE / 100) // 산재보험료
      this.overheadCosts[3].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[3].appl_RATE / 100) // 고용보험료
      // this.overheadCosts[4].appl_AMT  소규모할증
      this.overheadCosts[5].appl_AMT = Math.round(this.tm_PRI_WHOLE_AMT) // 시간할증금
      this.overheadCosts[6].appl_AMT = Math.round(this.mcst_WHOLE_AMT * this.overheadCosts[6].appl_RATE / 100) // 잡재료
      this.overheadCosts[7].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[7].appl_RATE / 100) // 공구손료
      console.log(this.overheadCosts)
      console.log(resp)
    })
  },
  methods: {
    updateOverheadCost () {
      for (let i = 0; i < this.overheadCosts.length; i++) {
        this.$http.get('/m/mergeOverheadCost.do', {
          params: {
            WORK_NO: this.work_NO,
            OCST_CD: this.overheadCosts[i].ocst_CD,
            APPL_RATE: this.overheadCosts[i].appl_RATE,
            APPL_AMT: this.overheadCosts[i].appl_AMT
          }
        })
      }
      this.$http.get('/m/updateWorkOverheadInfo.do', {
        params: {
          WORK_NO: this.work_NO,
          PEXP_WHOLE_AMT: this.pexpWholeCost,
          MCST_WHOLE_AMT: this.mcstWholeCost,
          WORK_PRGS_STAT_CD: '4'
        }
      })
    }
  }
}
</script>

<style>

</style>
