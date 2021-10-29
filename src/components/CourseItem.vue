<template>
    <div class="col-md-3 mt-2">
        <div class="card">
            <img src="@/assets/images/htmlcss.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">{{ item.name }}</h4>
                <p class="mt-5 mb-0 card-text price-text">
                    {{ new Intl.NumberFormat().format(item.price) }} VND
                </p>
                <p class="mt-0 mb-3 card-text discount-price-text">
                    {{ new Intl.NumberFormat().format(item.price) }} VND
                </p>
                <router-link 
                    type="button" 
                    class="btn btn-detail"
                    :to="{ name: 'detailcourse', params: { id: item.id, detailCourse: item } }"
                >
                    Detail
                </router-link>
                <button type="button" class="btn ms-4 btn-outline-success">
                    Register
                </button>
            </div>
        </div>
    </div>
</template>
      
<script>
export default {
    props: {
        item: {
            type: Object,
            default: null
        }
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
</style>
      