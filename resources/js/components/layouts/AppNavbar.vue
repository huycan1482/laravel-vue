<template>
    <nav class="p-3 layout-navbar box-shadow">
        <div class="">

        </div>
        <ul class="navbar-nav">
            <li class="nav-item" v-for="navItem in navBars" :key="navItem.id" :class="{'dropdown':(navItem.children.length > 0)}">
                <a href="#" class="nav-link" :class="{'dropdown-toggle hide-arrow':(navItem.children.length > 0)}" @click="navItem.show = !navItem.show">
                    <i class="nav-icon" :class="navItem.icon"></i>
                </a>
                <ul class="dropdown-menu box-shadow" :class="{show:navItem.show}" v-if="(navItem.children.length > 0)">
                    <li v-for="item in navItem.children" :key="item.id">
                        <a class="dropdown-item" href="#">{{ item.name }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
import { ref, reactive } from 'vue'
import {v4 as uuid} from 'uuid'
export default {
    name: 'AppNavbar',
    setup(props, context) {
        const navBars = reactive([
            {
                'id': uuid(),
                'name': 'Languages',
                'icon': 'fa-solid fa-globe',
                'dropClass': 'dropdown-languages',
                'show': false,
                'children': [
                    {
                        'id': uuid(),
                        'name': 'English',
                        'icon': 'fa-solid fa-globe',
                        'line': false,
                    }, 
                    {
                        'id': uuid(),
                        'name': 'French',
                        'icon': 'fa-solid fa-globe',
                        'line': false,
                    },
                    {
                        'id': uuid(),
                        'name': 'German',
                        'icon': 'fa-solid fa-globe',
                        'line': false,
                    }
                ],
            },
            {
                'id': uuid(),
                'name': 'Notifications',
                'icon': 'fa-solid fa-bell',
                'dropClass': 'dropdown-notifications',
                'show': false,
                'children': [
                    {
                        'id': uuid(),
                        'name': 'Notify 1',
                        'icon': 'fa-solid fa-globe',
                        'line': true,
                    }, 
                    {
                        'id': uuid(),
                        'name': 'Notify 2',
                        'icon': 'fa-solid fa-globe',
                        'line': true,
                    },
                    {
                        'id': uuid(),
                        'name': 'Notify 3',
                        'icon': 'fa-solid fa-globe',
                        'line': true,
                    }
                ],
            },
            {
                'id': uuid(),
                'name': 'User',
                'icon': 'fa-solid fa-user',
                'dropClass': 'dropdown-user',
                'show': false,
                'children': [
                    {
                        'id': uuid(),
                        'name': 'My Profile',
                        'icon': 'fa-solid fa-user',
                        'line': false,
                    }, 
                    {
                        'id': uuid(),
                        'name': 'Setting',
                        'icon': 'fa-solid fa-gear',
                        'line': false,
                    }, 
                    {
                        'id': uuid(),
                        'name': 'Billing',
                        'icon': 'fa-solid fa-credit-card',
                        'line': false,
                    }, 
                    {
                        'id': uuid(),
                        'name': 'Log Out',
                        'icon': 'fa-solid fa-right-from-bracket',
                        'line': false,
                    }, 
                ],
            }
        ])

        return {
            navBars,
        }
    }
}
</script>

<style lang="scss" scoped>
    .dropdown-toggle.hide-arrow::before, .dropdown-toggle.hide-arrow::after, .dropdown-toggle-hide-arrow > .dropdown-toggle::before, .dropdown-toggle-hide-arrow > .dropdown-toggle::after {
        display: none;
    }

    .layout-navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgba(255, 255, 255, 0.95);
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .navbar-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        .dropdown-menu {
            position: absolute;
            float: left;
            border: 1px solid transparent;
            & > li {
                padding: 0 5px;
            }
            .dropdown-item:hover, .dropdown-item:focus  {
                // border: 1px solid transparent;
                border-radius: 3px;
                color: #7367f0;
                background-color: rgba(115, 103, 240, 0.08);
            }
        }

        .nav-item {
            padding: 0 10px;

            .nav-link {
                padding: 0;
            }
            .nav-icon {
                width: 26px;
                height: 26px;
            }
        }
    }
</style>