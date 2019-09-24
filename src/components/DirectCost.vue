<!--
  - 1. 서브메뉴명 : 직접비 현황
  - 2. 프로그램ID : DirectCost.vue
  - 3. 프로그램명 : 비용정산
  - 4. 작성자 : 김동건
  - 5. 작성일 : 2019.07.08
  -->
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
      <template v-slot:no-data>
        <template>
          <v-progress-linear :indeterminate="!isLoaded" :hidden="isLoaded" class="none-padding"></v-progress-linear>
        </template>
        <v-card>
          <v-divider></v-divider>
          <v-card-title class="none-padding overflow-hidden">
            등록된 직접비 항목이 없습니다.
            <v-spacer></v-spacer>
            <v-list-tile-title class="font-weight-medium">항목 추가하기</v-list-tile-title>
          </v-card-title>
          <v-list dense class="none-padding">
            <v-list-tile>
              <v-list-tile-content>항목 추가하기</v-list-tile-content>
              <v-list-tile-content class="align-end"></v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </template>
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-divider></v-divider>
            <v-card-title class="none-padding overflow-hidden">
              <v-switch
                v-model="props.item.expanded"
                :label="(props.item.expanded) ? '닫기' : '열기'"
                class="mt-0 pr-0 compact-form"
              ></v-switch>
              <v-spacer></v-spacer>
              <v-list-tile-title class="font-weight-medium" @click="onClickMatInfo(props)">{{ props.item.mat_NM.substr(props.item.mat_NM.indexOf(':') + 1) }}</v-list-tile-title>
            </v-card-title>
            <v-list dense class="none-padding">
              <v-list-tile>
                <v-list-tile-content>합계:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.total_SUM }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>시간할증금:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.tm_PRI_AMT }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-list v-if="props.item.expanded" dense>
              <v-list-tile>
                <v-list-tile-content>수량:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.mat_QTY }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>자재비단가:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.mcst_PRCE }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>인건비단가:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.pexp_PRCE }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>자재비금액:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.mcst_AMT }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>인건비금액:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.pexp_AMT }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>철거비적용:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.dmol_COST_NM }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>시간할증적용:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.tm_PRI_NM }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>공간할증적용:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.spac_PRI_NM }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>공간할증금:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.pri_AMT }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
    <template v-if="isLoaded">
      <v-flex
        xs12
        sm6
        md4
        lg3
      >
        <v-card dark>
          <v-divider></v-divider>
          <v-list dense class="none-padding" :hidden="!isSaved">
            <v-list-tile>
              <v-list-tile-content>자재비합계:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ Math.round(mcstWholeCost) }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>인건비합계:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ Math.round(pexpWholeCost) }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>시간할증금:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ Math.round(timeWholeCost) }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="yellow--text">직접비합계:</v-list-tile-content>
              <v-list-tile-content class="align-end yellow--text">{{ Math.round(directWholeCost) }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </template>
    <div class="text-xs-center div-button">
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
            p_WORK_NO: this.work_NO,
            p_WORK_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
            p_PEXP_WHOLE_AMT: this.pexpWholeCost,
            p_MCST_WHOLE_AMT: this.mcstWholeCost,
            p_TM_PRI_WHOLE_AMT: this.timeWholeCost,
            p_PRI_WHOLE_AMT: this.spaceWholeCost
          }
        }"
        color="primary"
        dark
        class="pl-0 pr-0"
      >간접비현황</v-btn>
      <v-btn
        :to="{
          name: 'DirectCostDetail',
          params: {
            p_WORK_NO: this.work_NO,
            p_WORK_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
            p_MAT_SEQ: this.mat_SEQ
          }
        }"
        :disabled="isFinished"
        fixed
        dark
        icon
        bottom
        right
        color="primary"
      ><v-icon>add</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DirectCost',
  props: [ 'p_WORK_NO', 'p_WORK_PRGS_STAT_CD', 'isChanged' ],
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
      alert: true,
      isLoaded: false,
      work_NO: '',
      work_PRGS_STAT_CD: '',
      isSaved: false,
      isFirst: true
    }
  },
  created () {
    if (!this.isFirst) {
      this.init()
      this.isFirst = false
    }
  },
  activated () {
    if (this.isChanged && this.isFirst) {
      this.init()
    }
  },
  methods: {
    init () {
      // get props to variables
      this.work_NO = this.p_WORK_NO
      this.work_PRGS_STAT_CD = this.p_WORK_PRGS_STAT_CD

      this.isFinished = this.work_PRGS_STAT_CD !== '4'
      this.mcstWholeCost = 0
      this.pexpWholeCost = 0
      this.timeWholeCost = 0
      this.spaceWholeCost = 0

      let form = new FormData()
      form.append('WORK_NO', this.work_NO)

      this.$http.get(this.$path + '/m/getDirectCost.do', {
        params: { WORK_NO: this.work_NO }
      }).then(resp => {
        this.directCosts = resp.data.response
        for (let i = 0; i < this.directCosts.length; i++) {
          this.mcstWholeCost += (this.directCosts[i].mcst_AMT * 10) / 10
          this.pexpWholeCost += (this.directCosts[i].pexp_AMT * 10) / 10
          this.timeWholeCost += (this.directCosts[i].tm_PRI_AMT * 10) / 10
          this.spaceWholeCost += (this.directCosts[i].pri_AMT * 10) / 10
        }
        this.directWholeCost = Math.round(this.mcstWholeCost + this.pexpWholeCost)
        this.$http.get(this.$path + '/m/getMatSeq.do', {
          params: { WORK_NO: this.work_NO }
        }).then(resp => {
          this.mat_SEQ = resp.data.response[0]
          if (this.mat_SEQ > 1) this.isSaved = true
          else this.isSaved = false
        })
        this.isLoaded = true
      })
    },
    onClickMatInfo (props) {
      if (this.isFinished) {
        alert('정산완료된 정산서는 수정이 불가합니다.')
      } else {
        this.$router.push({
          name: 'DirectCostUpdate',
          params: {
            p_WORK_NO: this.work_NO,
            p_WORK_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
            p_MAT_SEQ: props.item.mat_SEQ
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.compact-form {
  transform: scale(0.75);
  transform-origin: left bottom;
}

.none-padding {
  padding-top: 0;
  padding-bottom: 0;
}

div.div-button {
  position: sticky;
  background-color: white;
  bottom: 0;
  width: 100%;
  line-height:50px;
  text-align:center;
}

div.div-button > v-btn {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.floating-button {
  z-index: 10;
}
</style>
