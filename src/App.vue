<template>
  <div id="app">
    <Holiday msg="Welcome to Your Vue.js App"/>
    <Holiday/>
    <Holiday/>
    <Holiday/>
    <Holiday/>
    <Holiday/>
  </div>
</template>

<script>
import Holiday from './components/Holiday.vue'

export default {
  name: 'App',
  components: {
    Holiday
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-height: 70vh;
  overflow-y: scroll;
}
</style>
