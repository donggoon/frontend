<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <h3 v-for="list in lists" :key="list.WORK_NO">{{ list.WORK_NO }} : {{ list.WORK_NM }}</h3>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      lists: []
    }
  },
  created () {
    this.$http.get('/api/corp/m/M_WORK_WORK_INFO_LIST_07.do').then(resp => {
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
