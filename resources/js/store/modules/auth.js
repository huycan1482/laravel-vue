// import apiCaller from '../../plugins/axios';
import axios from 'axios';
import VueCookies from 'vue3-cookies';
import router from '../../router/index';
import AuthService from '../../services/AuthService';
// const axiosInstance = apiCaller();
// const router = useRouter()

const state = {
    auth: {
        isAuthenticated: AuthService.isAuthenticated,
        accessToken: AuthService.getToken,
        refreshToken: AuthService.getRefreshToken,
        
    },
    userLogin: {
        id: AuthService.getUserId,
        name: AuthService.getUserName,
        email: AuthService.getUserMail,
        // id: null,
        // name: null,
        // email: null,
    },
    app: {
        baseUrl: 'http://laravel-vue.com'
    },
}

const getters = {
    isAuthenticated: state => state.auth.isAuthenticated,
    authToken: state => state.auth.token,
    authInfo: state => state.userLogin,
}

const actions = {
    async login ({commit}, data) {
        const { data: { data: { user, payload } } } = await axios.post('/api/auth/login', data);
        commit('SET_USER', user)
        commit('SET_AUTHENTICATED', payload)

        router.push({name: 'user.index'})
    },

    async refreshToken ({commit, state}) {
        
        const input = {'refreshToken' : state.auth.refreshToken}
        const { data: data } = await axios.post('/api/auth/refresh-token', input);
        commit('SET_AUTHENTICATED', data)
    },

    clearAuth () {
        AuthService.clearAuth()
    }
}

const mutations = {
    SET_AUTHENTICATED (state, {accessToken, refreshToken = ''}) {
        state.auth.accessToken = accessToken
        state.auth.refreshToken = refreshToken
        state.auth.isAuthenticated = true

        AuthService.saveToken(accessToken)
        AuthService.saveRefreshToken(refreshToken)
    },
    SET_USER (state, {email, name, id}) {
        state.userLogin.email = email
        state.userLogin.name = name
        state.userLogin.id = id

        AuthService.saveUserAuth({email, name, id})
    },
    CLEAR_AUTH () {
        AuthService.clearAuth()
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}