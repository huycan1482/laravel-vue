<template>
    <aside>
        <div class="app-brand d-flex justify-content-between align-items-center">
            <div class="app-brand-link d-flex align-items-center">
                <!-- <img src="" alt=""> -->
                <i class="fa-brands fa-slack brand-logo"></i>
                <span class="app-brand-name">App Vue</span>
            </div>
            <div class="app-brand-toggle d-flex align-items-center">
                <i class="fa-solid fa-bars toggle-brand"></i>
            </div>
        </div>
        <div class="app-menu">

        </div>
    </aside>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @import "../../../sass/main.scss";

    .app-brand {
        width: 16rem;
        height: 100%;

        &-link {
            .app-brand-name {
                color: $default-color;
                font-size: 1.375rem;
            }
            .brand-logo {
                width: 30px;
                height: 30px;
                color: #7367f0;
            }
            .toggle-brand {
                width: 30px;
                height: 30px;
            }
        }

        
    }
</style>