<template>
    <aside class="p-3 box-shadow">
        <div class="app-brand d-flex justify-content-between align-items-center">
            <div class="app-brand-link d-flex align-items-center">
                <!-- <img src="" alt=""> -->
                <i class="fa-brands fa-slack brand-logo cursor"></i>
                <span class="app-brand-name">App Vue</span>
            </div>
            <div class="app-brand-toggle d-flex align-items-center">
                <i class="fa-solid fa-bars toggle-brand cursor"></i>
            </div>
        </div>
        <div class="app-menu">
            <ul class="list-menu">
                <li class="menu-item">
                    <a href="#" class="menu-link active">
                        <i class="fa-solid fa-house"></i>
                        <div class="menu-text">Home</div>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="#" class="menu-toggle" @click="slide = !slide">
                        <!-- <div class> -->
                            <i class="fa-solid fa-house"></i>
                            <div class="menu-text">Home</div>
                        <!-- </div> -->
                        <i class="fa-solid fa-caret-down icon-arrow"></i>
                    </a>

                    <!-- <Transition name="slide"> -->
                    <ul :class="['menu-sub', slide ? 'show' : ''] ">
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
                    <a href="#" class="menu-link">
                        <i class="fa-solid fa-house"></i>
                        <div class="menu-text">Home</div>
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
export default {
    name: "AppSideBar",
    props: ['slide'],
}
</script>

<style lang="scss" scoped>
    @import "../../../sass/main.scss";
    
    aside {
        background-color: #ffff;
        height: 100vh;
        width: 16rem;
    }

    .app-brand {
        width: 100%;
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
    .app-menu {
        .list-menu {
            margin-top: 10px;
            .menu-item {
                width: 100%;
                color: $default-color;

                &:hover  {
                    & > .menu-link, & > .menu-toggle {
                        background: #f8f8f8;
                    }
                }
                
                & i {
                    width: 24px;
                    height: 23px;
                }

                .menu-link, .menu-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                    height: 40px;
                    padding: 0 10px;
                    border: 1px solid transparent;
                    border-radius: 10px;
                    transition: .3s;
                    margin-bottom: 5px;
                }
                
                .menu-toggle {
                    position: relative;
                    &.active {
                        background: #f8f8f8;
                        & > .menu-text {
                            font-weight: 700;
                        }
                    }
                    .icon-arrow {
                        position: absolute;
                        right: 5px;
                    }
                }

                .menu-link {
                    &.active {
                        background: linear-gradient(72.47deg, #7367f0 22.16%, rgba(115, 103, 240, 0.7) 76.47%);
                        box-shadow: 0px 2px 6px 0px rgba(115, 103, 240, 0.48);
                        color: #fff !important;
                    }
                }

                .menu-text {
                    margin-left: 10px;
                }
            }
        }
    }

    .menu-sub {
        max-height: 0;
        transition: .5s;
            // transition: 1s;

        overflow: hidden;
        // animation: slideUp 1s infinite;

        &.show {
            transition: 1s;
            max-height: 100vh;
            // transform: translateY(-100%);
            // animation: slideDown 1s infinite;
        }
    }

    .slide-enter-active,
    .slide-leave-active {
        transition: 0.5s;
    }

    .slide-enter-from,
    .slide-leave-to {
        // transform: translateY(-50%);
        opacity: 0;
    }
    
    

</style>