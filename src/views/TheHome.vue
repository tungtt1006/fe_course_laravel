<template>
    <div class="pb-5">
        <Banner />
        <ProductList :products="hightlightProducts" class="mt-5" />
        <ProductList :products="newestProducts" class="mt-5" />
        <FounderList />
    </div>
</template>

<script>
import Banner from '@/components/TheBanner.vue'
import FounderList from '@/components/FounderList.vue'
import ProductList from '@/components/Product/ProductList.vue'
import { productApi } from '@/api/product.js'

export default {
    components: {
        Banner,
        ProductList,
        FounderList
    },
    data() {
        return {
            categories: [],
            hightlightProducts: {},
            newestProducts: {},
            data: [
                {
                    name: 'Phạm Xuân Tùng',
                    photo_url: 'https://i.imgur.com/lE89Aey.jpg',
                    content: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for beginners that I've ever seen."
                },
                {
                    name: 'Phạm Minh Tuấn',
                    photo_url: 'https://i.imgur.com/QptVdsp.jpg',
                    content: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for beginners that I've ever seen."
                },
                {
                    name: 'Phạm Văn Lộc',
                    photo_url: 'https://i.imgur.com/jQWThIn.jpg',
                    content: "If Shai Reznik's TDD videos don't convince you to add automated testing your code, I don't know what will.This was the very best explanation of frameworks for beginners that I've ever seen."
                },
            ]
        }
    },
    created() {
        productApi
            .getProducts('hightlight')
            .then(response => {
                this.hightlightProducts = response.data
                this.hightlightProducts.title = "Khóa học nổi bật"
            })
            .catch(error => console.log(error))
        productApi
            .getProducts('newest')
            .then(response => {
                this.newestProducts = response.data
                this.newestProducts.title = "Khóa học mới nhất"
            })
            .catch(error => console.log(error))
    }
}
</script>

<style scoped>
#demo{
    background: linear-gradient(112deg, #ffffff 50%, antiquewhite 50%);
    margin: auto;
}
.carousel-caption {
    position: initial;
    z-index: 10;
    padding: 5rem 8rem;
    color: rgba(78, 77, 77, 0.856);
    text-align: center;
    font-size: 1.2rem;
    font-style: italic;
    font-weight: bold;
    line-height: 2rem;
}
@media(max-width:767px){
    .carousel-caption {
        position: initial;
        z-index: 10;
        padding: 3rem 2rem;
        color: rgba(78, 77, 77, 0.856);
        text-align: center;
        font-size: 0.7rem;
        font-style: italic;
        font-weight: bold;
        line-height: 1.5rem;
    }
}
.carousel-caption img{
    width: 6rem;
    border-radius: 5rem;
    margin-top: 2rem;
}
@media(max-width:767px){
    .carousel-caption img{
        width: 4rem;
        border-radius: 4rem;
        margin-top: 1rem;
    }
}
#image-caption{
    font-style: normal;
    font-size: 1rem;
    margin-top: 0.5rem;
}
@media(max-width:767px){
    #image-caption{
        font-style: normal;
        font-size: 0.6rem;
        margin-top: 0.5rem;
    }
}
i{
    background-color: rgb(223, 56, 89);
    padding: 1.4rem;
}
@media(max-width:767px){
    i{
        padding: 0.8rem;
    }
}
.carousel-control-prev{
    justify-content: flex-start;
}

.carousel-control-next {
    justify-content: flex-end;
}
.carousel-control-prev,.carousel-control-next{
    transition: none;
    opacity: unset;
}
</style>
