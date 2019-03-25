<template>
  <div id="app">
    <Header/>
    <Worklist/>
  </div>
</template>

<script>
import Header from './Header'
import Worklist from './Worklist'

export default {
  name: 'Main',
  templates: {
    Header,
    Worklist
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
