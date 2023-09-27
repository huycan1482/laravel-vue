<template>
    <div class="wrapper">
        <div class="login-box box">
            <div class="login-header">
                <h3>Login</h3>
            </div>
            <div class="login-content">
                <form @submit.prevent="postLogin" class="">
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="inputEmail" v-model="email">
                        <span class="red-text"></span>
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword" v-model="password">
                        <span class="red-text"></span>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex"
// import { useRouter } from 'vue-router';

export default {
    name: 'AppLogin',
    methods: { 
        ...mapActions(['login']),

        postLogin() {
            const formData = {
                email: this.email,
                password: this.password,
            }
            this.login(formData)
            // this.$router.push({name: 'user.index'})
        },
    },
    data() {
        return {
            email: '',
            password: '',
        }
    }
    
}
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-box {
        padding: 30px;
        width: 50%;
        .login-header {
            text-align: center;
        }
    }

</style>