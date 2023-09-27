// import apiCaller from '../../plugins/axios';
import axios from 'axios';
import router from '../../router/index';

// const axiosInstance = apiCaller();
// const router = useRouter()

const state = {
    auth: {
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        
    },
    userLogin: {
        id: null,
        name: null,
        email: null,
    }
}

const getters = {
    isAuthenticated: state => state.auth.isAuthenticated,
    authToken: state => state.auth.token,
}

const actions = {
    async login ({commit}, data) {
        const { data: { data: { user, payload } } } = await axios.post('/api/auth/login', data);
        commit('SET_USER', user)
        commit('SET_AUTHENTICATED', payload)
        router.push({name: 'user.index'})
    }
}

const mutations = {
    SET_AUTHENTICATED (state, {accessToken, refreshToken = ''}) {
        state.auth.accessToken = accessToken
        state.auth.refreshToken = refreshToken
        state.auth.isAuthenticated = true
    },
    SET_USER (state, {email, name, id}) {
        state.userLogin.email = email
        state.userLogin.name = name
        state.userLogin.id = id
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}