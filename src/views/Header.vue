<template>
<div>
    <nav class="navbar navbar-expand-sm" style="background-color: white;">
        <div class="col-md-8">
            <h1 class="ps-3 m-0 fw-normal" style="color:#00c292;cursor: default;">KOURSES</h1>
        </div>
        <div class="col-md-2 ps-3">
            <p class="m-0 fw-thin">Email</p>
            <p class="m-0 fs-5 fw-normal">team13@gmail.com</p>
        </div>
        <div class="col-md-2 ps-5">
            <p class="m-0 fw-thin">Hotline</p>
            <p class="m-0 fs-5 fw-normal">0968.68.68.68</p>
        </div>
    </nav>
    <nav class="navbar navbar-expand-lg header">
        <div class="container-fluid">
            <router-link class="navbar-brand nav_brand" to="/">Home</router-link>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle nav_item" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Courses 
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li 
                                v-for="item in categoryList"
                                :key="item.id"
                            >
                                <router-link 
                                    class="dropdown-item" 
                                    :to="{ name: 'category', params: { id: item.id, name: item.name } }"
                                >
                                    {{ item.name }}
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav_item" to="/newslist">News</router-link>
                    </li>
                    <li class="nav-item nav_item">
                        <router-link class="nav-link nav_item" to="/aboutus">About us</router-link>
                    </li>
                </ul>
            </div>
            <div></div>
            <div v-if="Object.keys(user).length != 0">
                <router-link to="/detailuser" style="text-decoration: none;">
                    <span style="font-size: 20px;color:white;font-weight: 300;">Hi, <b>{{ user.username }}</b> /</span> 
                </router-link>
                <span 
                    style="font-size: 20px;color:white;font-weight: 300;cursor: default;"
                    @click="deleteAcc()"
                > 
                    Logout
                </span>
            </div>
            <div v-else class="pe-3" style="color:white">
                <router-link class="sign_in" to="/login">Sign in</router-link> /
                <router-link class="sign_up" to="/register">Sign up</router-link>    
            </div>
        </div>
    </nav>    
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    created() {
        this.getCategorylist();
    },
    mounted() {
        if(localStorage.user != undefined) {
            this.setUser(JSON.parse(localStorage.user));
        }
    },
    beforeDetroy() {
        this.deleteAcc(); 
    },
    methods: {
        ...mapActions(['getCategorylist', 'setUser']),
        deleteAcc() {
            this.setUser({});
            window.localStorage.removeItem('user'); 
        }
    },
    computed: {
        ...mapGetters(['categoryList', 'user'])
    }
}
</script>

<style scoped>
.header {
    background-color: #00c292;
}
.nav_brand, .nav_item {
    color: white !important;
}
.sign_in, .sign_up {
    color: white;
    text-decoration: none;
}
.sign_in:hover, .sign_up:hover {
    color: white;
    text-decoration: underline;
}
</style>
