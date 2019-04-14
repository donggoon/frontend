<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>직접비 현황</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'DirectCostDetail', params: { work_NO: this.work_NO, mat_SEQ: this.mat_SEQ }}" v-bind:key="this.work_NO">
        <v-btn color="primary" dark @click="expand = !expand">
          {{ expand ? 'Close' : '항목추가' }}
        </v-btn>
      </router-link>
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
            mat_SEQ: props.item.mat_SEQ
          }
        }">
        <td>{{ props.item.mat_NM }}</td>
        </router-link>
        <td class="text-xs-right">{{ props.item.mat_QTY }}</td>
        <td class="text-xs-right">{{ props.item.total_SUM }}</td>
      </template>
    </v-data-table>
    <v-btn color="primary" dark @click="updateWorkDirectInfo">
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
        {{ expand ? 'Close' : '간접비 계산' }}
      </v-btn>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'DirectCost',
  props: [ 'work_NO' ],
  data () {
    return {
      expand: false,
      headers: [
        {
          text: '품명',
          align: 'left',
          sortable: false,
          value: 'mat_NM'
        },
        { text: '수량', value: 'mat_QTY' },
        { text: '합계', value: 'total_SUM' }
      ],
      directCosts: [],
      mat_SEQ: '',
      mcstWholeCost: 0,
      pexpWholeCost: 0,
      timeWholeCost: 0,
      spaceWholeCost: 0,
      directWholeCost: 0
    }
  },
  created () {
    console.log(this.work_NO)
    this.$http.get('/m/getDirectCost.do', {
      params: { WORK_NO: this.work_NO }
    }).then(resp => {
      this.directCosts = resp.data.response
      console.log(this.directCosts)
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
      this.directCosts.push({
        mat_NM: '총 합계',
        total_SUM: this.mcstWholeCost + this.pexpWholeCost
      })
      console.log(this.directCosts)
      console.log(resp)
    })
  },
  methods: {
    updateWorkDirectInfo () {
      this.$http.get('/m/updateWorkDirectInfo.do', {
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
