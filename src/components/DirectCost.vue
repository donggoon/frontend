<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>직접비 현황</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'DirectCostDetail', params: { work_NO: this.work_NO, mat_SEQ: this.mat_SEQ }}" v-bind:key="this.work_NO">
        <v-btn color="primary" dark @click="expand = !expand">
          {{ expand ? 'Close' : '추가' }}
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="directCosts"
      class="elevation-1"
      disable-initial-sort
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
        <td class="text-xs-right">{{ props.item.mcst_PRCE }}</td>
        <td class="text-xs-right">{{ props.item.pexp_PRCE }}</td>
        <td class="text-xs-right">{{ props.item.total_SUM }}</td>
      </template>
    </v-data-table>
    <router-link :to="{ name: 'OverheadCost', params: { work_NO: this.work_NO }}">
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
        { text: '자재비', value: 'mcst_PRCE' },
        { text: '인건비', value: 'pexp_PRCE' },
        { text: '합계', value: 'total_SUM' }
      ],
      directCosts: [],
      mat_SEQ: '',
      mcstTotal: 0,
      pexpTotal: 0,
      timeTotal: 0,
      spaceTotal: 0,
      allTotal: 0
    }
  },
  created () {
    console.log(this.work_NO)
    this.$http.get('/m/getDirectCost.do', {
      params: { WORK_NO: this.work_NO }
    }).then(resp => {
      this.directCosts = resp.data.response
      for (let i = 0; i < this.directCosts.length; i++) {
        this.mcstTotal += parseInt(this.directCosts[i].mcst_AMT, '10')
        this.pexpTotal += parseInt(this.directCosts[i].pexp_AMT, '10')
        this.timeTotal += parseInt(this.directCosts[i].tm_PRI_AMT, '10')
        this.spaceTotal += parseInt(this.directCosts[i].pri_AMT, '10')
        this.allTotal += parseInt(this.directCosts[i].total_SUM, '10')
      }
      console.log(this.mcstTotal)
      console.log(this.pexpTotal)
      console.log(this.timeTotal)
      console.log(this.spaceTotal)
      console.log(this.allTotal)
      if (this.directCosts === null) {
        this.mat_SEQ = 0
      } else {
        this.mat_SEQ = this.directCosts.length + 1
        console.log(this.mat_SEQ)
      }
      console.log(this.directCosts)
      console.log(resp)
    })
  },
  methods: {
    mergeOverheadCosts () {
      this.$http.get('/m/mergeOverheadCost.do', {
        params: { WORK_NO: this.work_NO }
      }).then(resp => {
        this.directCosts = resp.data.response
        if (this.directCosts === null) {
          this.mat_SEQ = 0
        } else {
          this.mat_SEQ = this.directCosts.length + 1
          console.log(this.mat_SEQ)
        }
        console.log(this.directCosts)
        console.log(resp)
      })
    }
  }
}
</script>

<style>

</style>
