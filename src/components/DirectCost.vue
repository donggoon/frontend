<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>직접비 현황</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'DirectCostDetail', params: { work_NO: this.work_NO }}" v-bind:key="this.work_NO">
        <v-btn color="primary" dark @click="expand = !expand">
          {{ expand ? 'Close' : '추가' }}
        </v-btn>
      </router-link>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="directCosts"
      class="elevation-1"
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
        <td class="text-xs-right">{{ props.item.mat_QTY }}</td>
        <td class="text-xs-right">{{ props.item.mcst_PRCE }}</td>
        <td class="text-xs-right">{{ props.item.pexp_PRCE }}</td>
        <td class="text-xs-right">{{ props.item.total_SUM }}</td>
        </router-link>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'DirectCost',
  props: ['work_NO'],
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
      directCosts: []
    }
  },
  created () {
    console.log(this.work_NO)
    this.$http.get('/m/getDirectCost.do', {
      params: { WORK_NO: this.work_NO }
    }).then(resp => {
      this.directCosts = resp.data.response
      console.log(this.directCosts)
      console.log(resp)
    })
  }
}
</script>

<style>

</style>
