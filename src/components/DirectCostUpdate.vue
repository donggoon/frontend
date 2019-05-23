<template>
  <form>
    <v-checkbox
      v-model="subContract"
      value="Y"
      label="사급유무"
      data-vv-name="subContract"
      type="subContract"
      :readonly="isFinished"
      class="ml-2 mr-2"
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
      @change="changeType(`${matType}`)"
      :readonly="isFinished"
      class="ml-2 mr-2"
    ></v-select>
    <v-autocomplete
      v-model="matInfo"
      v-validate="'required'"
      :items="matInfos"
      item-value="mat_NO"
      item-text="mat_NM"
      :readonly="isFinished"
      label="자재명"
      data-vv-name="matInfo"
      persistent-hint
      return-object
      @change="changeMatInfo"
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
      @change="changeQty"
      :readonly="isFinished"
      class="ml-2 mr-2"
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
      @change="changeDemolType()"
      :readonly="isFinished"
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
      @change="changeTimeType()"
      :readonly="isFinished"
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
      @change="changeSpaceType()"
      :readonly="isFinished"
      class="ml-2 mr-2"
    ></v-select>
    <v-textarea
      v-model="description"
      auto-grow
      box
      color="deep-purple"
      label="비고"
      rows="1"
      :readonly="isFinished"
      class="ml-2 mr-2"
    ></v-textarea>

    <div class="text-xs-center">
      <v-btn
        @click="updateDirectCost"
        :disabled="isFinished"
        :hidden="isFinished"
        color="primary"
      >저장</v-btn>
      <v-btn
        @click="deleteDirectCost"
        :disabled="isFinished"
        :hidden="isFinished"
        color="primary"
      >삭제</v-btn>
      <v-btn
        :to="{
          name: 'DirectCost',
          params: {
            work_NO: this.work_NO,
            work_PRGS_STAT_CD: this.work_PRGS_STAT_CD
          }
        }"
        color="primary"
      >돌아가기</v-btn>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

export default {
  name: 'DirectCostUpdate',
  props: ['work_NO', 'work_PRGS_STAT_CD', 'mat_SEQ'],
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
    isFinished: true,
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
    matQty: null,
    description: ''
  }),
  created () {
    this.isFinished = this.work_PRGS_STAT_CD !== '4'
    this.$http.get('/m/getDirectCostDetail.do', {
      params: { WORK_NO: this.work_NO, MAT_SEQ: this.mat_SEQ }
    }).then(resp => {
      this.directCostDetails = resp.data.response
      this.directCostDetail = this.directCostDetails[0]

      this.$http.get('/m/getWorkType.do').then(resp => {
        this.matTypes = resp.data.response
        this.matTypes.push({ code_CD: '99', code_DESC1: '단가미적용' })
      })

      this.$http.get('/m/getCtrlInfo.do', {
        params: { CLS_ID: 'BSP826' }
      }).then(resp => {
        this.demolTypes = resp.data.response
        this.demolType = this.demolTypes[parseInt(this.directCostDetail.dmol_COST_CD, '10')]
        console.log(this.demolType.code_CTRL01)
        this.mcstInit = this.matInfo.mcst_PRCE / this.demolType.code_CTRL01
        this.pexpInit = this.matInfo.pexp_PRCE / this.demolType.code_CTRL01
      })

      this.$http.get('/m/getCtrlInfo.do', {
        params: { CLS_ID: 'BSP827' }
      }).then(resp => {
        this.timeTypes = resp.data.response
        this.timeType = this.timeTypes[parseInt(this.directCostDetail.tm_PRI_CD, '10')]
      })

      this.$http.get('/m/getCtrlInfo.do', {
        params: { CLS_ID: 'BSP828' }
      }).then(resp => {
        this.spaceTypes = resp.data.response
        this.spaceType = this.spaceTypes[parseInt(this.directCostDetail.spac_PRI_CD, '10')]
      })

      if (this.directCostDetail.wrk_TYPE_CD === null) {
        this.matType = '99'
      } else {
        this.matType = this.directCostDetail.wrk_TYPE_CD
      }

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
        this.matQty = this.directCostDetail.mat_QTY
        this.timeCost = this.directCostDetail.tm_PRI_AMT
        this.spaceCost = this.directCostDetail.pri_AMT
        this.description = this.directCostDetail.rmk_DESC
        this.changeQty()
      } else {
        this.$http.get('/m/getMatInfo.do', {
          params: { WRK_TYPE_CD: this.directCostDetail.wrk_TYPE_CD, MAT_NO: this.directCostDetail.mat_NO }
        }).then(resp => {
          this.matInfos = resp.data.response
          this.matInfo = this.matInfos[0]
          this.matQty = this.directCostDetail.mat_QTY
          this.timeCost = this.directCostDetail.tm_PRI_AMT
          this.spaceCost = this.directCostDetail.pri_AMT
          this.description = this.directCostDetail.rmk_DESC
          this.changeMatInfo()
        })
      }
    })
  },
  mounted () {
    this.$validator.localize('ko', this.dictionary)
  },
  methods: {
    async updateDirectCost () {
      if (!confirm('저장하시겠습니까?')) return
      this.$validator.validateAll()
      if (this.errors.any()) {
        alert('필수 정보를 입력하세요!')
        return
      }
      await this.$http.get('/m/updateDirectCost.do', {
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
          work_NO: this.work_NO,
          work_PRGS_STAT_CD: this.work_PRGS_STAT_CD
        }
      })
    },
    async deleteDirectCost () {
      if (!confirm('정말 삭제하시겠습니까?')) return
      await this.$http.get('/m/deleteDirectCost.do', {
        params: {
          WORK_NO: this.work_NO,
          MAT_SEQ: this.mat_SEQ
        }
      })
      alert('삭제되었습니다.')
      this.$router.push({
        name: 'DirectCost',
        params: {
          work_NO: this.work_NO,
          work_PRGS_STAT_CD: this.work_PRGS_STAT_CD
        }
      })
    },
    changeType (type) {
      this.$http.get('/m/getMatInfo.do', {
        params: { WRK_TYPE_CD: type }
      }).then(resp => {
        this.matInfos = resp.data.response
        this.matInfo.unit_DESC = null
        this.mcstTotal = 0
        this.pexpTotal = 0
        this.timeCost = 0
        this.total = 0
        this.spaceCost = 0
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
      this.changeDemolType()
      this.changeTimeType()
      this.changeSpaceType()
    },
    changeQty () {
      this.pexpTotal = Math.round(this.matInfo.pexp_PRCE * this.matQty * 10) / 10
      if (this.subContract) this.mcstTotal = 0
      else this.mcstTotal = Math.round(this.matInfo.mcst_PRCE * this.matQty * 10) / 10
      this.total = Math.round((this.pexpTotal + this.mcstTotal) * 10) / 10
    },
    changeDemolType () {
      if (this.matQty === null) return
      if (this.subContract === null) this.matInfo.mcst_PRCE = Math.round(this.mcstInit * this.demolType.code_CTRL01 * 10) / 10
      else this.matInfo.mcst_PRCE = 0
      this.matInfo.pexp_PRCE = Math.round(this.pexpInit * this.demolType.code_CTRL01 * 10) / 10
      this.pexpTotal = Math.round(this.matInfo.pexp_PRCE * this.matQty * 10) / 10
      if (this.subContract) this.mcstTotal = 0
      else this.mcstTotal = Math.round(this.matInfo.mcst_PRCE * this.matQty * 10) / 10
      this.total = Math.round((this.pexpTotal + this.mcstTotal) * 10) / 10
    },
    changeTimeType () {
      if (this.timeType === '00') this.timeCost = 0
      else this.timeCost = Math.round(this.pexpTotal * this.timeType.code_CTRL01)
    },
    changeSpaceType () {
      if (this.spaceType === '00') this.spaceCost = 0
      else this.spaceCost = Math.round(this.pexpTotal * this.spaceType.code_CTRL01)
    },
    changeSubContract () {
      this.changeQty()
    }
  }
}
</script>

<style>

</style>
