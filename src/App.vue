<template>
  <div class="app">
    <HolidateHeader :searchName.sync="searchName" :searchMonth.sync="searchMonth" @update:searchMonth="moveToMonth" :holidaySortType.sync="holidaySortType"/>
    <div class="holidays-container">
      <div class="calendar">
        <vc-calendar
        ref="calendar"
        class="custom-calendar"
        locale= 'en'
        :from-page="{ month: parseInt(searchMonth), year: 2020 }"
        :min-date="new Date(2020, 0, 1)"
        :max-date="new Date(2020, 11, 31)"
        :attributes="attributes"
        disable-page-swipe
        >
          <div
            slot="day-content"
            v-on="dayEvents"
            slot-scope="{ day, attributes }"
            class="day-content"
            :class="day.year"
          >
            <span
              class="day-label"
            >{{ day.day }}</span>
            <div class="attribute">
              <p
                v-for="attr in attributes"
                :key="attr.key"
                :class="attr.key"
              >{{ attr.customData.title }}</p>
            </div>
          </div>
        </vc-calendar>
      </div>
      <div class="holidays-info">
        <HolidayCard
        v-for="holiday in holidaysOrganizedData"
        :id=holiday.date+holiday.name
        :key="holiday.id"
        :name="holiday.name"
        :type="holiday.type"
        :country="holiday.country"
        :date_month="holiday.date_month"
        :date_day="holiday.date_day"
        :week_day="holiday.week_day"/>
      </div>
    </div>
    <HolidateFooter/>
</div>
</template>

<script>
import HolidateHeader from './components/HolidateHeader.vue'
import HolidateFooter from './components/HolidateFooter.vue'
import HolidayCard from './components/HolidayCard.vue'
import { getHolidayData } from '@/services/api/holidayAPI.js'

export default {
  name: 'holidays-gallery',
  components: {
    HolidateHeader,
    HolidateFooter,
    HolidayCard,
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
    },
    attributes: function() {
      let attributes = []
      this.holidaysOrganizedData.forEach(holiday => {
        let attribute = {key: holiday.date+holiday.name, customData: {title: holiday.name}, dates: new Date(holiday.date_year, (holiday.date_month-1).toString(), holiday.date_day)}
        attributes.push(attribute)
      });

      return attributes
    },
    monthNumber: function() {
      let monthNumber = this.searchMonth;
      return  parseInt(monthNumber);
    }
  },
  data() {
    return {
      holidaysData: [],
      searchName: localStorage.getItem("searchName") || "",
      searchMonth: localStorage.getItem("searchMonth") || "",
      holidaySortType: localStorage.getItem("holidaySortType") || "",
      color: "#272F6D",
      dayEvents: {
        click: a => {
          console.log(a.target.className)
          var element = document.getElementById(a.target.className);
          console.log(document.getElementById(a.target.className))
          element.scrollIntoView({behavior: "smooth", block: "center"})
        }
      }
    }
  },
  created: function() {
    this.moveToMonth()
    this.retrieveHolidaysData()
  },
  methods: {
    async retrieveHolidaysData() {
      this.holidaysData = await getHolidayData()
    },
    async moveToMonth() {
      // Get the calendar ref
      const calendar = this.$refs.calendar
      console.log(calendar)

      // Moves to chosen month, 2020
      await calendar.move({ month: parseInt(this.searchMonth), year: 2020 })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Expletus+Sans:wght@400;500;600;700&display=swap');
@import url('http://fonts.cdnfonts.com/css/harlow-solid-italic');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

body, .app {
  margin: 0;
    --green-blue-color: #57C8CC;
  --purple-color: #8d8eeb;
  --dark-color: #272F6D;
  --light-color: #eff8ff;
  font-family: 'Poppins', sans-serif;
  color: var(--dark-color);
}

.holidays-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 8rem 4rem 2rem 4rem;
}

.holidays-info {
  margin-top: 0;
  width: 40%;
  height: 76vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.holidays-info > :nth-child(2n) {
  background-color: var(--green-blue-color);
}

.holidays-info::-webkit-scrollbar {
    width: 10px;
}
 
.holidays-info::-webkit-scrollbar-track {
    background-color: var(--light-color);
    display: block;
    border-radius: 100px;
}
 
.holidays-info::-webkit-scrollbar-thumb {
    background-color: var(--dark-color);
    border-radius: 100px;
}


/********* calendar *********/

.day-content {
  display: flex;
  flex-direction: column;
  /*overflow: hidden;*/
  height: 100%;
}
.day-label {
  color: var(--dark-color);
  font-size: 1rem;
}
.attribute {
  overflow-y: scroll;
  padding: 0;
}
.attribute p {
  margin-top: 0;
  margin-bottom: 0.25rem;
  padding: 0.3rem;
  font-size: 0.7rem;
  line-height: 1.25;
  border-radius: 0.125rem;
  background-color: var(--purple-color);
  color: white;
  font-weight: 300;
}
.attribute p:hover {
  cursor: pointer;
}

.attribute > :nth-child(2n) {
  background-color: var(--dark-color);
}
.attribute > :nth-child(3n) {
  background-color: var(--green-blue-color);
}
.attribute > :nth-child(4n) {
  background-color: var(--purple-color);
}

.custom-calendar.wrapper {
  background-color: none;
}

.custom-calendar.vc-container {
  font-family: 'Poppins', sans-serif;
  color: var(--dark-color);
  --day-border: 1px solid #272f6d30;
  --day-border-highlight: 1px solid #b8c2cc;
  --weekday-bg: var(--light-color);
  --weekday-border: 1px solid #272f6d10;
  border: none;
}
.custom-calendar.vc-container .vc-weeks {
  padding: 0;
  grid-template-rows: 30px repeat(6, 1fr);
}
.custom-calendar.vc-container .vc-header {
  background-color: var(--light-color);
  padding: 10px 0;
  color: var(--dark-color);
}
.custom-calendar.vc-container .vc-weekday {
  background-color: var(--weekday-bg);
  border-bottom: var(--weekday-border);
  border-top: var(--weekday-border);
  padding: 5px 0;
  color: #272f6d70;
}
.vc-border {
  border-width: 1px;
}
.custom-calendar.vc-container .vc-day:not(.on-right) {
  border-right: var(--day-border);
}
.custom-calendar.vc-container .vc-day:not(.on-bottom) {
  border-bottom: var(--day-border);
}
.custom-calendar.vc-container .vc-day.weekday-1,
.custom-calendar.vc-container .vc-day.weekday-7 {
  background-color: var(--light-color);
}

.custom-calendar.vc-container .vc-day {
  text-align: left;
  height: 6vw;
  width: 6vw;
  background-color: #fff;
}
.vc-day {
  position: relative;
  min-height: var(--day-min-height);
  z-index: 1;
  padding: 3px;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}

@media screen and (max-width: 1200px) {
  .holidays-container {
    flex-direction: column;
    align-items: center;
    margin: 1rem;
    margin-top: 14rem;
  }
  .holidays-info {
    margin-top: 2rem;
    margin-bottom: 1rem;
    width: 100vw;
    max-width: 650px;
  }
  .custom-calendar.vc-container .vc-day {
    width: 13vw;
    height: 13vw;
  }
}

@media screen and (max-width: 480px) {
  .calendar {
    display: none;
  }
  .holidays-info {
    height: 100%;
    overflow-y: visible;
  }
}

</style>
