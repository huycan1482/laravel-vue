// apiCaller.js
import axios from 'axios';
import store from "../store/modules/auth"

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
    return instance;
};

export default apiCaller;
