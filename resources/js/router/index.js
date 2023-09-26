import { createRouter, createWebHistory } from "vue-router"

import AppLogin from "../components/auth/AppLogin.vue"

import AppLayout from "../components/layouts/AppLayout.vue"

import UserApp from "../components/users/UserApp.vue"
import UserList from "../components/users/UserList.vue"
import UserCreate from "../components/users/UserCreate.vue"
import UserEdit from "../components/users/UserEdit.vue"

const routes = [
	{ path: '/', component: AppLayout, children: [
		{ path: 'users', component: UserApp, children: [
			{ path: '', component: UserList, name: 'user.index' },
			{ path: 'create', component: UserCreate, name: 'user.create' },
			{ path: 'edit/:id', component: UserEdit, name: 'user.edit', props: true },
			// tự động truyền param thành props
			// { path: '/user', component: UserPage, children: [
			// 	{ path: '', component: UserList, name: 'user.index' },
			// 	{ path: 'create', component: UserCreate, name: 'user.create' },
			// 	{ path: 'edit/:id', component: UserEdit, name: 'user.edit', props: true },
			// ]},
		]},
	]},
	{ path: '/login', component: AppLogin, name: 'auth.login'},
]

const route = createRouter({
	history: createWebHistory(),
	routes
})

export default route