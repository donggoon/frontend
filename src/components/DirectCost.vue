<template>
  <div>
    <v-toolbar flat dark color="primary">
      <v-btn
        :to="{
          name: 'Work'
        }"
        color="pink"
        dark
      >{{ expand ? 'Close' : '공사목록' }}</v-btn>
      <v-btn
        :to="{
          name: 'DirectCostDetail',
          params: {
            work_NO: this.work_NO,
            work_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
            mat_SEQ: this.mat_SEQ
          }
        }"
        v-bind:key="this.work_NO"
        :hidden="isFinished"
        color="pink"
        dark :disabled="isFinished"
      >{{ expand ? 'Close' : '항목추가' }}</v-btn>
      <v-btn
        :to="{
          name: 'OverheadCost',
          params: {
            work_NO: this.work_NO,
            work_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
            pexp_WHOLE_AMT: this.pexpWholeCost,
            mcst_WHOLE_AMT: this.mcstWholeCost,
            tm_PRI_WHOLE_AMT: this.timeWholeCost
          }
        }"
        color="red"
        dark
      >{{ expand ? 'Close' : '간접비 계산' }}</v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="directCosts"
      class="elevation-1"
      disable-initial-sort
      hide-actions
    >
      <template v-slot:items="props">
        <router-link :to="{
          name: 'DirectCostUpdate',
          params: {
            work_NO: props.item.work_NO,
            work_PRGS_STAT_CD: work_PRGS_STAT_CD,
            mat_SEQ: props.item.mat_SEQ
          }
        }"
        tag="span">
        <td class="text-xs-left">{{ props.item.mat_NM.substr(props.item.mat_NM.indexOf(':') + 1, props.item.mat_NM.indexOf(':') + 15) }}</td>
        </router-link>
        <td class="text-xs-right">{{ props.item.mat_QTY }}</td>
        <td class="text-xs-right">{{ props.item.total_SUM }}</td>
      </template>
    </v-data-table>
    <v-data-table
      :headers="headers"
      :items="directCostTotal"
      class="elevation-1"
      disable-initial-sort
      hide-headers
      hide-actions
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.mat_NM }}</td>
        <td class="text-xs-right">{{ props.item.mat_QTY }}</td>
        <td class="text-xs-right">{{ props.item.total_SUM }}</td>
      </template>
    </v-data-table>
    <!-- v-flex xs12 sm12 md6>
      <v-card>
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="pink"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card>
    </v-flex -->
  </div>
</template>

<script>
export default {
  name: 'DirectCost',
  props: [ 'work_NO', 'work_PRGS_STAT_CD' ],
  data () {
    return {
      expand: false,
      headers: [
        {
          text: '품명',
          align: 'center',
          sortable: false,
          value: 'mat_NM',
          width: '65%'
        },
        {
          text: '수량',
          align: 'center',
          sortable: false,
          value: 'mat_QTY',
          width: '5%'
        },
        {
          text: '합계',
          align: 'center',
          sortable: false,
          value: 'total_SUM',
          width: '20%'
        }
      ],
      directCosts: [],
      directCostTotal: [],
      mat_SEQ: '',
      mcstWholeCost: 0,
      pexpWholeCost: 0,
      timeWholeCost: 0,
      spaceWholeCost: 0,
      directWholeCost: 0,
      isFinished: true
    }
  },
  created () {
    this.isFinished = this.work_PRGS_STAT_CD !== '4'
    this.$http.get('/corp/m/getDirectCost.do', {
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
      if (this.directCosts === null) {
        this.mat_SEQ = 0
      } else {
        this.mat_SEQ = this.directCosts.length + 1
        console.log(this.mat_SEQ)
      }
      this.directCostTotal.push({
        mat_NM: '총 합계',
        total_SUM: this.mcstWholeCost + this.pexpWholeCost
      })
    })
  }
}
</script>
