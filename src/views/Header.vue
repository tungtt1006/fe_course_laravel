<template>
<div>
    <nav class="navbar navbar-expand-lg header">
        <div class="container-fluid">
            <router-link class="navbar-brand nav_brand" to="/">KOURSES</router-link>
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
                        <router-link class="nav-link nav_item" to="/">News</router-link>
                    </li>
                    <li class="nav-item nav_item">
                        <router-link class="nav-link nav_item" to="/">About us</router-link>
                    </li>
                </ul>
            </div>
            <div v-if="Object.keys(user).length != 0">
                <span style="font-size: 20px;color:white;font-weight: 300;">Hi, <b>{{ user.username }}</b> /</span> 
                <span 
                    style="font-size: 20px;color:white;font-weight: 300;cursor: default;"
                    @click="setUser({})"
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
  mounted() {
      this.getCategorylist();
  },
  methods: {
      ...mapActions(['getCategorylist', 'setUser'])
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
