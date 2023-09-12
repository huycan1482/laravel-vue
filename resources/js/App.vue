<template>
    <SideBar/>
    <div class="layout-page">
        <nav class="layout-navbar"></nav>
        <div class="content-wrapper">
            <router-view/>
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