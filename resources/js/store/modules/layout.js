import {v4 as uuid} from 'uuid'

const state = {
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
                navItem.active = !navItem.active;
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