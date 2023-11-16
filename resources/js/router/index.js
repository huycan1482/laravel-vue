import { createRouter, createWebHistory } from "vue-router"

import store from "../store/modules/auth"
import AppLogin from "../components/auth/AppLogin.vue"
import AppLayout from "../components/layouts/AppLayout.vue"

import UserApp from "../components/users/UserApp.vue"
import UserList from "../components/users/UserList.vue"
import UserCreate from "../components/users/UserCreate.vue"
import UserEdit from "../components/users/UserEdit.vue"

const routes = [
	{ path: '/', component: AppLayout, meta: { requiresAuth: true }, children: [
		{ path: 'setting/user', component: () => import ('../components/setting/UserSetting.vue'), name: 'setting.user' },
		{ path: 'users', component: UserApp, children: [
			// component: () => import('../views/FormInfo'),
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
		{ path: 'category', component: () => import ('../components/category/CategoryApp.vue'), children: [
			{ path: '', component: () => import ('../components/category/CategoryList.vue'), name: 'category.index' },
			{ path: 'create', component: () => import ('../components/category/CategoryCreate.vue'), name: 'category.create' },
			{ path: 'edit/:id', component: () => import ('../components/category/CategoryEdit.vue'), name: 'category.edit', props: true },
		]},
		{ path: 'chats', component: () => import ('../components/chat/ChatApp.vue'), children: [
			{ path: '', component: () => import ('../components/chat/ChatList.vue'), name: 'chat.index' },
		]},
		{ path: 'messages', component: () => import ('../components/message/MessageApp.vue'), children: [
			{ path: '', component: () => import ('../components/message/MessageList.vue'), name: 'message.index' },
		]},
	]},
	{ path: '/login', component: AppLogin, name: 'auth.login'},
]

const route = createRouter({
	history: createWebHistory(),
	routes
})

route.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
		// Kiểm tra xem người dùng đã đăng nhập hay chưa
		if (store.state.auth.isAuthenticated) {
		  	next(); // Cho phép truy cập
		} else {
			// Chuyển hướng đến trang đăng nhập
			next('/login');
		}
	} else {
		next(); // Cho phép truy cập
	}
});

export default route