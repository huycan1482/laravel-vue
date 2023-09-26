import { createStore } from 'vuex'
import {v4 as uuid} from 'uuid'

export default createStore({
    state: {
        navBars: [
            {
                'id': uuid(),
                'name': 'Menu 1',
                'active': true,
                'link': '',
                'icon': 'fa-solid fa-house',
                'children': [
                    {
                        'id': uuid(),
                        'name': 'Menu sub 1',
                        'active': true,
                        'link': '',
                        'icon': 'fa-solid fa-house',
                        'children': ''
                    },
                    {
                        'id': uuid(),
                        'name': 'Menu sub 2',
                        'active': false,
                        'link': '',
                        'icon': 'fa-solid fa-house',
                        'children': ''
                    },
                ]
            }, 
            {
                'id': uuid(),
                'name': 'Menu 2',
                'active': false,
                'link': '',
                'icon': 'fa-solid fa-house',
                'children': []
            },
            {
                'id': uuid(),
                'name': 'Menu 3',
                'active': false,
                'link': '',
                'icon': 'fa-solid fa-house',
                'children': []
            }
        ]
    },
    mutations: {
        activeItem(state, item) {
            state.navBars = state.navBars.map((navItem) => {
                if (item.id == navItem.id) {
                    navItem.active = !navItem.active;
                }
                return navItem
            })
        },
    },
    actions: {
    
    },
    getters: {
        
    }
})