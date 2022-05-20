<template>
  <div id="app" class="container-fluid p-0">
        <TheHeader />
        <div class="container mt-3 shadow bg-white px-4 rounded-3">
            <router-view/>
        </div>
        <TheFooter />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default {
    name: 'App',
    components: {
        TheHeader,
        TheFooter
    }
}
</script>
