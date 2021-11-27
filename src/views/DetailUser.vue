<template>
    <div class="container-fluid pt-4">
        <h1 class="fw-normal">Information</h1>
        <div class="row mt-4">
            <div class="col-md-6">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-normal">Name</div>
                      </div>
                      <div class="fw-bold">{{ user.name }}</div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-nomral">Username</div>
                      </div>
                      <div class="fw-bold">{{ user.username }}</div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-normal">Email</div>
                      </div>
                      <div class="fw-bold">{{ user.email }}</div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-normal">Address</div>
                        </div>
                        <div class="fw-bold">{{ user.address }}</div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        <div class="ms-2 me-auto">
                          <div class="fw-normal">Phone Number</div>
                        </div>
                        <div class="fw-bold">{{ user.phonenumber }}</div>
                      </li>
                  </ul>
            </div>
        </div>
        <div class="row mt-5">
            <table class="table table-bordered">
                <thead class="table-light">
                  <tr>
                    <th scope="col">Order list</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Registered</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in orderList" :key="i">
                    <td>{{ i }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ new Intl.NumberFormat().format(item.price) }} VND</td>
                    <td>{{ new Date(item.created_at).getDay() }}/{{ new Date(item.created_at).getMonth() }}/{{ new Date(item.created_at).getFullYear() }}</td>
                    <td class="text-center">
                        <button type="button" class="btn btn-danger" @click="deleteOrder(item.id, i)">
                            <font-awesome-icon :icon="faTrash" font-weight="500" />
                        </button>
                    </td> 
                 </tr>
                </tbody>
              </table>
        </div>
    </div>
</template>
      
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default {
    data() {
        return {
            orderList: [],
            faTrash: faTrashAlt,
            timeOut: null
        }
    },
    components: {
        FontAwesomeIcon
    },
    computed: {
        ...mapGetters(['user'])
    },
    created() {
        axios
            .get('http://localhost/course_laravel/public/api/get-order/' + this.user.id)
            .then(response => { 
                let res = response.data;
                if(res.status == "200") {
                    this.orderList = res.listObject;
                } 
            });
    },
    watch: {
        "user.name"(val) {
            if(val == undefined) {
                this.$router.push('/');
            }
        }
    },
    methods: {
        deleteOrder(id, index) {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                axios
                .delete('http://localhost/course_laravel/public/api/delete-order/' + id)
                .then(response => { 
                    let res = response.data;
                    if(res.status == "200") {
                        this.orderList.splice(index, 1);
                    } 
                })
            }, 500)
        }
    }
}
</script>
      
<style scoped>

</style>
      