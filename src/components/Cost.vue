<template>
  <form>
    <v-checkbox
      v-model="checkbox"
      :error-messages="errors.collect('checkbox')"
      value="1"
      label="사급유무"
      data-vv-name="checkbox"
      type="checkbox"
      required
    ></v-checkbox>
    <v-select
      v-model="select"
      v-validate="'required'"
      :items="types"
      item-value="code_CD"
      item-text="code_DESC1"
      :error-messages="errors.collect('select')"
      label="작업유형"
      data-vv-name="select"
      required
      v-on:change="changeType(`${select}`)"
    ></v-select>
    <v-autocomplete
      v-model="model"
      v-validate="'required'"
      :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'"
      :items="infos"
      item-value="mat_NO"
      item-text="mat_NM"
      :readonly="!isEditing"
      :label="`자재명 — ${isEditing ? 'Editable' : 'Readonly'}`"
      data-vv-name="model"
      persistent-hint
      return-object
      v-on:change="changeQty()"
    >
    </v-autocomplete>
    <v-select
      v-model="model"
      v-validate="'required'"
      :items="infos"
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
      v-model="model"
      v-validate="'required'"
      :items="infos"
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
      v-model="model"
      v-validate="'required'"
      :items="infos"
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
      v-model="mcst_tot"
      v-validate="'required'"
      :error-messages="errors.collect('mcst_tot')"
      label="자재비 금액"
      data-vv-name="mcst_tot"
      required
      readonly
    ></v-text-field>
    <v-select
      v-model="model"
      v-validate="'required'"
      :items="infos"
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
      v-model="pexp_tot"
      v-validate="'required'"
      :error-messages="errors.collect('pexp_tot')"
      label="인건비 금액"
      data-vv-name="pexp_tot"
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
    <v-select
      v-model="demolCode"
      v-validate="'required'"
      :items="demolCosts"
      item-value="code_CD"
      item-text="code_NM"
      :error-messages="errors.collect('demolCode')"
      label="철거비적용"
      data-vv-name="demolCode"
      required
    ></v-select>
    <v-select
      v-model="timeCode"
      v-validate="'required'"
      :items="timeCosts"
      item-value="code_CD"
      item-text="code_NM"
      :error-messages="errors.collect('timeCode')"
      label="시간할증"
      data-vv-name="timeCode"
      required
    ></v-select>
    <v-select
      v-model="spaceCode"
      v-validate="'required'"
      :items="spaceCosts"
      item-value="code_CD"
      item-text="code_NM"
      :error-messages="errors.collect('spaceCode')"
      label="공간할증"
      data-vv-name="spaceCode"
      required
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
    qty: '',
    pexp_tot: '',
    mcst_tot: '',
    total: '',
    name: '',
    email: '',
    select: null,
    materials: [],
    types: [],
    checkbox: null,
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
    model: null,
    infos: [],
    demolCode: null,
    timeCode: null,
    spaceCode: null,
    demolCosts: [],
    timeCosts: [],
    spaceCosts: [],
    description: ''
  }),
  created () {
    this.$http.get('/m/getWorkType.do').then(resp => {
      this.types = resp.data.response
      console.log(resp)
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP826' }
    }).then(resp => {
      this.demolCosts = resp.data.response
      console.log(resp)
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP827' }
    }).then(resp => {
      this.timeCosts = resp.data.response
      console.log(resp)
    })
    this.$http.get('/m/getCtrlInfo.do', {
      params: { CLS_ID: 'BSP828' }
    }).then(resp => {
      this.spaceCosts = resp.data.response
      console.log(resp)
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
      this.checkbox = null
      this.$validator.reset()
    },
    changeType (type) {
      console.log(type)
      this.$http.get('/m/getMatInfo.do', {
        params: { WRK_TYPE_CD: type }
      }).then(resp => {
        this.infos = resp.data.response
        console.log(resp)
        console.log(this.infos)
      })
    },
    setInfo (model) {
      console.log(model)
    },
    changeQty () {
      if (this.qty <= 0) return
      this.pexp_tot = this.model.pexp_CPUT_PRCE * this.qty
      this.mcst_tot = this.model.mcst_CPUT_PRCE * this.qty
      this.total = this.pexp_tot + this.mcst_tot
    }
  }
}
</script>

<style>

</style>
