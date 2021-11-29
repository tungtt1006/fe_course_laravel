<template>
    <div class="col-md-3 mt-2"> 
        <div class="card card__course">
            <img 
                :src="require(`@/assets/images/${item.photo}`)" 
                class="card-img-top" 
                alt="Picture detail die"
                style="border-bottom: 1px solid lightgray;"
            >
            <div class="card-body">
                <h4 class="card-title" style="font-size:20px;">{{ item.name }}</h4>
                <p class="mt-5 mb-0 card-text price-text">
                    {{ new Intl.NumberFormat().format(item.price * (100-item.discount) /100) }} VND
                </p>
                <p class="mt-0 mb-3 card-text discount-price-text">
                    {{ new Intl.NumberFormat().format(item.price) }} VND
                </p>
                <router-link 
                    type="button"  
                    class="btn btn-detail"
                    :to="{ 
                        name: 'detailcourse', 
                        params: { id: item.id } 
                    }"
                >
                    Detail
                </router-link>
                <span class="ms-3">
                    <font-awesome-icon 
                        :icon="users" 
                        size="1x" 
                        font-weight="400"
                        color="gray" 
                    />
                    <span class="ms-1">100.000</span>
                </span>
            </div>
        </div>
    </div>
</template>
      
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'

export default {
    props: {
        item: {
            type: Object,
            default: null
        }
    },
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            users: faUsers
        }
    },
    mounted() { 

    }
}
</script>
    
<style scoped>
.btn-detail {
    background-color: #00c292;
    color: white;
}
.price-text {
    font-weight: 600;
}
.discount-price-text {
    text-decoration: line-through;
    color: darkgray;
}
.card__course:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 40px;
}
</style>
      