<template>
    <div class="container-fluid">
        <Banners />
        
        <CourseList v-for="item in categoryList"
            :key="item.id"
            :item="item"
        >
        </CourseList>
        <div 
            class="row mt-5 py-5"
            style="padding-left: 80px;"
        >
            <News
                v-for="item in newList"
                :key="item.id" 
                :item="item" 
            />
            <router-link class="seemore-text text-center" 
                :to="{ name: 'newslist' }">
                More news here
                <font-awesome-icon :icon="arrowRight" size="xs" font-weight="500" />
            </router-link>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex'
import CourseList from '@/components/CourseList.vue'
import Banners from '@/components/Banners.vue'
import News from '@/components/News.vue'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default {
  components: {
      CourseList,
      Banners,
      News,
      FontAwesomeIcon
  },
  data() {
    return {
        newList: [],
        arrowRight: faArrowRight,
    }
  },
  mounted() {
      this.getCategorylist();
      axios
          .get('http://localhost/course_laravel/public/api/news/4')
          .then(response => { this.newList = response.data });
  },
  methods: {
      ...mapActions(['getCategorylist'])
  },
  computed: {
      ...mapGetters(['categoryList'])
  }
}
</script>

<style scoped>
.seemore-text {
    font-size: 22px;
    color: black;
    text-decoration: none;
}
.seemore-text:hover {
    text-decoration: underline;
    color:black;
}
</style>
  