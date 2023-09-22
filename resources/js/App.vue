<template>
    <div class="d-flex" style="background-color: #f8f7fa">
        <SideBar/>
        <div class="layout-page container">
            <Navbar/>
            <div class="content-wrapper p-3 mt-3 box">
                <router-view/>
            </div>
        </div>
    </div>
    
</template>

<script>
import SideBar from "./components/layouts/AppSideBar";
import Navbar from "./components/layouts/AppNavbar";

export default {
    name: "App",
    components: {SideBar, Navbar},
}
</script>

<style lang="scss" scoped>
    .layout-page {
        // padding-top: 15px;
        // padding-bottom: 15px;
        padding: 15px 30px !important;
        min-height: 100vh;
    }
</style>