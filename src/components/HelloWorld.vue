<template>
  <div class="hello">
    <p>HelloWorld</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background: #42b983;
  padding: 4px; 
}
p {
  color: white;
}
</style>
