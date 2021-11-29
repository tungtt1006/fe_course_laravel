<template>
<div class="col-md-11">
    <router-link 
        class="card mb-3 p-0" 
        style="color:black;text-decoration: none;"
        :to="{ 
            name: 'detailnew', 
            params: { id: item.id } 
        }"
    >
        <div class="row g-0">
            <div class="col-md-4">
                <img 
                    :src="require(`@/assets/images/${item.photo}`)" 
                    class="img-fluid rounded-start" 
                    alt="..."
                >
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text custom__description">{{ item.description }}</p>
                <p class="card-text"><small class="text-muted">{{ moment(item.created_at) }}</small></p>
                </div>
            </div>
        </div>
    </router-link>
</div>
</template>

<script>
import moment from 'moment';

export default {
    props: {
        item: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            
        }
    }, 
    methods: {
        moment(time) {
            return moment(time).fromNow();
        }
    }
}
</script>

<style scoped>
.custom__description {
    display: -webkit-box;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>