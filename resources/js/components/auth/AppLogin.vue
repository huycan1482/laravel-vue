<template>
    <div class="wrapper">
        <div class="login-box box">
            <div class="login-header">
                <h3>Login</h3>
            </div>
            <div class="login-content">
                <form @submit.prevent="saveUser" class="">
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="inputEmail">
                        <span class="red-text"></span>
                    </div>
                    <div class="mb-3">
                        <label for="inputPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="inputPassword">
                        <span class="red-text"></span>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppLogin',

    
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