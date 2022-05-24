<template>
    <div class="container-fluid mt-5">
       <h1 class="fw-normal fs-1 text-center">Ban điều hành</h1>
        <div id="demo" class="carousel slide rounded-3 mt-3" data-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#demo" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner shadow-sm border rounded-3">
                <div
                    class="carousel-item"
                    :class="(index == 0) ? 'active' : ''"
                    v-for="(item, index) in data"
                    :key="index"
                >
                    <div class="carousel-caption">
                        <p>{{ item.content }}</p>
                        <img :src="item.photo_url">
                        <div id="image-caption">{{ item.name }}</div>
                    </div>
                </div>
            </div>
            </div>
    </div>
</template>

<script>
export default {
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
}
</script>

<style scoped>
#demo{
    background: linear-gradient(112deg, #ffffff 50%, #146c43);
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
</style>
