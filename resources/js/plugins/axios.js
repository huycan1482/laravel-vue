// apiCaller.js
import axios from 'axios';
import store from "../store/modules/auth"
import router from '../router/index';

const apiCaller = () => {
    // const store = useStore();
    // Tạo một instance mới của Axios
    const instance = axios.create({
        baseURL: store.state.app.baseUrl, // Thay thế bằng base URL của API bạn muốn gọi
    });

    // Tạo interceptor cho yêu cầu trước khi gửi
    instance.interceptors.request.use(
        (config) => {

            if (store.state.auth.isAuthenticated) {
                // Thêm access token vào tiêu đề (header) của mỗi yêu cầu
                const accessToken = store.state.auth.accessToken; // Thay thế bằng access token thực tế của bạn

                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    instance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            const originalRequest = error.config;
            if ( error.response.status === 403 && originalRequest.url.includes("/api/auth/refresh-token") ) {
                console.log("DH 1")
                // store.commit("CLEAR_AUTH");
                // store.actions.clearAuth();
                router.push("/login");
                return Promise.reject(error);
            } else if (error.response.status === 403 && !originalRequest._retry) {
                console.log("DH 2")

                const data = instance.post('/api/auth/refresh-token', {'refreshToken' : store.state.auth.refreshToken})

                console.log("DH data", data.data)
                store.state.auth.refreshToken = data.refreshToken
                store.state.auth.accessToken = data.accessToken
                console.log("DH 3")

                originalRequest._retry = true;
                // await store.dispatch("refreshToken");
                // store.dispatch("refreshToken");
                // store.actions.refreshToken(1);

                console.log("DH 4")

                // AuthService.refreshToken();
                return axios(originalRequest);
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export default apiCaller;
