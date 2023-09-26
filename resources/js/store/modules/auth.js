import { stat } from 'fs';
import apiCaller from '../../plugins/axios';

const axiosInstance = apiCaller();
 
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
    async login (data) {
        // const { data: { data: { user, payload } } } = await axiosInstance.post('/api/auth/login', data);
        const res = await axiosInstance.post('/api/auth/login', data);

        console.log("DH", res);
    }
}

const mutations = {
    SET_AUTHENTICATED (state, {accessToken, refreshToken = ''}) {
        state.auth.accessToken = accessToken
        state.auth.refreshToken = refreshToken
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