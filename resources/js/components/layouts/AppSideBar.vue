<template>
    <aside class="p-3 box-shadow wrap-text slide-toggle-x" :class="{show:menuApp.show, 'menu-hover':menuApp.hover}" @mouseover="asideMouseOver" @mouseleave="asideMouseLeave">
        <!-- @mouseover="menuApp.show = true" -->
        <!-- , 'aside-hover':menuApp.hover -->
        <div class="app-brand d-flex justify-content-between align-items-center">
            <div class="app-brand-link d-flex align-items-center">
                <!-- <img src="" alt=""> -->
                <i class="fa-brands fa-slack brand-logo cursor"></i>
                <span class="app-brand-name">{{ menuApp.name }}</span>
            </div>
            <div class="app-brand-toggle d-flex align-items-center" @click="asideHover">
                <i class="fa-solid fa-bars toggle-brand cursor"></i>
            </div>
        </div>
        <div class="app-menu">
            <ul class="list-menu">
                <li class="menu-item" v-for="menu in navBars" :key="menu.id">
                    <a href="#" class="" :class="[menu.active ? 'active' : '', ((menu.children.length) > 0) ? 'menu-toggle' : 'menu-link']" @click="ACTIVE_ITEM(menu)">
                        <i class="" :class="menu.icon"></i>
                        <div class="menu-text">{{ menu.name }}</div>
                        <div :class="['icon-arrow icon-rotate', menu.active ? '' : 'right-90']" v-if="(menu.children.length) > 0">
                            <i class="fa-solid fa-caret-down "></i>
                        </div>
                    </a>
                    <ul :class="['menu-sub slide-toggle-y', menu.active ? 'show' : '']" v-if="(menu.children.length) > 0">
                        <li class="menu-item" v-for="menuItem in menu.children" :key="menuItem.id">
                            <a href="#" class="menu-link" :class="{active:menuItem.active}">
                                <i class="" :class="menuItem.icon"></i>
                                <div class="menu-text">{{ menuItem.name }}</div>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
import { reactive } from 'vue'
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: "AppSideBar",
    computed: mapGetters(['navBars']),
    methods: { ...mapMutations(['ACTIVE_ITEM'])},
    setup(props, context) {
        const menuApp = reactive({
            'icon' : '',
            'name' : 'App Vue',
            'show' : true, 
            'hover': false,
        })

        const asideHover = () => {
            menuApp.hover = !menuApp.hover;
            menuApp.show = menuApp.hover ? !menuApp.show : true;
        }

        const asideMouseOver = () => {
            (menuApp.hover) ? (menuApp.show = true) : ''
        }

        const asideMouseLeave = () => {
            (menuApp.hover) ? (menuApp.show = false) : ''
        }

        return {
            menuApp,
            asideHover,
            asideMouseOver,
            asideMouseLeave,
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../sass/main.scss";
    aside {
        background-color: #ffff;
        height: 100vh;
        width: 16rem;

        &.slide-toggle-x {
            max-width: 70px;
        }
// :not(:hover)
        &.slide-toggle-x:not(.show) {
            transition: .3s;
            .menu-sub {
                max-height: 0;
                transition: .4s;
            }

            .menu-item {
                .menu-text {
                    transition: .4s;
                    margin-left: 26px;
                }

                .menu-toggle .icon-arrow {
                    display: none;
                }
            }

        }

    }
    .app-brand {
        width: 100%;
        padding: 0 5px;
        &-link {
            .app-brand-name {
                color: $default-color;
                font-size: 1.375rem;
            }
            .brand-logo {
                width: 30px;
                height: 30px;
                color: #7367f0;
                margin-right: 20px;
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
                        display: block;
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

    .menu-toggle {
        &.active {
            background: #f8f8f8;
        }
    }

    .menu-sub {
        display: flex;
        flex-direction: column;
        // max-height: 100%;
        transition: .5s;
    }

    .menu-hover {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
    }

</style>