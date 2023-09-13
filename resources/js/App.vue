<template>
    <div class="d-flex" style="background-color: #f8f7fa">
        <SideBar/>
        <div class="layout-page">
            <nav class="layout-navbar"></nav>
            <div class="content-wrapper">
                <router-view/>
            </div>
        </div>
    </div>
    
</template>

<script>
import SideBar from "./components/layouts/AppSideBar";

export default {
    name: "App",
    components: {SideBar},
}
</script>

<style>

</style>