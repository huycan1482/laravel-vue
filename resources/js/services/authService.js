import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const TOKEN_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

const USER_ID = 'user_id';
const USER_MAIL = 'user_mail';
const USER_NAME = 'user_name';
const AuthService = {
    
    saveToken(token) {
        cookies.set(TOKEN_KEY, token, "1d");
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

    isAuthenticated : cookies.isKey(TOKEN_KEY),

    saveUserAuth({id, email, name}) {
        cookies.set(USER_ID, id);
        cookies.set(USER_MAIL, email);
        cookies.set(USER_NAME, name);
    },

    getUserId: cookies.get(USER_ID),
    getUserMail: cookies.get(USER_MAIL),
    getUserName: cookies.get(USER_NAME),

    clearAuth() {
        cookies.remove(TOKEN_KEY)
        cookies.remove(REFRESH_KEY)
        cookies.remove(USER_ID)
        cookies.remove(USER_MAIL)
        cookies.remove(USER_NAME)
    },
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