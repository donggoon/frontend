<!--
  - 1. 서브메뉴명 : 간접비 현황
  - 2. 프로그램ID : OverheadCost.vue
  - 3. 프로그램명 : 비용정산
  - 4. 작성자 : 김동건
  - 5. 작성일 : 2019.07.08
  -->
<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="overheadCosts"
      class="elevation-1"
      disable-initial-sort
      hide-actions
    >
      <template v-slot:no-data>
        <template>
          <v-progress-linear :indeterminate="!isLoaded" :hidden="isLoaded" class="none-padding"></v-progress-linear>
        </template>
      </template>
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.ocst_NM }}</td>
        <td class="text-xs-right">{{ props.item.appl_AMT }}</td>
        <td class="text-xs-right">{{ props.item.appl_RATE }}</td>
        <td class="text-xs-center">{{ props.item.appl_NM === null ? props.item.appl_NM : props.item.appl_NM.substr(0, 8) }}</td>
      </template>
    </v-data-table>
    <v-checkbox
      v-model="etcCost"
      @change="changeEtcCost"
      class="mb-0 ml-2 compact-form none-padding"
      label="잡재료/공구손료"
    ></v-checkbox>
    <div class="text-xs-center">
      <v-btn
        :to="{
          name: 'DirectCost',
          params: {
            work_NO: this.work_NO,
            work_PRGS_STAT_CD: this.work_PRGS_STAT_CD
          }
        }"
        color="primary"
        dark
        class="pl-0 pr-0"
      >직접비현황</v-btn>
      <v-btn
        color="primary"
        dark
        @click="updateOverheadCost"
        :disabled="isFinished"
      >임시저장</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverheadCost',
  props: [ 'p_WORK_NO', 'p_WORK_PRGS_STAT_CD', 'p_MCST_WHOLE_AMT', 'p_PEXP_WHOLE_AMT', 'p_TM_PRI_WHOLE_AMT', 'p_PRI_WHOLE_AMT' ],
  data () {
    return {
      expand: false,
      headers: [
        {
          text: '구분',
          align: 'center',
          sortable: false,
          value: 'ocst_NM',
          width: '35%',
          class: 'font-weight-bold text--primary'
        },
        {
          text: '금액',
          align: 'center',
          sortable: false,
          value: 'appl_AMT',
          width: '20%',
          class: 'font-weight-bold text--primary'
        },
        {
          text: '요율',
          align: 'center',
          sortable: false,
          value: 'appl_RATE',
          width: '10%',
          class: 'font-weight-bold text--primary'
        },
        {
          text: '적용기준(%)',
          align: 'center',
          sortable: false,
          value: 'appl_NM',
          width: '35%',
          class: 'font-weight-bold text--primary'
        }
      ],
      etcCost: false,
      overheadCosts: [],
      overheadCostTotal: [],
      directWholeCost: 0,
      overheadWholeCost: 0,
      workCost: 0,
      isFinished: true,
      mat_SEQ: '',
      isLoaded: false,
      work_NO: '',
      work_PRGS_STAT_CD: '',
      mcst_WHOLE_AMT: '',
      pexp_WHOLE_AMT: '',
      tm_PRI_WHOLE_AMT: '',
      pri_WHOLE_AMT: ''
    }
  },
  created () {
    // get props to variables
    this.work_NO = this.p_WORK_NO
    this.work_PRGS_STAT_CD = this.p_WORK_PRGS_STAT_CD
    this.mcst_WHOLE_AMT = this.p_MCST_WHOLE_AMT
    this.pexp_WHOLE_AMT = this.p_PEXP_WHOLE_AMT
    this.tm_PRI_WHOLE_AMT = this.p_TM_PRI_WHOLE_AMT
    this.pri_WHOLE_AMT = this.p_PRI_WHOLE_AMT

    this.isFinished = this.work_PRGS_STAT_CD !== '4'
    this.directWholeCost = this.mcst_WHOLE_AMT + this.pexp_WHOLE_AMT
    this.$http.get(this.$path + '/m/selectOverheadCost.do', {
      params: { WORK_NO: this.work_NO }
    }).then(resp => {
      this.overheadCosts = resp.data.response
      this.overheadCosts[0].appl_AMT = Math.round(this.directWholeCost * this.overheadCosts[0].appl_RATE / 100) // 공과잡비
      this.overheadCosts[1].appl_AMT = Math.round(this.directWholeCost * this.overheadCosts[1].appl_RATE / 100) // 안전관리비
      if (this.mcst_WHOLE_AMT > 0) {
        this.overheadCosts[2].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[2].appl_RATE / 100) // 산재보험료
      } else {
        this.overheadCosts[2].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[2].appl_RATE_EXTRA / 100) // 산재보험료
      }
      this.overheadCosts[3].appl_AMT = Math.round(this.pexp_WHOLE_AMT * this.overheadCosts[3].appl_RATE / 100) // 고용보험료
      this.overheadCosts[5].appl_AMT = Math.round(this.pri_WHOLE_AMT) // 공간할증금액
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
      for (let i = 0; i < this.overheadCosts.length; i++) {
        this.overheadWholeCost += parseInt(this.overheadCosts[i].appl_AMT, '10')
      }
      this.workCost = Math.round(this.directWholeCost + this.overheadWholeCost + this.tm_PRI_WHOLE_AMT)
      this.overheadCosts.push({
        ocst_NM: '간접비 합계',
        appl_AMT: this.overheadWholeCost,
        appl_RATE: null,
        appl_NM: null
      })
      this.overheadCosts.push({
        ocst_NM: '총 합계',
        appl_AMT: this.workCost,
        appl_RATE: null,
        appl_NM: null
      })
      this.changeEtcCost()
      this.isLoaded = true
    })
  },
  methods: {
    updateOverheadCost () {
      confirm('저장하시겠습니까?')
      for (let i = 0; i < this.overheadCosts.length; i++) {
        this.$http.get(this.$path + '/m/mergeOverheadCost.do', {
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
      for (let i = 0; i < this.overheadCosts.length - 2; i++) {
        this.overheadWholeCost += parseInt(this.overheadCosts[i].appl_AMT, '10')
      }
      this.overheadCosts[this.overheadCosts.length - 2].appl_AMT = this.overheadWholeCost
      this.workCost = Math.round(this.directWholeCost + this.overheadWholeCost + this.tm_PRI_WHOLE_AMT)
      this.overheadCosts[this.overheadCosts.length - 1].appl_AMT = this.workCost
    },
    async updateWorkInfo () {
      confirm('정산요청 하시겠습니까?')
      for (let i = 0; i < this.overheadCosts.length - 1; i++) {
        this.$http.get(this.$path + '/m/mergeOverheadCost.do', {
          params: {
            WORK_NO: this.work_NO,
            OCST_CD: this.overheadCosts[i].ocst_CD,
            APPL_RATE: this.overheadCosts[i].appl_RATE,
            APPL_AMT: this.overheadCosts[i].appl_AMT
          }
        })
      }
      await this.$http.get(this.$path + '/m/updateWorkInfo.do', {
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
      alert('정산요청 완료되었습니다.')
      this.$router.push('/worklist')
    }
  }
}
</script>

<style scoped>
.compact-form {
  transform: scale(0.8);
  transform-origin: left top;
}

.none-padding {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
