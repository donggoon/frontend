<template>
  <form>
    <v-checkbox
      v-model="subContract"
      :error-messages="errors.collect('subContract')"
      value="1"
      label="사급유무"
      data-vv-name="subContract"
      type="subContract"
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
    ></v-select>
    <v-autocomplete
      v-model="matInfo"
      v-validate="'required'"
      :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'"
      :items="matInfos"
      item-value="mat_NO"
      item-text="mat_NM"
      :readonly="!isEditing"
      :label="`자재명 — ${isEditing ? 'Editable' : 'Readonly'}`"
      data-vv-name="matInfo"
      persistent-hint
      return-object
      v-on:change="changeMatInfo()"
    >
    </v-autocomplete>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="spec_DESC"
      item-text="spec_DESC"
      :error-messages="errors.collect('spec')"
      label="규격"
      data-vv-name="spec"
      required
      readonly
      append-icon
    ></v-select>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="unit_DESC"
      item-text="unit_DESC"
      :error-messages="errors.collect('unit')"
      label="단위"
      data-vv-name="unit"
      required
      readonly
      append-icon
    ></v-select>
    <v-text-field
      v-model="matQty"
      v-validate="'required'"
      :error-messages="errors.collect('matQty')"
      label="수량"
      data-vv-name="matQty"
      required
      v-on:change="changeQty()"
    ></v-text-field>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="mcst_PRCE"
      item-text="mcst_PRCE"
      :error-messages="errors.collect('mcst')"
      label="자재비 단가"
      data-vv-name="mcst"
      required
      readonly
      append-icon
    ></v-select>
    <v-text-field
      v-model="mcstTotal"
      v-validate="'required'"
      :error-messages="errors.collect('mcstTotal')"
      label="자재비 금액"
      data-vv-name="mcstTotal"
      required
      readonly
    ></v-text-field>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="pexp_PRCE"
      item-text="pexp_PRCE"
      :error-messages="errors.collect('pexp')"
      label="인건비 단가"
      data-vv-name="pexp"
      required
      readonly
      append-icon
    ></v-select>
    <v-text-field
      v-model="pexpTotal"
      v-validate="'required'"
      :error-messages="errors.collect('pexpTotal')"
      label="인건비 금액"
      data-vv-name="pexpTotal"
      required
      readonly
    ></v-text-field>
    <v-text-field
      v-model="timeCost"
      :error-messages="errors.collect('timeCost')"
      label="시간할증금"
      data-vv-name="timeCost"
      readonly
    ></v-text-field>
    <v-text-field
      v-model="total"
      v-validate="'required'"
      :error-messages="errors.collect('total')"
      label="합계"
      data-vv-name="total"
      required
      readonly
    ></v-text-field>
    <v-text-field
      v-model="spaceCost"
      :error-messages="errors.collect('spaceCost')"
      label="공간할증금"
      data-vv-name="spaceCost"
      readonly
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
    ></v-select>
    <v-textarea
      v-model="description"
      auto-grow
      box
      color="deep-purple"
      label="비고"
      rows="1"
    ></v-textarea>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

export default {
  name: 'DirectCostUpdate',
  props: ['work_NO', 'mat_SEQ'],
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    directCostDetail: [],
    directCostDetails: [],
    mcstInit: '',
    pexpInit: '',
    qty: '',
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
        email: 'E-mail Address'
        // custom attributes
      },
      custom: {
        name: {
          required: () => 'Name can not be empty',
          max: 'The name field may not be greater than 10 characters'
          // custom messages
        },
        select: {
          required: 'Select field is required'
        }
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
    matQty: null,
    description: ''
  }),
  created () {
    console.log(this.work_NO)
    console.log(this.mat_SEQ)
    this.$http.get('/m/getWorkType.do').then(resp => {
      this.matTypes = resp.data.response
      this.matTypes.push({ code_CD: '99', code_DESC1: '단가미적용' })
      console.log(this.matTypes)
      console.log(resp)
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP826' }
    }).then(resp => {
      this.demolTypes = resp.data.response
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP827' }
    }).then(resp => {
      this.timeTypes = resp.data.response
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP828' }
    }).then(resp => {
      this.spaceTypes = resp.data.response
    })
    this.$http.get('/m/getDirectCostDetail.do', {
      params: { WORK_NO: this.work_NO, MAT_SEQ: this.mat_SEQ }
    }).then(resp => {
      this.directCostDetails = resp.data.response
      this.directCostDetail = this.directCostDetails[0]

      if (this.directCostDetail.wrk_TYPE_CD === null) {
        this.matType = '99'
      } else {
        this.matType = this.directCostDetail.wrk_TYPE_CD
      }
      this.matQty = this.directCostDetail.mat_QTY
      this.demolType = this.directCostDetail.dmol_COST_CD
      this.timeType = this.directCostDetail.tm_PRI_CD
      this.spaceType = this.directCostDetail.spac_PRI_CD
      this.description = this.directCostDetail.rmk_DESC

      if (this.directCostDetail.mat_NO === '*') {
        this.matInfos.push({
          mat_NM: this.directCostDetail.mat_NM,
          mat_NO: this.directCostDetail.mat_NO,
          mcst_PRCE: this.directCostDetail.mcst_PRCE,
          pexp_PRCE: this.directCostDetail.pexp_PRCE,
          pre_YY_MCST_PRCE: null,
          pre_YY_PEXP_PRCE: null,
          spec_DESC: this.directCostDetail.spec_DESC,
          unit_DESC: this.directCostDetail.unit_DESC,
          use_CD: null,
          use_NM: null,
          use_YY: null,
          wrk_TYPE_CD: null,
          wrk_TYPE_NM: null
        })
        this.matInfo = this.matInfos[0]
        this.mcstInit = this.matInfo.mcst_PRCE
        this.pexpInit = this.matInfo.pexp_PRCE
        console.log(this.matInfos)
        console.log(this.matInfo)
        this.changeQty()
      } else {
        console.log('else')
        this.$http.get('/m/getMatInfo.do', {
          params: { WRK_TYPE_CD: this.directCostDetail.wrk_TYPE_CD, MAT_NO: this.directCostDetail.mat_NO }
        }).then(resp => {
          this.matInfos = resp.data.response
          console.log(resp)
          console.log(this.matInfos)
        })
      }
    })
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    submit () {
      this.$validator.validateAll()
    },
    clear () {
      this.name = ''
      this.email = ''
      this.select = null
      this.subContract = null
      this.$validator.reset()
    },
    changeType (type) {
      console.log(type)
      this.$http.get('/m/getMatInfo.do', {
        params: { WRK_TYPE_CD: type }
      }).then(resp => {
        this.matInfos = resp.data.response
        console.log(resp)
        console.log(this.matInfos)
      })
    },
    changeMatInfo () {
      console.log(this.matInfo)
      this.mcstInit = this.matInfo.mcst_PRCE
      this.pexpInit = this.matInfo.pexp_PRCE
      this.changeQty()
      this.changeDemolType()
      this.changeTimeType()
      this.changeSpaceType()
    },
    changeQty () {
      this.pexpTotal = this.matInfo.pexp_PRCE * this.matQty
      this.mcstTotal = this.matInfo.mcst_PRCE * this.matQty
      this.total = this.pexpTotal + this.mcstTotal
    },
    changeDemolType () {
      console.log(this.demolType)
      if (this.demolType === null) return
      this.matInfo.pexp_PRCE = this.pexpInit * this.demolType.code_CTRL01
      this.matInfo.mcst_PRCE = this.mcstInit * this.demolType.code_CTRL01
      this.pexpTotal = this.matInfo.pexp_PRCE * this.matQty
      this.mcstTotal = this.matInfo.mcst_PRCE * this.matQty
      this.total = this.pexpTotal + this.mcstTotal
    },
    changeTimeType () {
      console.log(this.timeType)
      if (this.timeType === null) return
      this.timeCost = this.matInfo.pexp_PRCE * this.timeType.code_CTRL01
    },
    changeSpaceType () {
      console.log(this.spaceType)
      if (this.spaceType === null) return
      this.spaceCost = this.matInfo.mcst_PRCE * this.spaceType.code_CTRL01
    }
  }
}
</script>

<style>

</style>
