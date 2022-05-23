<template>
  <div>
    <header>
      <div>
        <img src="../../src/assets/logo.png" alt="holidate-logo" />
        <h1 class="title">Holidate</h1>
      </div>
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
    </header>
  </div>
</template>

<script>
export default {
  name: 'HolidateHeader',
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
header {
  color: var(--dark-color);
  position: fixed;
  width: 100%;
  z-index: 6;
  background-color: var(--light-color);
  margin: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -0.2rem 0.9rem var(--dark-color);
}
header > div {
  padding: 1rem 2rem 1rem 2rem;
  display: flex;
  align-items: center;
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
  gap: 1rem;
}
.inputDiv .refresh :hover {
  cursor: pointer;
}
.inputDiv .refresh {
  width: 1.5rem;
  height: 1.5rem;
}
.inputDiv .refresh img{
  max-width: 100%;
}

@media screen and (max-width: 1200px) {
  header {
    flex-direction: column;
    align-items: start;
  }
  .holidays-options {
    gap: 1rem;
    justify-content: flex-start;
  }
  .holidays-options input, .holidays-options select {
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  .inputDiv .refresh {
  width: 1rem;
  height: 1rem;
  }
}
</style>
