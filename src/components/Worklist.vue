<template>
  <div>
    <div class="work-list" v-for="list in lists" :key="list.work_NO">
      <div class="work-list-title">{{ list.work_NM }}</div>
      <span class="work-list-left-align">작업자 : {{ list.pchr_EMPN_NM }} / {{ list.wrk_REQ_RESN_NM }}</span>
      <span class="work-list-right-align">{{ list.work_PRGS_STAT_NM }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Worklist',
  data () {
    return {
      lists: []
    }
  }
}
</script>

<style scoped>
.work-list {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 60px;
  opacity: 0.88;
  background: #FFFFFF;
  border-bottom: 1px solid #000000;
}

.work-list-title {
  font-size: 14px;
  width: 100%;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-left: 5px;
  float: left;
  white-space: nowrap;
}

.work-list-left-align {
  font-size: 14px;
  margin-left: 5px;
  float: left;
}

.work-list-right-align {
  font-size: 14px;
  margin-right: 5px;
  float: right;
}
</style>
