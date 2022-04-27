<template>
  <div class="app">
    <HolidateHeader/>
    <div id="holidays-gallery">
      <GalleryOptions :searchName.sync="searchName" :searchMonth.sync="searchMonth" :holidaySortType.sync="holidaySortType"/>
      <div class="holidays-info">
        <HolidayCard
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
import HolidateHeader from './components/HolidateHeader.vue'
import HolidayCard from './components/HolidayCard.vue'
import GalleryOptions from './components/GalleryOptions.vue'
import { getHolidayData } from '@/services/api/holidayAPI.js'


export default {
  name: 'holidays-gallery',
  components: {
    HolidateHeader,
    HolidayCard,
    GalleryOptions
  },
  computed: {
    holidaysOrganizedData : function() {

      // filter
      const filterFunc = (a) => {
        if (this.searchMonth == "")
          return a.name.toLowerCase().includes(this.searchName.toLowerCase())
        else
          return a.date_month == this.searchMonth && a.name.toLowerCase().includes(this.searchName.toLowerCase())
      }
      let data = this.holidaysData.filter(filterFunc)

      // sort name
      if (["AZName", "ZAName"].includes(this.holidaySortType)) {
        const field = 'name'
        const comparator = (a, b) => a[field].localeCompare(b[field]) 
        data = data.sort(comparator)

        if (this.holidaySortType.includes('ZAName')) {
          data = data.reverse()
        }
      }

      // sort date
      if (["invertDate"].includes(this.holidaySortType)) {
        const field = 'date'
        const comparator = (b, a) => a[field].localeCompare(b[field]) 
        data = data.sort(comparator)
      }

      return data;
    }
  },
  data() {
    return {
      holidaysData: [],
      searchName: localStorage.getItem("searchName") || "",
      searchMonth: localStorage.getItem("searchMonth") || "",
      holidaySortType: localStorage.getItem("holidaySortType") || ""
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
@import url('http://fonts.cdnfonts.com/css/harlow-solid-italic');
body {
  margin: 0;
  background-image: url("../src/assets/pointPattern.png");
  background-repeat: no-repeat;
  background-position: 80% 40vh;
  background-size: 20vh;
  overflow: hidden;
  --green-blue-color: #57C8CC;
  --purple-color: #8d8eeb;
  --dark-color: #272F6D;
}
header {
  color: white;
  /*position: fixed;*/
  width: 100%;
  background-color: var(--dark-color);
  margin: 0;
  display: flex;
  align-items: center;
  padding: 1rem 2rem 1rem 2rem;
  box-shadow: 0 0.1rem 0.6rem var(--dark-color);
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

.holidays-info {
  width: 40%;
  height: 80vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.holidays-info > :nth-child(2n) {
  background-color: var(--green-blue-color);
  background: linear-gradient(0.25turn, var(--green-blue-color), var(--purple-color));
}

.holidays-info::-webkit-scrollbar {
    width: 10px;
}
 
.holidays-info::-webkit-scrollbar-track {
    background-color: #CECFFB;
    border-radius: 100px;
}
 
.holidays-info::-webkit-scrollbar-thumb {
    background-color: var(--purple-color);
    border-radius: 100px;
}
</style>
