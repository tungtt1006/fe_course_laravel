<template>
    <div class="container-fluid">
        <Banners />
        
        <CourseList v-for="item in categoryList"
            :key="item.id"
            :item="item"
        >
        </CourseList>

        <News />
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex'
import CourseList from '@/components/CourseList.vue'
import Banners from '@/components/Banners.vue'
import News from '@/components/News.vue'

export default {
  components: {
      CourseList,
      Banners,
      News
  },
  data() {
    return {
         
    }
  },
  mounted() {
      this.getCategorylist();
  },
  methods: {
      ...mapActions(['getCategorylist'])
  },
  computed: {
      ...mapGetters(['categoryList'])
  }
}
</script>

<style>

</style>
  