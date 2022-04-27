<template>
    <div class="holidays-options">
        <div class="inputDiv">
            <input type="text" :value="searchName" v-on:input="onSearchNameChanged" placeholder="Name">
            <div class="refresh" v-if="searchName" v-on:click="cleanSearch"><img src="../../src/assets/refresh.png" alt="refresh" /></div>
        </div>
        <select :value="searchMonth" v-on:input="onSearchMonthChanged">
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
            <select :value="holidaySortType" v-on:input="onHolidaySortTypeChanged">
            <option value="">By chronological days</option>
            <option value="invertDate">By unchronological days</option>
            <option value="AZName">By alphabetic name</option>
            <option value="ZAName">By unalphabetic name</option>
        </select>
    </div>
</template>

<script>

export default {
  name: 'GalleryOptions',
  props: {
    searchName: String,
    searchMonth: String,
    holidaySortType: String
  },
  watch: {
    searchName: function(newName) {
    localStorage.setItem("searchName", newName)
    },
    searchMonth: function(newMonth) {
    localStorage.setItem("searchMonth", newMonth)
    },
    holidaySortType: function(newHolidaySortType) {
    localStorage.setItem("holidaySortType", newHolidaySortType)
    }
  },
  methods: {
    onSearchNameChanged(event) {
      this.$emit('update:searchName', event.target.value)
    },
    onSearchMonthChanged(event) {
      this.$emit('update:searchMonth', event.target.value)
    },
    onHolidaySortTypeChanged(event) {
      this.$emit('update:holidaySortType', event.target.value)
    },
    cleanSearch: function() {
      this.$emit('update:searchName', "")
    }
  }
}
</script>

<style>
.holidays-options {
  background-color: var(--dark-color);
  padding: 2rem;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0.1rem 0.1rem 0.6rem var(--dark-color);
}
.holidays-options input, .holidays-options select {
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
  border-color: var(--purple-color);
  border-style: solid;
  border-width: 2px;
  color: var(--purple-color);
  font-size: 1rem;
}
.holidays-options input::placeholder {
  color: var(--purple-color);
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
</style>
