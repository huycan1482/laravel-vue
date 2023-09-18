<template>
    <div class="d-flex" style="background-color: #f8f7fa">
        <SideBar/>
        <div class="layout-page container">
            <Navbar/>
            <div class="content-wrapper">
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

</style>