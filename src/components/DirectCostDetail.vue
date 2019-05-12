<template>
  <form>
    <v-checkbox
      v-model="subContract"
      value="1"
      label="사급유무"
      data-vv-name="subContract"
      type="subContract"
      class="ml-2 mr-2"
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
      class="ml-2 mr-2"
    ></v-select>
    <v-autocomplete
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="mat_NO"
      item-text="mat_NM"
      :error-messages="errors.collect('matInfo')"
      label="자재명"
      data-vv-name="matInfo"
      persistent-hint
      return-object
      v-on:change="changeMatInfo()"
      class="ml-2 mr-2"
    >
    </v-autocomplete>
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
      class="ml-2 mr-2"
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
      class="ml-2 mr-2"
    ></v-select>
    <v-text-field
      v-model="matQty"
      v-validate="'required'"
      :error-messages="errors.collect('matQty')"
      label="수량"
      data-vv-name="matQty"
      required
      v-on:change="changeQty()"
      class="ml-2 mr-2"
    ></v-text-field>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="mcst_PRCE"
      item-text="mcst_PRCE"
      :error-messages="errors.collect('mcstPrice')"
      label="자재비 단가"
      data-vv-name="mcstPrice"
      required
      readonly
      append-icon
      class="ml-2 mr-2"
    ></v-select>
    <v-text-field
      v-model="mcstTotal"
      v-validate="'required'"
      :error-messages="errors.collect('mcstTotal')"
      label="자재비 금액"
      data-vv-name="mcstTotal"
      required
      readonly
      class="ml-2 mr-2"
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
      class="ml-2 mr-2"
    ></v-select>
    <v-text-field
      v-model="pexpTotal"
      v-validate="'required'"
      :error-messages="errors.collect('pexpTotal')"
      label="인건비 금액"
      data-vv-name="pexpTotal"
      required
      readonly
      class="ml-2 mr-2"
    ></v-text-field>
    <v-text-field
      v-model="timeCost"
      v-validate="'required'"
      :error-messages="errors.collect('timeCost')"
      label="시간할증금"
      data-vv-name="timeCost"
      readonly
      class="ml-2 mr-2"
    ></v-text-field>
    <v-text-field
      v-model="total"
      v-validate="'required'"
      :error-messages="errors.collect('total')"
      label="합계"
      data-vv-name="total"
      required
      readonly
      class="ml-2 mr-2"
    ></v-text-field>
    <v-text-field
      v-model="spaceCost"
      v-validate="'required'"
      :error-messages="errors.collect('spaceCost')"
      label="공간할증금"
      data-vv-name="spaceCost"
      readonly
      class="ml-2 mr-2"
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
      class="ml-2 mr-2"
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
      class="ml-2 mr-2"
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
      class="ml-2 mr-2"
    ></v-select>
    <v-textarea
      v-model="description"
      auto-grow
      box
      color="deep-purple"
      label="비고"
      rows="1"
      class="ml-2 mr-2"
    ></v-textarea>
    <div class="text-xs-center">
      <v-btn
        @click="insertDirectCost"
        color="primary"
      >저장</v-btn>
      <v-btn
        :to="{
          name: 'DirectCost',
          params: {
            work_NO: this.work_NO,
            work_PRGS_STAT_CD: this.work_PRGS_STAT_CD
          }
        }"
        color="primary">완료</v-btn>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

export default {
  name: 'DirectCostDetail',
  props: ['work_NO', 'work_PRGS_STAT_CD', 'mat_SEQ'],
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    mcstInit: '',
    pexpInit: '',
    matQty: '',
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
    description: ''
  }),
  created () {
    this.$http.get('/corp/m/getWorkType.do').then(resp => {
      this.matTypes = resp.data.response
    })
    this.$http.get('/corp/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP826' }
    }).then(resp => {
      this.demolTypes = resp.data.response
    })
    this.$http.get('/corp/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP827' }
    }).then(resp => {
      this.timeTypes = resp.data.response
    })
    this.$http.get('/corp/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP828' }
    }).then(resp => {
      this.spaceTypes = resp.data.response
    })
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  methods: {
    insertDirectCost () {
      confirm('저장하시겠습니까?')
      this.$validator.validateAll()
      if (this.errors.any()) {
        alert('필수 정보를 입력하세요!')
        return
      }
      this.$http.get('/corp/m/setDirectCost.do', {
        params: {
          WORK_NO: this.work_NO,
          MAT_SEQ: this.mat_SEQ,
          MAT_NO: this.matInfo.mat_NO,
          CARR_USE_CD: this.subContract,
          MAT_QTY: this.matQty,
          MCST_PRCE: this.matInfo.mcst_PRCE,
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
    },
    changeType (type) {
      console.log(type)
      this.$http.get('/corp/m/getMatInfo.do', {
        params: { WRK_TYPE_CD: type }
      }).then(resp => {
        this.matInfos = resp.data.response
        console.log(resp)
        console.log(this.matInfos)
      })
    },
    changeMatInfo () {
      this.mcstInit = this.matInfo.mcst_PRCE
      this.pexpInit = this.matInfo.pexp_PRCE
      // this.matInfo.mcst_PRCE = Math.round(this.matInfo.mcst_PRCE)
      // this.matInfo.pexp_PRCE = Math.round(this.matInfo.pexp_PRCE)
      if (this.matQty === null) {
      } else {
        this.changeQty()
      }
      this.changeDemolType()
      this.changeTimeType()
      this.changeSpaceType()
    },
    changeQty () {
      this.pexpTotal = Math.round(this.matInfo.pexp_PRCE * this.matQty)
      this.mcstTotal = Math.round(this.matInfo.mcst_PRCE * this.matQty)
      this.total = Math.round(this.pexpTotal + this.mcstTotal)
    },
    changeDemolType () {
      if (this.demolType === null) return
      console.log(this.demolType)
      console.log(this.demolType.code_CTRL01)
      this.matInfo.pexp_PRCE = Math.round(this.pexpInit * this.demolType.code_CTRL01)
      this.matInfo.mcst_PRCE = Math.round(this.mcstInit * this.demolType.code_CTRL01)
      this.pexpTotal = Math.round(this.matInfo.pexp_PRCE * this.matQty)
      this.mcstTotal = Math.round(this.matInfo.mcst_PRCE * this.matQty)
      this.total = Math.round(this.pexpTotal + this.mcstTotal)
    },
    changeTimeType () {
      if (this.timeType === null) return
      console.log(this.timeType)
      console.log(this.timeType.code_CTRL01)
      this.timeCost = Math.round(this.matInfo.pexp_PRCE * this.timeType.code_CTRL01)
    },
    changeSpaceType () {
      if (this.spaceType === null) return
      console.log(this.spaceType)
      console.log(this.spaceType.code_CTRL01)
      this.spaceCost = Math.round(this.matInfo.mcst_PRCE * this.spaceType.code_CTRL01)
    }
  }
}
</script>

<style>

</style>
