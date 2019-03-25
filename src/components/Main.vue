<template>
  <div class="hello">
    <router-view></router-view>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h3 v-for="list in lists" :key="list.work_NO">{{ list.work_NO }} : {{ list.work_NM }}</h3>
  </div>
</template>

<script>
import Header from './Header'

export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lists: []
    }
  },
  template: {
    Header
  },
  created () {
    this.$http.get('/m/M_WORK_WORK_INFO_LIST_07.do').then(resp => {
      this.lists = resp.data.response
      console.log(resp)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
