<template>
    <div 
        class="mt-2"
        :class="[colSize]"
    > 
        <div class="card card__course">
            <img 
                :src="require(`@/assets/images/${item.photo}`)" 
                class="card-img-top" 
                alt="Picture detail die"
                style="border-bottom: 1px solid lightgray;"
            >
            <div class="card-body">
                <h4 
                    class="card-title" 
                    style="font-size:22px;"
                >
                    {{ item.name }}
                </h4>

                <p class="mt-5 mb-0 card-text discount-price-text">
                    {{ new Intl.NumberFormat().format(item.price) }} VND
                </p>
                <p class="mt-0 mb-3 card-text price-text">
                    {{ new Intl.NumberFormat().format(item.price * (100-item.discount) /100) }} VND
                </p>
                <router-link 
                    type="button"  
                    class="btn btn-detail px-5"
                    :to="{ 
                        name: 'detailcourse', 
                        params: { id: item.id } 
                    }"
                >
                    Chi tiết
                </router-link>
                <span class="ms-4" style="float: right;">
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
        item: { type: Object, default: null },
        size: { type: Number, default: 2 }
    },
    components: {
        FontAwesomeIcon
    },
    created() {
        this.colSize = "col-md-" + String(this.size)
    },
    data() {
        return {
            users: faUsers,
            colSize: ''
        }
    }
}
</script>
    
<style scoped>
.btn-detail {
    background-color: #00c292;
    color: white;
    border-radius: 0;
}
.btn-detail:hover {
    color: black;
}
.price-text {
    font-weight: 600;
    font-size: 20px;
}
.discount-price-text {
    text-decoration: line-through;
    color: darkgray;
    font-size: 12px;
}
.card__course {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
</style>
      