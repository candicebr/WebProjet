<template>
  <div class="holiday">
    <div class="info">
      <h1>Christmas Day</h1>
      <div class="separation"></div>
      <div class="more-info">
        <div class="text-info">
          <h4>Type : </h4>
          <h5>Religious</h5>
        </div>
        <div class="text-info">
          <h4>Country : </h4>
          <h5>US</h5>
        </div>
      </div>
    </div>
    <div class="date">
      <h1>25</h1>
      <h5>Monday</h5>
    </div>
  </div>
</template>

<script>
import { getHolidayData } from '@/services/api/holidayAPI.js'
getHolidayData();

export default {
  name: 'Holiday',
  props: {
    msg: String
  },
  data() {
    return {
      holidaysData: []
    }
  },
  methods: {
    async retrieveHolidaysData() {
      this.holidaysData = await getHolidayData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.holiday {
  background: #8d8eeb;
  padding: 1.5rem; 
  color : white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  border-radius: 15px;
  margin: 1rem;
}
.separation {
  background-color: rgba(255, 255, 255, 0.6);
  height: 0.1rem;
  width: 80%;
  margin: 1rem 0 1rem 0;
}
.text-info {
  display: flex;
  align-items: baseline;
  font-size: 15px;
}
h1 {
  margin: 0;
}
h4 {
  margin: 0.4rem 0.4rem 0.4rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.6);
}
h5 {
  margin: 0;
  font-weight: lighter;
  font-size: 1em;
}
.date h1 {
  font-size: 6rem;
}
</style>
