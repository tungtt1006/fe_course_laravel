<template>
    <div>
        <div v-if="isLoading" class="text-center" style="height: 400px;padding-top: 150px;">
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            <h1 class="fw-light text-success">Waiting a second</h1>
        </div>
        <div class="row" v-show="!isLoading">
            <div class="col-8">
                <div class="alert alert-success" role="alert" v-show="isSuccess">
                    Register Successfully - Check your mail now!!!!
                </div>

                <h1 class="mt-4 fw-normal">{{ product.name }}</h1>
                <div class="w-100 text-break">{{ product.description }}</div>

                <h1 class="mt-4 fw-normal">Nội dung khóa học</h1>
                <div class="w-100">
                    <div class="accordion accordion-flush" id="accordionPanelsStayOpenExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    <span class="badge rounded-pill bg-success fs-6 me-2">Chương 1</span>Học chút chút
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse ps-5" aria-labelledby="panelsStayOpen-headingOne">
                                <div class="accordion-body border-start border-success">
                                    <ul class="list-group">
                                        <li class="list-group-item border-0">&#9989; An item</li>
                                        <li class="list-group-item border-0">&#9989; A second item</li>
                                        <li class="list-group-item border-0">&#9989; A third item</li>
                                        <li class="list-group-item border-0">&#9989; A fourth item</li>
                                        <li class="list-group-item border-0">&#9989; And a fifth one</li>
                                      </ul>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                              Accordion Item #2
                            </button>
                          </h2>
                          <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                              Accordion Item #3
                            </button>
                          </h2>
                          <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
            <div class="col-4 p-4">
                <div class="card border-0">
                    <img src="@/assets/images/htmlcss.png" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <p class="card-text fs-4 text-muted text-decoration-line-through m-0">{{ new Intl.NumberFormat().format(product.price) }} VND</p>
                        <h3 class="card-title m-0">{{ new Intl.NumberFormat().format(product.price) }} VND</h3>
                    </div>
                    <ul class="list-group">
                        <li class="list-group-item border-0">Số buổi: <b class="fs-5">{{ theClass.sessions }}</b></li>
                        <li class="list-group-item border-0">Giáo viên: <b class="fs-5">{{ teacher.name }}</b></li>
                        <li class="list-group-item border-0">Thứ học: <b class="fs-5">{{ theClass.days_of_week }}</b></li>
                        <li class="list-group-item border-0">Giờ học: <b class="fs-5">{{ theClass.time_in }} ~ {{ theClass.time_out }}</b></li>
                        <li class="list-group-item border-0">Dự kiến bắt đầu: <b class="fs-5">{{ theClass.start_day }}</b></li>
                    </ul>
                    <div class="card-body text-center">
                        <button type="button" class="btn btn-success w-100" @click="registerProduct()">Đăng kí học</button>
                    </div>
                  </div>
            </div>
        </div>
    </div>
</template>

<script>
import { productApi } from '@/api/product.js'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            product: {},
            isSuccess: false,
            theClass: {},
            teacher: {},
            code: '',
            placeholder: 'Enter your code here',
            discountNumber: '',
            isShow: true,
            newPrice: 0,
            discountId: 0,
            timeOut: null,
            isDisableCode: false,
            isLoading: false
        }
    },
    created() {
        productApi
            .getProduct(this.$route.params.id)
            .then(response => {
                this.product = response.data.product
                this.theClass = response.data.class
                this.teacher = response.data.class.teacher
            })
    },
    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        registerProduct() {
            if (Object.keys(this.user).length === 0) {
                alert("Bạn chưa đăng nhập")
                this.$router.push('/login')
                return
            }
            clearTimeout(this.timeOut)
            this.isLoading = true
            this.timeOut = setTimeout(() => {
                productApi
                    .registerProduct({
                        class_id: this.theClass.id,
                        price: this.product.price,
                    })
                    .then(response => {
                        console.log(response.data)
                    })
                    .catch(() => {
                        alert("Đăng kí thất bại")
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            }, 300)
        },
        // sendCode() {
        //     if(this.code != '') {
        //         clearTimeout(this.timeOut);
        //         this.timeOut = setTimeout(() => {
        //             axios
        //             .get('http://localhost/product_laravel/public/api/discount/'+ this.user.id + '/' + this.code)
        //             .then(response => {
        //                 let res = response.data;
        //                 if(res.status == 200) {
        //                     if(res.price == null) {
        //                         alert("Your code has been used");
        //                         this.code = '';
        //                         return;
        //                     } else {
        //                         this.newPrice = this.product.price * (100-this.product.discount) /100;
        //                         this.discountId = res.price.id;

        //                         if(res.price.condition == 2) {
        //                             this.newPrice = this.newPrice - res.price.number;
        //                         } else if(res.price.condition == 1) {
        //                             this.newPrice = this.newPrice * (100 - res.price.number) /100;
        //                         }
        //                         this.placeholder = "Enter your code";
        //                         this.isShow = false;
        //                         this.isDisableCode = true;
        //                         this.code = '';
        //                     }
        //                 } else {
        //                     this.placeholder = "Your code is wrong";
        //                     this.code = "";
        //                 }
        //             });
        //         }, 300)
        //     } else {
        //         return;
        //     }
        // }
    }
}
</script>
