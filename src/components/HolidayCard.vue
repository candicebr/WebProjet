<template>
  <div class="holiday" v-on:click="changeColor">
    <div class="info">
      <div class="header">
        <div class="today" v-if="isToday"><h2>Today !</h2></div>
        <h2>{{name}}</h2>
      </div>
      <div class="separation"></div>
      <div class="more-info">
        <div class="text-info">
          <h4>Type : </h4>
          <h5>{{type}}</h5>
        </div>
        <div class="text-info">
          <h4>Country : </h4>
          <h5>{{country}}</h5>
        </div>
        <div class="text-info">
          <h4>Month : </h4>
          <h5>{{date_month}}</h5>
        </div>
      </div>
    </div>
    <div class="date">
      <div class="like" :style="dynamicStyle"></div>
      <h2>{{date_day}}</h2>
      <h5>{{week_day}}</h5>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HolidayCard',
  props: {
    name: String,
    type: String,
    country: String,
    date_month: String,
    date_day: String,
    week_day: String,
    like_color: String
  },
  computed: {
    isToday() {
      var today = new Date();
      if(today.getMonth()+1 == parseInt(this.date_month) && today.getDate() == parseInt(this.date_day))
        return true;
      else
        return false;
    },
    dynamicStyle: function() {
      return {
            'background-color' : this.like_color,
            'transition': 'all 1s ease-out',
        };
    }
  },
  methods: {
    changeColor() {
      if(this.like_color == "#ffffff")
        this.like_color = "#272F6D";
      else
        this.like_color = "#ffffff";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.holiday {
  scroll-snap-align: center;
  background: var(--purple-color);
  padding: 1.5rem; 
  color : white;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-radius: 15px;
  margin: 1.2rem;
  box-shadow: 0 0.1rem 0.3rem var(--dark-color);
}
.info {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.header {
  display: flex;
  gap: 1rem;
}
.today h2 {
  color: var(--dark-color);
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
h2 {
  margin: 0;
  font-family: 'Expletus Sans', cursive;
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
  text-align: center;
}
.date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
.date h2 {
  font-size: 6rem;
}
.date h5 {
  margin-bottom: 0.4rem;
}
.like {
  margin-top: 0.75rem;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: white;
  border: solid;
}
</style>
