// apiCaller.js
import axios from 'axios';

const apiCaller = () => {
    // Tạo một instance mới của Axios
    const instance = axios.create({
        baseURL: 'http://laravel-vue.com', // Thay thế bằng base URL của API bạn muốn gọi
    });

    // Tạo interceptor cho yêu cầu trước khi gửi
    instance.interceptors.request.use(
        (config) => {
            // Thêm access token vào tiêu đề (header) của mỗi yêu cầu
            const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sYXJhdmVsLXZ1ZS5jb21cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2OTU3NDE2MjIsImV4cCI6MTY5NTc0NTIyMiwibmJmIjoxNjk1NzQxNjIyLCJqdGkiOiJDaDJTeWhtejc3WnRiNkNUIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.MLsj-coDlNieBXDOBkMSOgAADCBe-mEQmRGgq_d2HvQ'; // Thay thế bằng access token thực tế của bạn
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return instance;
};

export default apiCaller;
