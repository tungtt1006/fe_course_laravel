<template>
  <div>
    <!-- List khóa học  -->
    <div class="container-fluid">
        <CourseList v-for="item in categoryList"
            :key="item.id"
            :item="item"
        >
        </CourseList>
    </div>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex'
import CourseList from '@/components/CourseList.vue'

export default {
  components: {
      CourseList
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
  