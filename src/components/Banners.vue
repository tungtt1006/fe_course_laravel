<template>
    <div 
        class="row pt-4"
        style="padding-bottom: 30px;"
    >
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div 
                    class="carousel-item"
                    :class="(index == 0) ? 'active' : ''"
                    v-for="(item, index) in bannerList"
                    :key="item.id"
                >
                    <img 
                        :src="require('@/assets/images/' + item.photo)" 
                        style="height: 420px;" 
                        class="d-block w-100" 
                        alt="Lỗi ảnh banner"
                    >
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div> 
</template>
      
<script>
import { bannerApi } from '@/api/banner.js'

export default {
  data() {
      return {
          bannerList: [],
          imgUrl: '../assets/images/'
      }
    },
    created() {
        bannerApi.getBannersHome().then(response => { 
            this.bannerList = response.data 
        });
    },
}
</script>
      
<style>

</style>
      