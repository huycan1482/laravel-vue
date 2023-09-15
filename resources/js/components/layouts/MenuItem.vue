<template>
    <li class="menu-item">
        <a href="#" class="menu-link active">
            <i class="fa-solid fa-house"></i>
            <div class="menu-text">Home</div>
        </a>
    </li>
    <li class="menu-item">
        <a href="#" class="menu-toggle" :class="{active:slide}" @click="slide = !slide">

            <!-- :class="{active:isActive}" @click="isActive = !isActive" -->
            <!-- <div class> -->
                <i class="fa-solid fa-house"></i>
                <div class="menu-text">Home</div>
            <!-- </div> -->
            <div :class="['icon-arrow icon-rotate', slide ? '' : 'right-90']">
                <i class="fa-solid fa-caret-down "></i>
            </div>
        </a>

        <!-- <Transition name="slide"> -->
        <ul :class="['menu-sub slide-toggle', slide ? 'show' : '']">
        <!-- <ul class="menu-sub" v-if="slide"> -->
            <li class="menu-item">
                <a href="#" class="menu-link">
                    <i class="fa-solid fa-house"></i>
                    <div class="menu-text">Home 1</div>
                </a>
            </li>
            <li class="menu-item">
                <a href="#" class="menu-link">
                    <i class="fa-solid fa-house"></i>
                    <div class="menu-text">Home 1</div>
                </a>
            </li>
        </ul>
        <!-- </Transition> -->
    </li>
    <li class="menu-item">
        <a href="#" class="menu-link">
            <i class="fa-solid fa-house"></i>
            <div class="menu-text">Home</div>
        </a>
    </li>
    <li class="menu-item">
        <a href="#" class="menu-toggle" @click="activeMenu">

            <!-- :class="{active:isActive}" @click="isActive = !isActive" -->
            <!-- <div class> -->
                <i class="fa-solid fa-house"></i>
                <div class="menu-text">Home 2</div>
            <!-- </div> -->
            <div :class="['icon-arrow icon-rotate', slide ? '' : 'right-90']">
                <i class="fa-solid fa-caret-down "></i>
            </div>
        </a>

        <!-- <Transition name="slide"> -->
        <ul :class="['menu-sub slide-toggle', slide ? 'show' : '']">
        <!-- <ul class="menu-sub" v-if="slide"> -->
            <li class="menu-item">
                <a href="#" class="menu-link">
                    <i class="fa-solid fa-house"></i>
                    <div class="menu-text">Home 2</div>
                </a>
            </li>
            <li class="menu-item">
                <a href="#" class="menu-link">
                    <i class="fa-solid fa-house"></i>
                    <div class="menu-text">Home 2</div>
                </a>
            </li>
        </ul>
        <!-- </Transition> -->
    </li>
    <li class="menu-item">
        <a href="#" class="menu-link">
            <i class="fa-solid fa-house"></i>
            <div class="menu-text">Home</div>
        </a>
    </li>
</template>

<script>
export default {

}
</script>

<style>

</style>