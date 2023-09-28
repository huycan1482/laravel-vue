import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

const AuthService = {
    saveToken(token) {
        cookies.set(TOKEN_KEY, token);
    },
    
    getToken : cookies.get(TOKEN_KEY),

    removeToken() {
        cookies.set(TOKEN_KEY);
    },

    saveRefreshToken(token) {
        cookies.set(REFRESH_KEY, token);
    },

    getRefreshToken: cookies.get(REFRESH_KEY),

    removeRefreshToken() {
        cookies.set(REFRESH_KEY);
    },

    isAuthenticated : cookies.get(TOKEN_KEY) ? true : false,
};

export default AuthService;

// const saveToken = (token) => {
//     cookies.set(TOKEN_KEY, token)
// }

// const getToken = () => {
//     return cookies.get(TOKEN_KEY)
// } 

// const removeToken = () => {
//     cookies.set(TOKEN_KEY);
// }

// const saveRefreshToken = (token) => {
//     cookies.set(REFRESH_KEY, token)
// }

// const getRefreshToken = () => {
//     return cookies.get(REFRESH_KEY)
// } 

// const removeRefreshToken = () => {
//     cookies.set(REFRESH_KEY)
// }

// const isAuthenticated = () => {
//     return cookies.get(TOKEN_KEY) ? true : false
// }

// export default {
//     saveToken,
//     getToken,
//     removeToken,
//     saveRefreshToken,
//     getRefreshToken,
//     removeRefreshToken,
//     isAuthenticated,
// }