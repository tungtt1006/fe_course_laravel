<template>
    <div 
        class="mt-2"
        :class="[colSize]"
    > 
        <router-link  
            class="card card__course"
            :to="{ 
                name: 'detailcourse', 
                params: { id: item.id } 
            }"
        >
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
                <p class="card-text description-text">{{ item.description }}</p>

                <p class="mt-5 mb-0 card-text discount-price-text">
                    {{ new Intl.NumberFormat().format(item.price) }} VND
                </p>
                <p class="mt-0 card-text price-text">
                    {{ new Intl.NumberFormat().format(item.price * (100-item.discount) /100) }} VND
                </p>
            </div>
        </router-link>
    </div>
</template>
      
<script>
export default {
    props: {
        item: { type: Object, default: null },
        size: { type: Number, default: 2 }
    },
    created() {
        this.colSize = "col-md-" + String(this.size)
    },
    data() {
        return {
            colSize: ''
        }
    }
}
</script>
    
<style scoped>
.card__course {
    color: black;
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}
.card__course:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
.description-text {
    overflow: hidden;
    text-overflow: ellipsis;
    /* line-height: 25px; */
    -webkit-line-clamp: 2;
    /* height: 50px; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: #757575;
    margin: 0;
}
</style>
      