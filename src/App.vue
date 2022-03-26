<template>
  <div id="app" class="container-fluid p-0">
      <TheHeader/>
      <div class="container mt-3 shadow bg-white px-4">
          <router-view/>
      </div>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: {
      TheHeader
  }
}
</script>
