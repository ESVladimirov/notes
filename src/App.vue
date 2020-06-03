<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
    
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar,
    
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  max-width: 1024px;
  margin: auto;
}
</style>
