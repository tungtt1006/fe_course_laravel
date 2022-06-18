<template>
    <div class="row" v-if="profile">
        <div class="bg-c-lite-green rounded mt-3">
            <div class="p-1 text-center text-white">
                <div class="mb-2">
                    <img :src="profile.photoUrl" alt="User-Profile-Image">
                </div>
                <h3 class="fw-bolder">{{ profile.name }}</h3>
                <p class="fs-4 mb-3">Học viên</p>
            </div>
        </div>
        <div class="p-3">
            <h4 class="mb-3 pb-2 b-b-default fs-3">
                Thông tin <button type="button" class="btn p-0" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fs-5 fa fa-pencil" aria-hidden="true"></i></button>
            </h4>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-success" id="exampleModalLabel">Cập nhật thông tin</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btn-close"></button>
                    </div>
                    <div class="modal-body">
                        <form class="row g-3">
                            <div class="col-6">
                                <label for="inputName" class="form-label">Tên</label>
                                <input type="text" class="form-control" id="inputName" v-model="edit.name">
                            </div>
                            <div class="col-6">
                                <label for="inputEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="inputEmail" v-model="edit.email">
                            </div>
                            <div class="col-6">
                                <label for="inputPassword" class="form-label">Mật khẩu mới</label>
                                <input type="password" class="form-control" id="inputPassword" v-model="edit.newPassword">
                            </div>
                            <div class="col-6">
                                <label for="inputOldPassword" class="form-label">Mật khẩu cũ</label>
                                <input type="password" class="form-control" id="inputOldPassword" v-model="edit.oldPassword">
                            </div>
                            <div class="col-6">
                                <label for="inputPhone" class="form-label">Điện thoại</label>
                                <input type="text" class="form-control" id="inputPhone" placeholder="0123456789" v-model="edit.phone">
                            </div>
                            <div class="col-6">
                                <label for="inputPhone" class="form-label w-100">Giới tính</label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" v-model="edit.gender">
                                    <label class="form-check-label" for="inlineRadio1">Nam</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio0" value="0" v-model="edit.gender">
                                    <label class="form-check-label" for="inlineRadio0">Nữ</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" v-model="edit.gender">
                                    <label class="form-check-label" for="inlineRadio2">Khác</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="inputAddress" class="form-label">Địa chỉ</label>
                                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="edit.address">
                            </div>
                        </form>
                        <div class="alert alert-danger mt-3 p-2" v-if="errors.length > 0">
                            <ul>
                                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-success" @click="updateProfile()">Lưu</button>
                    </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <p class="mb-2 fs-6 fw-bolder">Email</p>
                    <h6 class="text-muted fw-400 fs-5">{{ profile.email }}</h6>
                </div>
                <div class="col-6">
                    <p class="mb-2 fs-6 fw-bolder">Điện thoại</p>
                    <h6 class="text-muted fw-400 fs-5">{{ profile.phone }}</h6>
                </div>
                <div class="col-6 mt-3">
                    <p class="mb-2 fs-6 fw-bolder">Giới tính</p>
                    <h6 class="text-muted fw-400 fs-5">{{ getGender(profile.gender) }}</h6>
                </div>
                <div class="col-6 mt-3">
                    <p class="mb-2 fs-6 fw-bolder">Địa chỉ</p>
                    <h6 class="text-muted fw-400 fs-5">{{ profile.address }}</h6>
                </div>
            </div>

            <h4 class="my-3 pb-2 b-b-default fs-3">Thông số</h4>
            <div class="row">
                <div class="col-6">
                    <p class="mb-2 fs-6 fw-bolder">Đã đăng ký</p>
                    <h6 class="text-muted fw-400 fs-5">{{ profile.orderNumber }} lớp</h6>
                </div>
                <div class="col-6">
                    <p class="mb-2 fs-6 fw-bolder">Tổng tiền đã nạp</p>
                    <h6 class="text-muted fw-400 fs-5">{{ new Intl.NumberFormat().format(profile.totalMoney) }} VNĐ</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { userApi } from '@/api/user.js'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            profile: null,
            edit: null,
            errors: []
        }
    },
    created() {
        this.getUser()
    },
    methods: {
        ...mapActions(['setUser']),
        async getUser() {
            const res = await userApi.getUser()
            this.profile = res.data.data
            this.edit = this.profile
            this.edit.newPassword = ''
            this.edit.oldPassword = ''
        },
        getGender(gender) {
            let x = ''
            switch(gender) {
                case 0:
                    x = 'Nữ'
                    break
                case 1:
                    x = 'Nam'
                    break
                default:
                    x = 'Khác'
                    break
            }
            return x
        },
        async updateProfile() {
            const self = this
            self.errors.length = 0
            const profile = {
                name: this.edit.name,
                email: this.edit.email,
                phone: this.edit.phone,
                gender: this.edit.gender,
                address: this.edit.address
            }
            if (this.edit.newPassword !== '' && this.edit.oldPassword !== '') {
                profile.newPassword = this.edit.newPassword
                profile.oldPassword = this.edit.oldPassword
            }
            try {
                await userApi.updateUser(profile)
                self.profile.name = this.edit.name
                self.profile.email = this.edit.email
                self.profile.phone = this.edit.phone
                self.profile.gender = this.edit.gender
                self.profile.address = this.edit.address

                let login = JSON.parse(localStorage.getItem('login'))
                if (login) {
                    localStorage.removeItem('login')
                    localStorage.setItem('login', JSON.stringify({
                        email: self.profile.email,
                        token: login.token
                    }))
                    this.setUser({ email: self.profile.email })
                }

                document.getElementById('btn-close').click();
            } catch(err) {
                const errors = err.response.data.errors
                for (const error in errors) {
                    const k = errors[error].map(item => item)
                    self.errors = self.errors.concat(k)
                }
            }

        }
    }
}
</script>

<style scoped>
.btn:focus {
    box-shadow: none;
}
.bg-c-lite-green {
    background: -webkit-gradient(linear, left top, right top, from(#f29263), to(#ee5a6f));
    background: linear-gradient(to right, #ee5a6f, #f29263);
}
.b-b-default {
    border-bottom: 1px solid #e0e0e0;
}
.b-b-default {
    border-bottom: 1px solid #e0e0e0;
}
</style>
