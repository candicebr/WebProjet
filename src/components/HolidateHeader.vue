<template>
  <div>
    <header>
      <div>
        <img src="../../src/assets/logo.png" alt="holidate-logo" />
        <h1 class="title">Holidate</h1>
      </div>
      <GalleryOptions @update:searchName="onSearchNameChanged" @update:searchMonth="onSearchMonthChanged" @update:holidaySortType="onHolidaySortTypeChanged"/>
    </header>
</div>
</template>

<script>

import GalleryOptions from './GalleryOptions.vue'

export default {
  name: 'HolidateHeader',
  components: {
    GalleryOptions
  },
  methods: {
    onSearchNameChanged(event) {
      this.$emit('update:searchName', event)
    },
    onSearchMonthChanged(event) {
      this.$emit('update:searchMonth', event)
    },  
    onHolidaySortTypeChanged(event) {
      this.$emit('update:holidaySortType', event)
    }
  }
}
</script>

<style>
header {
  color: var(--dark-color);
  /*position: fixed;*/
  max-width: 100vw;
  background-color: var(--light-color);
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem 1rem 2rem;
  box-shadow: 0 -0.2rem 0.9rem var(--dark-color);
}
header div {
  display: flex;
  align-items: center;
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
