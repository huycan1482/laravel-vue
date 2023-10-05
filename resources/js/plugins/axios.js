// apiCaller.js
import axios from 'axios';
import store from "../store/modules/auth"
import router from '../router/index';
import axiosInstance from "../plugins/instAxios";
import AuthService from '../services/AuthService';


const apiCaller = () => {
    // const store = useStore();
    // Tạo một instance mới của Axios
    // const instance = axios.create({
    //     baseURL: store.state.app.baseUrl, // Thay thế bằng base URL của API bạn muốn gọi
    // });
    // console.log();
    // Tạo interceptor cho yêu cầu trước khi gửi
    axiosInstance.interceptors.request.use(
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


    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        async(error) => {
            const originalRequest = error.config;
            if ( error.response.status === 403 && originalRequest.url.includes("/api/auth/refresh-token") ) {
                console.log("DH 1")
                // store.commit("CLEAR_AUTH");
                // store.actions.clearAuth();
                router.push("/login");
                return Promise.reject(error);
            } else if (error.response.status === 403 && !originalRequest._retry) {
                console.log("DH 2")

                const data = await axiosInstance.post('/api/auth/refresh-token', {'refreshToken' : store.state.auth.refreshToken})
                .then(function (response) {
                    console.log("DH data", response.data)
                    AuthService.saveToken(response.data.data.accessToken) 
                    AuthService.saveRefreshToken(response.data.data.refreshToken) 
                    store.state.auth.accessToken = response.data.data.accessToken
                    store.state.auth.refreshToken = response.data.data.refreshToken

                    originalRequest._retry = true;

                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.data.accessToken;
                    // console.log("DH data", response.data.data.accessToken)
                    console.log("DH router", window.location.pathname);

                    // router.replace(window.location.pathname);

                    window.location.reload();
                    

                    console.log("DH router run");

                    // router.go(1);

                    // return axiosInstance(originalRequest);

                    // return new Promise(resolve => {
                    //     subscribeTokenRefresh(token => {
                    //       originalRequest.headers.Authorization = `Bearer ${token}`;
                    //       resolve(axios(originalRequest));
                    //     });
                    //   });
                })
                .catch(function (error) {
                    console.log(123,error);
                })

                console.log("DH 3")

            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default apiCaller;
