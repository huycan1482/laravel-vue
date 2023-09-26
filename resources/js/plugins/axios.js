// apiCaller.js
import axios from 'axios';

const apiCaller = () => {
    // Tạo một instance mới của Axios
    const instance = axios.create({
        baseURL: 'http://laravel-vue.com/', // Thay thế bằng base URL của API bạn muốn gọi
    });

    // Tạo interceptor cho yêu cầu trước khi gửi
    instance.interceptors.request.use(
        (config) => {
            // Thêm access token vào tiêu đề (header) của mỗi yêu cầu
            const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sYXJhdmVsLXZ1ZS5jb21cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2OTU3MjQ1NTAsImV4cCI6MTY5NTcyODE1MCwibmJmIjoxNjk1NzI0NTUwLCJqdGkiOiJMZU55QmM0Q1VNZ1RVTFo1Iiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.aQhHa8mbOM5qDeLmNh7epe6L4h5DFs4vlribvlIdt7Y'; // Thay thế bằng access token thực tế của bạn
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Gọi API
    const get = (url) => {
        return instance.get(url); // Thay thế bằng endpoint cụ thể bạn muốn gọi
    };

    return {
        instance,
        // get
    };
};

export default apiCaller;
