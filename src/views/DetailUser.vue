<template>
    <div class="container-fluid pt-4">
        <h1 class="fw-normal">Information</h1>
        <!-- Button trigger modal -->
        <div>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Edit
            </button>
            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Update password</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="mb-3 col-12 text-center" v-if="isSuccess">
                            <span class="badge rounded-pill bg-success">Success</span>
                        </div>
                        <div class="col-12">
                            <input type="password" class="form-control" placeholder="Old Password" v-model="oldPassword">
                        </div>
                        <div class="col-12 mt-3">
                            <input type="password" class="form-control" placeholder="New Password" v-model="newPassword">
                        </div>
                        <div class="col-12 mt-3">
                            <input type="password" class="form-control" placeholder="Re-enter" v-model="reenterPassword">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="isSuccess = false">Close</button>
                    <button v-if="isUpdated == false" type="button" class="btn btn-outline-success" @click="editPassword()">Update</button>
                    <div v-else class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

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
                    <!-- <td>{{ new Date(item.created_at).getDay() }}/{{ new Date(item.created_at).getMonth() }}/{{ new Date(item.created_at).getFullYear() }}</td> -->
                    <td>{{ item.date }}</td>
                    <td class="text-center">
                        <button v-if="item.status == 0" type="button" class="btn btn-danger" @click="deleteOrder(item.id, i)">
                            <font-awesome-icon :icon="faTrash" font-weight="500" />
                        </button>
                        <span class="badge rounded-pill bg-success" v-else>Paid</span>
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
            timeOut: null,
            oldPassword: '',
            newPassword: '',
            reenterPassword: '',
            isUpdated: false,
            isSuccess: false
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
        editPassword() {
            const self = this;

            clearTimeout(this.timeOut);
                this.timeOut = setTimeout(() => {
                    if(self.oldPassword == '' || self.newPassword == '' || self.reenterPassword == '') {
                    alert("Fill in the blank please");
                    return;
                }
                if(self.newPassword.length < 8) {
                    self.newPassword = '';
                    alert("Password is too short");
                    return;
                }
                if(self.newPassword != self.reenterPassword) {
                    self.reenterPassword = '';
                    self.newPassword = '';
                    alert("Re-enter password is wrong");
                    return;
                }
                
                self.isUpdated = true;
                let k = {};
                k.id = self.user.id;
                k.oldPassword = self.oldPassword;
                k.newPassword = self.newPassword;

                axios
                .put('http://localhost/course_laravel/public/api/edit-password', k)
                .then(response => { 
                    let res = response.data;
                    if(res.status == "200") {
                        setTimeout(() => {
                            self.isUpdated = false;
                            self.isSuccess = true;
                            self.oldPassword = '';
                            self.newPassword = '';
                            self.reenterPassword = '';
                        }, 2000)
                    } else {
                        alert("Change password is failed");
                    }
                })
            }, 500)
        },
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
      