<template>
  <div>
    <footer>
      <div>
        <p>Web Project by<b> Candice Branchereau </b>- IMAC 2</p> <p>Mai 2022</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'HolidateFooter'
}
</script>

<style>
footer {
  color: var(--dark-color);
  width: 100%;
  z-index: 6;
  background-color: var(--light-color);
  margin: 0;
  bottom: 0;
  font-size: 0.75rem;
  /*box-shadow: 0 0.2rem 0.9rem var(--dark-color);*/
}

footer > div {
    margin: 0 2rem 0 2rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2px;
}

</style>
