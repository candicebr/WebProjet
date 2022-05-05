<template>
    <div class="holidays-options">
        <div class="inputDiv">
            <input type="text" v-model="searchName" v-on:input="onSearchNameChanged" placeholder="Name">
            <div class="refresh" v-if="searchName" v-on:click="cleanSearch"><img src="../../src/assets/refresh.png" alt="refresh" /></div>
        </div>
        <select v-model="searchMonth" v-on:input="onSearchMonthChanged">
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
            <select v-model="holidaySortType" v-on:input="onHolidaySortTypeChanged">
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
  data() {
    return {
      searchName: localStorage.getItem("searchName") || "",
      searchMonth: localStorage.getItem("searchMonth") || "",
      holidaySortType: localStorage.getItem("holidaySortType") || "",
    }
  },
  watch: {
    searchName: function(newName) {
    localStorage.setItem("searchName", newName)
    },
    searchMonth: function(newMonth) {
      console.log('ok')
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}
.holidays-options input, .holidays-options select {
  padding: 0.75rem 1rem 0.75rem 1rem;
  border-radius: 10px;
  border-color: var(--green-blue-color);
  border-style: solid;
  border-width: 2px;
  color: var(--dark-color);
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
}
.holidays-options input::placeholder {
  color: var(--green-blue-color);
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

@media screen and (max-width: 1200px) {
  .holidays-options {
    gap: 1rem;
    justify-content: flex-start;
  }
  .holidays-options input, .holidays-options select {
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
