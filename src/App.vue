<template>
  <div class="container-fluid" id="app">
      <Header></Header>
      <div class="container mt-3 main">
          <router-view/>
      </div>
  </div>
</template>

<script>
import Header from './views/Header.vue'

export default {
  name: 'App',
  components: {
      Header
  }
}
</script>

<style>
body, #app {
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}
.main {
  background-color: white;   
}
</style>
