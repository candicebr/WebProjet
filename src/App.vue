<template>
  <div id="holidays-gallery">
    <h1>December</h1>
    <Holiday 
    v-for="holiday in holidaysData"
    :key="holiday.id"
    :name="holiday.name"
    :type="holiday.type"
    :country="holiday.country"
    :date_day="holiday.date_day"
    :week_day="holiday.week_day"/>
  </div>
</template>

<script>
import Holiday from './components/Holiday.vue'
import { getHolidayData } from '@/services/api/holidayAPI.js'


export default {
  name: 'holidays-gallery',
  components: {
    Holiday
  },
  data() {
    return {
      holidaysData: []
    }
  },
  created: function() {
    this.retrieveHolidaysData()
  },
  methods: {
    async retrieveHolidaysData() {
      this.holidaysData = await getHolidayData()
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@400;500;600;700&display=swap');
#holidays-gallery {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-height: 70vh;
  overflow-y: scroll;
}
</style>
