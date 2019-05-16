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
      v-model="qty"
      v-validate="'required'"
      :error-messages="errors.collect('qty')"
      label="수량"
      data-vv-name="qty"
      required
      v-on:change="changeQty()"
    ></v-text-field>
    <v-select
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="mcst_CPUT_PRCE"
      item-text="mcst_CPUT_PRCE"
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
      item-value="pexp_CPUT_PRCE"
      item-text="pexp_CPUT_PRCE"
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
      v-model="total"
      v-validate="'required'"
      :error-messages="errors.collect('total')"
      label="합계"
      data-vv-name="total"
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
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
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
    description: ''
  }),
  created () {
    this.$http.get('/m/getWorkType.do').then(resp => {
      this.matTypes = resp.data.response
      console.log(resp)
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP826' }
    }).then(resp => {
      this.demolTypes = resp.data.response
      console.log(resp)
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP827' }
    }).then(resp => {
      this.timeTypes = resp.data.response
      console.log(resp)
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP828' }
    }).then(resp => {
      this.spaceTypes = resp.data.response
      console.log(resp)
    })
    this.$http.get('/m/getDirectCostDetail.do').then(resp => {
      this.directCostDetails = resp.data.response
      console.log(resp)
      console.log(this.directCostDetails)
      console.log(this.directCostDetails[0].wrk_TYPE_CD)
      if (this.directCostDetails === null) return
      this.subContract = this.directCostDetails[0].carr_USE_CD
      this.matType = this.directCostDetails[0].wrk_TYPE_CD
      this.changeType(this.matType)
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
        // this.matInfo.mat_NO = this.directCostDetails[0].mat_NO
        // this.matInfo.mat_NM = this.directCostDetails[0].mat_NM
        // this.matInfo.spec_DESC = this.directCostDetails[0].spec_DESC
        // this.matInfo.unit_DESC = this.directCostDetails[0].unit_DESC
        // this.qty = this.directCostDetails[0].mat_QTY
        // this.matInfo.mcst_CPUT_PRCE = this.directCostDetails[0].mcst_PRCE
        // this.matInfo.pexp_CPUT_PRCE = this.directCostDetails[0].pexp_PRCE
        // this.demolType = this.directCostDetails[0].dmol_COST_CD
      })
    },
    changeMatInfo () {
      this.mcstInit = this.matInfo.mcst_CPUT_PRCE
      this.pexpInit = this.matInfo.pexp_CPUT_PRCE
      this.changeQty()
      this.changeDemolType()
      this.changeTimeType()
      this.changeSpaceType()
    },
    changeQty () {
      this.pexpTotal = this.matInfo.pexp_CPUT_PRCE * this.qty
      this.mcstTotal = this.matInfo.mcst_CPUT_PRCE * this.qty
      this.total = this.pexpTotal + this.mcstTotal
    },
    changeDemolType () {
      if (this.demolType === null) return
      console.log(this.demolType)
      console.log(this.demolType.code_CTRL01)
      this.matInfo.pexp_CPUT_PRCE = this.pexpInit * this.demolType.code_CTRL01
      this.matInfo.mcst_CPUT_PRCE = this.mcstInit * this.demolType.code_CTRL01
      this.pexpTotal = this.matInfo.pexp_CPUT_PRCE * this.qty
      this.mcstTotal = this.matInfo.mcst_CPUT_PRCE * this.qty
      this.total = this.pexpTotal + this.mcstTotal
    },
    changeTimeType () {
      if (this.timeType === null) return
      console.log(this.timeType)
      console.log(this.timeType.code_CTRL01)
      this.timeCost = this.matInfo.pexp_CPUT_PRCE * this.timeType.code_CTRL01
      this.total = this.pexpTotal + this.mcstTotal + this.timeCost
    },
    changeSpaceType () {
      if (this.spaceType === null) return
      console.log(this.spaceType)
      console.log(this.spaceType.code_CTRL01)
      this.spaceCost = this.matInfo.mcst_CPUT_PRCE * this.spaceType.code_CTRL01
      this.total = this.pexpTotal + this.mcstTotal + this.spaceCost
    }
  }
}
</script>

<style>

</style>
