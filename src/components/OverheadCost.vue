<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>간접비 현황</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'DirectCostDetail', params: { work_NO: this.work_NO, mat_SEQ: this.mat_SEQ }}" v-bind:key="this.work_NO">
        <v-btn color="primary" dark @click="expand = !expand">
          {{ expand ? 'Close' : '추가' }}
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="overheadCosts"
      class="elevation-1"
      disable-initial-sort
    >
      <template v-slot:items="props">
        <td class="text-xs-right">{{ props.item.ocst_NM }}</td>
        <td class="text-xs-right">{{ props.item.appl_AMT }}</td>
        <td class="text-xs-right">{{ props.item.appl_RATE }}</td>
        <td class="text-xs-right">{{ props.item.appl_NM }}</td>
      </template>
    </v-data-table>
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
        { text: '구분', value: 'ocst_NM' },
        { text: '금액', value: 'appl_AMT' },
        { text: '적용요율', value: 'appl_RATE' },
        { text: '적용기준', value: 'appl_NM' }
      ],
      overheadCosts: [],
      mat_SEQ: ''
    }
  },
  created () {
    console.log(this.work_NO)
    this.$http.get('/m/selectOverheadCost.do', {
      params: { WORK_NO: this.work_NO }
    }).then(resp => {
      this.overheadCosts = resp.data.response
      console.log(this.overheadCosts)
      console.log(resp)
    })
  }
}
</script>

<style>

</style>
