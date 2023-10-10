// apiCaller.js
import store from "../store/modules/auth"
import router from '../router/index';
import axios from "axios";
import AuthService from '../services/AuthService';


const apiCaller = () => {
    // const store = useStore();
    // Tạo một instance mới của Axios
    const instance = axios.create({
        baseURL: store.state.app.baseUrl, // Thay thế bằng base URL của API bạn muốn gọi
    });
    // console.log();
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
        async(error) => {
            const originalRequest = error.config;
            if ( error.response.status === 403 && originalRequest.url.includes("/api/auth/refresh-token") ) {
                // store.commit("CLEAR_AUTH");
                // store.actions.clearAuth();
                router.push("/login");
                return Promise.reject(error);
            } else if (error.response.status === 403 && !originalRequest._retry) {

                const data = await instance.post('/api/auth/refresh-token', {'refreshToken' : store.state.auth.refreshToken})
                .then(function (response) {
                    AuthService.saveToken(response.data.data.accessToken) 
                    AuthService.saveRefreshToken(response.data.data.refreshToken) 
                    store.state.auth.accessToken = response.data.data.accessToken
                    store.state.auth.refreshToken = response.data.data.refreshToken

                    originalRequest._retry = true;
                    window.location.reload();

                    // return axiosInstance(originalRequest);

                    // return new Promise(resolve => {
                    //     subscribeTokenRefresh(token => {
                    //       originalRequest.headers.Authorization = `Bearer ${token}`;
                    //       resolve(axios(originalRequest));
                    //     });
                    //   });
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default apiCaller;
