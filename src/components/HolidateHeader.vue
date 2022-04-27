<template>
  <div>
    <header>
      <img src="../../src/assets/logo.png" alt="holidate-logo" />
      <h1 class="title">Holidate</h1>
    </header>
</div>
</template>

<script>

export default {
  name: 'HolidateHeader'
}
</script>

<style>
header {
  color: white;
  /*position: fixed;*/
  width: 100%;
  background-color: #272F6D;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 1rem 2rem 1rem 2rem;
  box-shadow: 0 0.1rem 0.6rem #272F6D;
}
header img {
  width: 50px;
  height: auto;
}
.title {
  font-family: 'Harlow Solid Italic', sans-serif;
  font-size: xx-large;
  font-weight: normal;
  margin: 0 1.5rem 0 1.5rem;
}
</style>
