import { createRouter, createWebHistory } from "vue-router"
import UserList from "../components/users/ListUser.vue"

const routes = [
	{ path: '/user', component: UserList },
	// { path: '/user', component: UserPage, children: [
	// 	{ path: '', component: UserList, name: 'user.index' },
	// 	{ path: 'create', component: UserCreate, name: 'user.create' },
	// 	{ path: 'edit/:id', component: UserEdit, name: 'user.edit', props: true },
	// ]},
]

const route = createRouter({
	history: createWebHistory(),
	routes
})

export default route