import {v4 as uuid} from 'uuid'

const state = {
    navBars: [
        {
            'id': uuid(),
            'name': 'Menu 1',
            'active': false,
            'link': '',
            'icon': 'fa-solid fa-house',
            'url': null,
            'children': [
                {
                    'id': uuid(),
                    'name': 'Menu sub 1',
                    'active': false,
                    'link': '',
                    'icon': 'fa-solid fa-house',
                    'children': '',
                    'url': null,
                },
                {
                    'id': uuid(),
                    'name': 'Menu sub 2',
                    'active': false,
                    'link': '',
                    'icon': 'fa-solid fa-house',
                    'children': '',
                    'url': null,
                },
            ]
        }, 
        {
            'id': uuid(),
            'name': 'Users',
            'active': false,
            'link': 'user.index',
            'icon': 'fa-solid fa-house',
            'children': [],
            'url': '/users',
        },
        {
            'id': uuid(),
            'name': 'Categories',
            'active': false,
            'link': 'category.index',
            'icon': 'fa-solid fa-house',
            'children': [],
            'url': '/categories',
        },
        {
            'id': uuid(),
            'name': 'Chats',
            'active': false,
            'link': 'chat.index',
            'icon': 'fa-solid fa-house',
            'children': [],
            'url': '/chats',
        },
        {
            'id': uuid(),
            'name': 'Messages',
            'active': false,
            'link': 'message.index',
            'icon': 'fa-solid fa-house',
            'children': [],
            'url': '/messages',
        }
    ]
}

const getters = {
    navBars: state => state.navBars,
}

const actions = {

}

const mutations = {
    ACTIVE_ITEM(state, item) {
        state.navBars = state.navBars.map((navItem) => {
            if (item.id == navItem.id) {
                // navItem.active = !navItem.active;
                navItem.active = true
            } else {
                navItem.active = false
            }

            if (navItem.children.length > 0) {
                navItem.children.map((child) => {
                    if (child.id == item.id) {
                        child.active = true
                        navItem.active = true
                    } else {
                        child.active = false
                    }
                });
            }
            return navItem
        })
    },
    CHANG_ACTIVE_ITEM(state, urlPathname) {
        state.navBars = state.navBars.map((navItem) => {
            
            if ( urlPathname.includes(navItem.url) ) {
                // navItem.active = !navItem.active;
                navItem.active = true
            } else {
                navItem.active = false
            }

            if (navItem.children.length > 0) {
                navItem.children.map((child) => {
                    if ( urlPathname.includes(child.url) ) {
                        child.active = true
                        navItem.active = true
                    } else {
                        child.active = false
                    }
                });
            }
            return navItem
        })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}