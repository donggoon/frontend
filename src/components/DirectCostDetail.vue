<!--
  - 1. 서브메뉴명 : 직접비 현황 추가
  - 2. 프로그램ID : DirectCostDetail.vue
  - 3. 프로그램명 : 비용정산
  - 4. 작성자 : 김동건
  - 5. 작성일 : 2019.07.08
  -->
<template>
  <form>
    <v-checkbox
      v-model="subContract"
      value="Y"
      label="사급유무"
      data-vv-name="subContract"
      type="subContract"
      class="compact-form none-padding ml-2 mr-2"
      @change="changeSubContract"
    ></v-checkbox>
    <v-select
      v-model="matType"
      v-validate="'required'"
      :items="matTypes"
      item-value="code_CD"
      item-text="code_DESC1"
      :error-messages="errors.collect('matType')"
      label="작업유형"
      data-vv-name="matType"
      required
      v-on:change="changeType(`${matType}`)"
      class="none-padding ml-2 mr-2"
    ></v-select>
    <v-autocomplete
      v-model="matInfo"
      :items="matInfos"
      item-value="mat_NO"
      item-text="mat_NM"
      :error-messages="errors.collect('matInfo')"
      label="자재명"
      data-vv-name="matInfo"
      persistent-hint
      return-object
      @change="changeMatInfo"
      class="none-padding ml-2 mr-2"
    ></v-autocomplete>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="spec_DESC"
      item-text="spec_DESC"
      :error-messages="errors.collect('specDesc')"
      label="규격"
      data-vv-name="specDesc"
      required
      readonly
      append-icon
      class="none-padding ml-2 mr-2"
    ></v-select>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="unit_DESC"
      item-text="unit_DESC"
      :error-messages="errors.collect('unitDesc')"
      label="단위"
      data-vv-name="unitDesc"
      required
      readonly
      append-icon
      class="none-padding ml-2 mr-2"
    ></v-select>
    <v-text-field
      v-model="matQty"
      v-validate="'required'"
      :error-messages="errors.collect('matQty')"
      label="수량"
      data-vv-name="matQty"
      required
      v-on:change="changeQty()"
      class="none-padding ml-2 mr-2"
    ></v-text-field>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      :item-value="(this.subContract === null) ? 'mcst_PRCE' : 'mcst_FOR_SUB_CONTRACT'"
      :item-text="(this.subContract === null) ? 'mcst_PRCE' : 'mcst_FOR_SUB_CONTRACT'"
      :error-messages="errors.collect('mcstPrice')"
      label="자재비 단가"
      data-vv-name="mcstPrice"
      required
      readonly
      append-icon
      class="none-padding ml-2 mr-2"
    ></v-select>
    <v-text-field
      v-model="mcstTotal"
      v-validate="'required'"
      :error-messages="errors.collect('mcstTotal')"
      label="자재비 금액"
      data-vv-name="mcstTotal"
      required
      readonly
      class="none-padding ml-2 mr-2"
    ></v-text-field>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="pexp_PRCE"
      item-text="pexp_PRCE"
      :error-messages="errors.collect('pexpPrice')"
      label="인건비 단가"
      data-vv-name="pexpPrice"
      required
      readonly
      append-icon
      class="none-padding ml-2 mr-2"
    ></v-select>
    <v-text-field
      v-model="pexpTotal"
      v-validate="'required'"
      :error-messages="errors.collect('pexpTotal')"
      label="인건비 금액"
      data-vv-name="pexpTotal"
      required
      readonly
      class="none-padding ml-2 mr-2"
    ></v-text-field>
    <v-text-field
      v-model="total"
      v-validate="'required'"
      :error-messages="errors.collect('total')"
      label="합계"
      data-vv-name="total"
      required
      readonly
      class="none-padding ml-2 mr-2"
    ></v-text-field>
    <v-text-field
      v-model="timeCost"
      v-validate="'required'"
      :error-messages="errors.collect('timeCost')"
      label="시간할증금"
      data-vv-name="timeCost"
      readonly
      class="none-padding ml-2 mr-2"
    ></v-text-field>
    <v-text-field
      v-model="spaceCost"
      v-validate="'required'"
      :error-messages="errors.collect('spaceCost')"
      label="공간할증금"
      data-vv-name="spaceCost"
      readonly
      class="none-padding ml-2 mr-2"
    ></v-text-field>
    <v-select
      v-model="demolType"
      v-validate="'required'"
      :items="demolTypes"
      item-value="code_CD"
      item-text="code_NM"
      :error-messages="errors.collect('demolType')"
      label="철거비적용"
      data-vv-name="demolType"
      required
      return-object
      v-on:change="changeDemolType()"
      class="none-padding ml-2 mr-2"
    ></v-select>
    <v-select
      v-model="timeType"
      v-validate="'required'"
      :items="timeTypes"
      item-value="code_CD"
      item-text="code_NM"
      :error-messages="errors.collect('timeType')"
      label="시간할증"
      data-vv-name="timeType"
      required
      return-object
      v-on:change="changeTimeType()"
      class="none-padding ml-2 mr-2"
    ></v-select>
    <v-select
      v-model="spaceType"
      v-validate="'required'"
      :items="spaceTypes"
      item-value="code_CD"
      item-text="code_NM"
      :error-messages="errors.collect('spaceType')"
      label="공간할증"
      data-vv-name="spaceType"
      required
      return-object
      v-on:change="changeSpaceType()"
      class="none-padding ml-2 mr-2"
    ></v-select>
    <v-textarea
      v-model="description"
      auto-grow
      box
      color="deep-purple"
      label="비고"
      rows="1"
      class="none-padding ml-2 mr-2"
    ></v-textarea>
    <div class="text-xs-center div-button">
      <v-btn
        @click="insertDirectCost"
        color="primary"
      >저장</v-btn>
      <v-btn
        :to="{
          name: 'DirectCost',
          params: {
            p_WORK_NO: this.work_NO,
            p_WORK_PRGS_STAT_CD: this.work_PRGS_STAT_CD
          }
        }"
        color="primary">돌아가기</v-btn>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { mapGetters, mapMutations } from 'vuex'

Vue.use(VeeValidate)

export default {
  name: 'DirectCostDetail',
  props: ['p_WORK_NO', 'p_WORK_PRGS_STAT_CD', 'p_MAT_SEQ'],
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    mcstInit: '',
    pexpInit: '',
    matQty: null,
    pexpTotal: '',
    mcstTotal: '',
    timeCost: '',
    spaceCost: '',
    total: '',
    name: '',
    email: '',
    materials: [],
    matType: null,
    matTypes: [],
    subContract: null,
    dictionary: {
      attributes: {
        matType: '작업유형',
        matInfo: '자재명',
        specDesc: '규격',
        unitDesc: '단위',
        matQty: '수량',
        mcstPrice: '자재비 단가',
        mcstTotal: '자재비 금액',
        pexpPrice: '인건비 단가',
        pexpTotal: '인건비 금액',
        timeCost: '시간할증금',
        total: '합계',
        spaceCost: '공간할증금',
        demolType: '철거비적용',
        timeType: '시간할증',
        spaceType: '공간할증'
      }
    },
    isEditing: true,
    matInfo: [],
    matInfos: [],
    demolType: null,
    timeType: null,
    spaceType: null,
    demolTypes: [],
    timeTypes: [],
    spaceTypes: [],
    description: null,
    work_NO: '',
    work_PRGS_STAT_CD: '',
    mat_SEQ: ''
  }),
  created () {
    this.closeDrawer()
    // get props to variables
    this.work_NO = this.p_WORK_NO
    this.work_PRGS_STAT_CD = this.p_WORK_PRGS_STAT_CD
    this.mat_SEQ = this.p_MAT_SEQ

    this.$http.get(this.$path + '/m/getWorkType.do').then(resp => {
      this.matTypes = resp.data.response
      this.matTypes.push({ code_CD: '99', code_DESC1: '단가미적용' })
    }).catch(error => {
      var errorPage
      if (this.getRunMode === 'local') {
        errorPage = error.response.request.responseURL.replace('7070', '9090')
      } else {
        errorPage = error.response.request.responseURL
      }
      window.location.href = errorPage
    })
    this.$http.get(this.$path + '/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP826' }
    }).then(resp => {
      this.demolTypes = resp.data.response
      this.demolType = this.demolTypes[0]
    }).catch(error => {
      var errorPage
      if (this.getRunMode === 'local') {
        errorPage = error.response.request.responseURL.replace('7070', '9090')
      } else {
        errorPage = error.response.request.responseURL
      }
      window.location.href = errorPage
    })
    this.$http.get(this.$path + '/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP827' }
    }).then(resp => {
      this.timeTypes = resp.data.response
      this.timeType = this.timeTypes[0]
    }).catch(error => {
      var errorPage
      if (this.getRunMode === 'local') {
        errorPage = error.response.request.responseURL.replace('7070', '9090')
      } else {
        errorPage = error.response.request.responseURL
      }
      window.location.href = errorPage
    })
    this.$http.get(this.$path + '/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP828' }
    }).then(resp => {
      this.spaceTypes = resp.data.response
      this.spaceType = this.spaceTypes[0]
    }).catch(error => {
      var errorPage
      if (this.getRunMode === 'local') {
        errorPage = error.response.request.responseURL.replace('7070', '9090')
      } else {
        errorPage = error.response.request.responseURL
      }
      window.location.href = errorPage
    })
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  computed: {
    ...mapGetters(['getRunMode'])
  },
  methods: {
    ...mapMutations(['closeDrawer']),
    async insertDirectCost () {
      if (!confirm('저장하시겠습니까?')) return
      this.$validator.validateAll()
      if (this.errors.any()) {
        alert('필수 정보를 입력하세요!')
        return
      }
      await this.$http.get(this.$path + '/m/setDirectCost.do', {
        params: {
          WORK_NO: this.work_NO,
          MAT_SEQ: this.mat_SEQ,
          MAT_NO: this.matInfo.mat_NO,
          CARR_USE_CD: this.subContract,
          MAT_QTY: this.matQty,
          MCST_PRCE: this.subContract === null ? this.matInfo.mcst_PRCE : 0,
          PEXP_PRCE: this.matInfo.pexp_PRCE,
          TM_PRI_AMT: this.timeCost,
          DMOL_COST_CD: this.demolType.code_CD,
          TM_PRI_CD: this.timeType.code_CD,
          SPAC_PRI_CD: this.spaceType.code_CD,
          DMOL_COST_APPL_RATE: this.demolType.code_CTRL01,
          TM_PRI_APPL_RATE: this.timeType.code_CTRL01,
          SPAC_PRI_APPL_RATE: this.spaceType.code_CTRL01,
          RMK_DESC: this.description,
          SPEC_DESC: this.matInfo.spec_DESC,
          UNIT_DESC: this.matInfo.unit_DESC,
          MAT_NM: this.matInfo.mat_NM,
          MCST_AMT: this.mcstTotal,
          PEXP_AMT: this.pexpTotal,
          PRI_AMT: this.spaceCost
        }
      })
      alert('저장되었습니다.')
      this.$router.push({
        name: 'DirectCost',
        params: {
          p_WORK_NO: this.work_NO,
          p_WORK_PRGS_STAT_CD: this.work_PRGS_STAT_CD,
          isChanged: true
        }
      })
    },
    changeType (type) {
      if (type === '99') {
        alert('단가미적용 항목은 PC버전에서 등록해 주시기 바랍니다.')
        this.matType = ''
        return
      }
      this.$http.get(this.$path + '/m/getMatInfo.do', {
        params: { WRK_TYPE_CD: type }
      }).then(resp => {
        this.matInfos = resp.data.response
      }).catch(error => {
        var errorPage
        if (this.getRunMode === 'local') {
          errorPage = error.response.request.responseURL.replace('7070', '9090')
        } else {
          errorPage = error.response.request.responseURL
        }
        window.location.href = errorPage
      })
    },
    changeMatInfo () {
      this.subContract = null
      this.mcstInit = this.matInfo.mcst_PRCE
      this.mcstInitForSubContract = this.matInfo.mcst_PRCE
      this.pexpInit = this.matInfo.pexp_PRCE
      if (this.matQty !== null) {
        this.changeQty()
      }
      if (this.demolType !== null) this.changeDemolType()
      if (this.timeType !== null) this.changeTimeType()
      if (this.spaceType !== null) this.changeSpaceType()
    },
    changeQty () {
      this.pexpTotal = this.matInfo.pexp_PRCE * this.matQty
      if (this.subContract) this.mcstTotal = 0
      else this.mcstTotal = this.matInfo.mcst_PRCE * this.matQty
      this.total = this.pexpTotal + this.mcstTotal
      this.changeTimeType()
      this.changeSpaceType()
      this.pexpTotal = Math.round(this.pexpTotal * 10) / 10
      this.mcstTotal = Math.round(this.mcstTotal * 10) / 10
      this.total = Math.round(this.total * 10) / 10
    },
    changeDemolType () {
      if (this.matQty === null) return
      if (this.subContract === null) {
        if (this.demolType.code_CD !== '0') {
          this.matInfo.mcst_PRCE = 0
        } else this.matInfo.mcst_PRCE = this.mcstInit * this.demolType.code_CTRL01
      } else this.matInfo.mcst_PRCE = 0
      this.matInfo.pexp_PRCE = this.pexpInit * this.demolType.code_CTRL01
      this.pexpTotal = this.matInfo.pexp_PRCE * this.matQty
      if (this.subContract) this.mcstTotal = 0
      else this.mcstTotal = this.matInfo.mcst_PRCE * this.matQty
      this.total = this.pexpTotal + this.mcstTotal
      this.changeTimeType()
      this.changeSpaceType()
      this.total = this.pexpTotal + this.mcstTotal
      this.matInfo.mcst_PRCE = Math.round(this.matInfo.mcst_PRCE * 10) / 10
      this.matInfo.pexp_PRCE = Math.round(this.matInfo.pexp_PRCE * 10) / 10
      this.pexpTotal = Math.round(this.pexpTotal * 10) / 10
      this.mcstTotal = Math.round(this.mcstTotal * 10) / 10
      this.total = Math.round(this.total * 10) / 10
    },
    changeTimeType () {
      if (this.timeType === '00') this.timeCost = 0
      else this.timeCost = this.pexpTotal * this.timeType.code_CTRL01
      this.timeCost = Math.round(this.timeCost)
    },
    changeSpaceType () {
      if (this.spaceType === '00') this.spaceCost = 0
      else this.spaceCost = this.pexpTotal * this.spaceType.code_CTRL01
      this.spaceCost = Math.round(this.spaceCost)
    },
    changeSubContract () {
      this.changeQty()
    }
  }
}
</script>

<style scoped>
.compact-form {
  transform: scale(0.8);
  transform-origin: left bottom;
}

.none-padding {
  padding-top: 0;
  padding-bottom: 0;
}

div.div-button {
  position: sticky;
  background-color: #fafafa;
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
</style>
