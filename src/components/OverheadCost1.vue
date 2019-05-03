
<template>
  <div>
    <v-checkbox
      v-model="etcCost"
      @change="changeEtcCost"
    ></v-checkbox>
    <v-data-iterator
      :items="overheadCosts"
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
            <router-link
              :to="{
                name: 'DirectCostUpdate',
                params: {
                  work_NO: work_NO,
                  work_PRGS_STAT_CD: work_PRGS_STAT_CD
                }
              }"
              tag="li"
            >
            <v-card-title>
              <h4>{{ props.item.ocst_NM }}</h4>
              <v-spacer></v-spacer>
              <h4>금액: {{ props.item.appl_AMT }}</h4>
            </v-card-title>
            </router-link>
            <v-switch
              v-model="props.item.expanded"
              :label="(props.item.expanded) ? '닫기' : '열기'"
              class="pl-3 mt-0"
            ></v-switch>
            <v-list v-if="props.item.expanded" dense>
              <v-list-tile>
                <v-list-tile-content>요율:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.appl_RATE }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>적용기준:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.appl_NM === null ? props.item.appl_NM : props.item.appl_NM.substr(0, 8) }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-divider></v-divider>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
    <v-card-title class="justify-end">
      <h4>간접비 합계: {{ this.overheadWholeCost }}</h4>
    </v-card-title>
    <div class="text-xs-center">
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
        :to="{
          name: 'Work'
        }"
        :hidden="isFinished"
        color="red"
        dark
        @click="updateWorkInfo"
        :disabled="isFinished"
      >{{ expand ? 'Close' : '정산요청' }}</v-btn>
    </div>
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
