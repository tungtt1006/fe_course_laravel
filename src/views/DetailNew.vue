<template>
    <div class="container-fluid pt-4">
        <h1>{{ aNew.name }}</h1>
        <div style="width: 90%;word-wrap:break-word;">
            {{ aNew.description }}
        </div>
        <div v-html="aNew.content" class="mt-4 pt-4">
        </div>
    </div>
</template>
      
<script>
import axios from 'axios'

export default {
    data() {
        return {
            aNew: {}
        }
    },
    mounted() {
        axios
            .get('http://localhost/course_laravel/public/api/new/' + this.$route.params.id)
            .then(response => { 
                this.aNew     = response.data; 
            });
    }
}
</script>
      
<style scoped>
.table__custom {
    /* border-collapse: collapse !important; */
    border: 1px solid blue !important;
}
.table__custom th, .table__custom td {
    border: 1px black;
}
</style>
      