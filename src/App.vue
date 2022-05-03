<template>
  <div class="app">
    <HolidateHeader :searchName.sync="searchName" :searchMonth.sync="searchMonth" :holidaySortType.sync="holidaySortType"/>

    <div id="holidays-gallery">
      <div class="holidays-container">
        <div class="calendar">
          <vc-calendar
          class="custom-calendar"
          :from-page="{ month: searchMonth, year: 2020 }"
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
                  class=""
                  :class="attr.customData.class"
                >{{ attr.customData.title }}</p>
              </div>
            </div>
          </vc-calendar>
        </div>
        <div class="holidays-info">
          <HolidayCard
          v-for="holiday in holidaysOrganizedData"
          :id=holiday.name
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
</div>
</template>

<script>
import HolidateHeader from './components/HolidateHeader.vue'
import HolidayCard from './components/HolidayCard.vue'
import { getHolidayData } from '@/services/api/holidayAPI.js'

export default {
  name: 'holidays-gallery',
  components: {
    HolidateHeader,
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
      let i = 0
      this.holidaysOrganizedData.forEach(holiday => {
        let attribute = {key: i, customData: {title: holiday.name}, dates: new Date(holiday.date_year, (holiday.date_month-1).toString(), holiday.date_day)}
        attributes.push(attribute)
        i++
      });

      return attributes
    }
  },
  data() {
    return {
      holidaysData: [],
      searchName: localStorage.getItem("searchName") || "",
      searchMonth: localStorage.getItem("searchMonth") || "",
      holidaySortType: localStorage.getItem("holidaySortType") || "",
      masks: {
        weekdays: "WWW"
      },
      dayEvents: {
        click: a => {
          var element = document.getElementById(a.target.innerHTML);
          
          element.scrollIntoView({block: "center"})
        }
      }
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');

body {
  margin: 0;
  /*background-image: url("../src/assets/pointPattern.png");
  background-repeat: no-repeat;
  background-position: 80% 40vh;
  background-size: 20vh;*/
  /*overflow: hidden;*/
  --green-blue-color: #57C8CC;
  --purple-color: #8d8eeb;
  --dark-color: #272F6D;
  --light-color: #eff8ff;
  font-family: 'Poppins', sans-serif;
  color: var(--dark-color);
}

#holidays-gallery {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 4.5rem 0 4.5rem;
}

.holidays-container {
  display: flex;
  justify-content: space-between;
  align-items: top;
  min-width: 100%;
}

.holidays-info {
  width: 40%;
  height: 80vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.holidays-info > :nth-child(2n) {
  background-color: var(--green-blue-color);
  /*background: linear-gradient(0.25turn, var(--green-blue-color), var(--purple-color));*/
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
  overflow: hidden;
  height: 100%;
}
.day-label {
  color: var(--dark-color);
  font-size: 1rem;
}
.attribute {
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: auto;
  scroll-snap-type: y mandatory;
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

.attribute > :nth-child(2n) {
  background-color: var(--dark-color);
}
.attribute > :nth-child(3n) {
  background-color: var(--green-blue-color);
  color: var(--dark-color);
}
.attribute > :nth-child(4n) {
  background-color: var(--purple-color);
}

.custom-calendar.vc-container {
  font-family: 'Poppins', sans-serif;
  color: var(--dark-color);
  --day-border: 1px solid #272f6d30;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #eff8ff90;
  --weekday-border: 1px solid #272f6d10;
  border: none;
}
.custom-calendar.vc-container .vc-weeks {
  padding: 0;
  height: 60vh;
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
  background-color: #eff8ff;
}

.custom-calendar.vc-container .vc-day {
  padding: 0 5px 3px;
  text-align: left;
  height: var(--day-height);
  width: var(--day-width);
  background-color: #fff;
}
.vc-day {
  position: relative;
  min-height: var(--day-min-height);
  width: 100%;
  height: 100%;
  z-index: 1;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
</style>
