<template>
    <div class="container-fluid bg-white pt-4 pb-5">
        <div class="row">
            <div class="col-5">
                <div class="logo-holder logo-6 text-center">
                    <h3>Xuan <span class="text-white">Tung</span></h3>
                </div>
            </div>

            <div class="col-7">
                <h1 class="text-center text-success">Đăng Kí Ngay</h1>
                <div class="row ms-2" style="height:55px;">
                    <div
                        class="alert alert-success mh-100 alert_custom"
                        role="alert"
                        v-if="isSuccess"
                    >
                        <b>Đăng kí thành công</b>
                    </div>
                    <div
                        class="alert alert-danger mh-100 alert_custom"
                        role="alert"
                        v-if="isFail"
                    >
                        <b>Đăng kí thất bại</b>
                    </div>
                </div>

                <div class="row ms-2">
                    <div class="col-5 input__custom">
                        <input type="text" v-model="name" placeholder="Tên" required>
                        <p class="error text-danger" v-if="nameError">Không nhập quá 20 kí tự, chỉ nhập chữ</p>
                        <p class="error" v-else style="color: white;">T</p>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-5 input__custom">
                        <input type="email" v-model="email" placeholder="Email" required>
                        <p class="error text-danger" v-if="emailError">Nhập chưa đúng định dạng</p>
                        <p class="error" v-else style="color: white;">T</p>
                    </div>
                </div>
                <div class="row mt-3 ms-2">
                    <div class="col-5 input__custom">
                        <input type="password" v-model="password" placeholder="Mật khẩu" required>
                        <p class="error text-danger" v-if="passwordError">Không nhập dưới 8 kí tự & quá 11 kí tự</p>
                        <p class="error" v-else style="color: white;">T</p>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-5 input__custom">
                        <input type="password" v-model="rePassword" placeholder="Nhập lại mật khẩu" required>
                        <p class="error text-danger" v-if="repasswordError">Mật khẩu không khớp</p>
                        <p class="error" v-else style="color: white;">T</p>
                    </div>
                </div>
                <div class="row mt-3 ms-2">
                    <div class="col-5 input__custom">
                        <input type="text" v-model="phoneNumber" placeholder="Số điện thoại" required>
                        <p class="error text-danger" v-if="phoneNumberError">Không nhập chữ, chỉ được nhập 10 số</p>
                        <p class="error" v-else style="color: white;">T</p>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-5 pt-3">
                        <input type="radio" value="1" v-model="gender">
                        <label class="ms-1">Nam</label>
                        <input class="ms-3" type="radio" value="0" v-model="gender">
                        <label class="ms-1">Nữ</label>
                        <input class="ms-3" type="radio" value="2" v-model="gender">
                        <label class="ms-1">Khác</label>
                    </div>
                </div>
                <div class="row my-4 ms-2">
                    <div class="col-11 input__custom">
                        <input type="text" v-model="address" placeholder="Địa chỉ">
                        <p class="error text-danger" v-if="addressError">Không nhập quá 100 kí tự</p>
                        <p class="error" v-else style="color: white;">T</p>
                    </div>
                </div>
                <div class="row pt-5">
                    <div class="col-12 text-center">
                        <button
                            type="button"
                            class="btn btn_register text-white shadow"
                            @click="signUp()"
                            :disabled="isRunning"
                        >
                            Đăng kí
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { validate } from '@/util/util.js'
import { authApi } from '@/api/auth.js'

export default {
    data() {
        return {
            email: '',
            name: '',
            password: '',
            rePassword: '',
            address: '',
            phoneNumber: '',
            gender: '',
            res: {},
            isSuccess: false,
            isFail: false,
            nameError: false,
            emailError: false,
            passwordError: false,
            repasswordError: false,
            phoneNumberError: false,
            addressError: false,
            isRunning: false
        }
    },
    methods: {
        signUp() {
            if(
                this.nameError
                || this.emailError
                || this.passwordError
                || this.repasswordError
                || this.phoneNumberError
                || this.addressError
            )  {
                return
            }

            this.isRunning = true
            let k = {
                name: this.name,
                email: this.email,
                phone: this.phoneNumber,
                password: this.password,
                password_confirmation: this.rePassword,
                gender: this.gender,
                address: this.address
            }

            authApi.register(k).then(response => {
                if(response.status == 201) {
                    this.isSuccess = true
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 700)
                }
            }).catch(() => {
                this.isFail = true
                this.isRunning = false
            })
        }
    },
    watch: {
        name(val) {
            if(!validate.validateName(val)) {
                this.nameError = true
            } else {
                this.nameError = false
            }
        },
        email(val) {
            if(!validate.isEmail(val)) {
                this.emailError = true
            } else {
                this.emailError = false
            }
        },
        password(val) {
            if(!validate.isPassword(val)) {
                this.passwordError = true
            } else {
                this.passwordError = false
            }
        },
        rePassword(val) {
            if(val === this.password) {
                this.repasswordError = false
            } else {
                this.repasswordError = true
            }
        },
        phoneNumber(val) {
            if(!validate.validatePhoneNumber(val)) {
                this.phoneNumberError = true
            } else {
                this.phoneNumberError = false
            }
        },
        address(val) {
            if(val.length < 100) {
                this.addressError = false
            } else {
                this.addressError = true
            }
        }
    }
}
</script>

<style scoped>
.logo-6 h3 {
    color: #00c292;
    font-family: 'Cinzel', serif;
    font-weight: 300;
    font-size: 150px;
    line-height:1.3;
}
.logo-6 h3 span {
    background-color: #00c292;
    display: inline-block;
    line-height: 1.8;
    padding: 0 16px;
}
.input__custom input, .input__custom select {
    font-size: 15px;
    width: 100%;
    padding: 10px 10px 5px 10px;
    outline: none;
    border: none;
    border-bottom: 1px solid #00c292;
}
.error {
    font-size:13px;
    margin: 0;
}
.btn_register {
    background-color: #00c292;
    margin: auto;
    width: 30%;
}
.alert_custom {
    width: 90%;
}
</style>
