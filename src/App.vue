<template>
  <div id="holidays-gallery">
    <div class="holidays-options">
      <input v-on:input="updateWithSearch" type="text" v-model="search" placeholder="Search a country">
      <button v-if="search" v-on:click="cleanSearch">x</button>
      <select v-model="month">
        <option value="">--Select Month--</option>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
    <div class="holidays-info">
      <h1>December</h1>
      <Holiday 
      v-for="holiday in holidaysOrganizedData"
      :key="holiday.id"
      :name="holiday.name"
      :type="holiday.type"
      :country="holiday.country"
      :date_month="holiday.date_month"
      :date_day="holiday.date_day"
      :week_day="holiday.week_day"/>
    </div>
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
  computed: {
    holidaysOrganizedData : function() {
      const filterFunc = (a) => {
        if (this.month == "")
          return a.name.toLowerCase().includes(this.search.toLowerCase())
        else
          return a.date_month == this.month && a.name.toLowerCase().includes(this.search.toLowerCase())
      }
      let data = this.holidaysData.filter(filterFunc)
      return data;
    }
  },
  data() {
    return {
      holidaysData: [],
      search: "",
      month: ""
      //holidaySortType: "AZWeekDay"
    }
  },
  created: function() {
    this.retrieveHolidaysData()
  },
  methods: {
    async retrieveHolidaysData() {
      this.holidaysData = await getHolidayData()
    },
    updateWithSearch: function() {
      console.log("search")
    },
    cleanSearch: function() {
      this.search = ""
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
