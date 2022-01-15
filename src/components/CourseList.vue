<template>
<div class="row mt-2">
    <CourseItem 
        v-for="item in courseArray"
        :key="item.id"
        :item="item"
        :size="2" 
    />
</div>
</template>
  
<script>
import CourseItem from '@/components/CourseItem.vue'

export default {
    props: {
        courseArray: { type: Array, default: () => [] }
    },
    components: {
        CourseItem,
    },
    data() {
        return {
            
      }
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
  