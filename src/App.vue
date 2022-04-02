<template>
  <div class="app">
    <header>
      <img src="../src/assets/logo.png" alt="holidate-logo" />
      <h1 class="title">Holidate</h1>
    </header>
    <div id="holidays-gallery">
      <div class="holidays-options">
        <div class="inputDiv">
          <input v-on:input="updateWithSearch" type="text" v-model="search" placeholder="Name">
          <div class="refresh" v-if="search" v-on:click="cleanSearch"><img src="../src/assets/refresh.png" alt="refresh" /></div>
        </div>
        <select v-model="month">
          <option value="">Month</option>
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
@import url('http://fonts.cdnfonts.com/css/harlow-solid-italic');
body {
  margin: 0;
  background-image: url("../src/assets/pointPattern.png");
  background-repeat: no-repeat;
  background-position: 80% 40vh;
  background-size: 20vh;
}
header {
  color: white;
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

#holidays-gallery {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3rem;
}

.holidays-options {
  background-color: #CECFFB;
  padding: 2rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0.1rem 0.1rem 0.6rem #8d8eeb;
}
.holidays-options input, .holidays-options select {
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
  border-color: #8d8eeb;
  border-style: solid;
  border-width: 2px;
  color: #8d8eeb;
  font-size: 1rem;
}
.holidays-options input::placeholder {
  color: #8d8eeb;
}
.inputDiv {
  display: flex;
  align-items: center;
}
.inputDiv .refresh :hover {
  cursor: pointer;
}
.inputDiv .refresh img{
  max-width: 25px;
}

.holidays-info {
  max-width: 40%;
  max-height: 80vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}
</style>
