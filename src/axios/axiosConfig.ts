import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_URL_API,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

//Config request
axiosInstance.interceptors.request.use(config => {
    const token = Cookies.get('at');
    if (token && !config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
},
    error => {
        return Promise.reject(error);
    }
)

//Hàm lấy token mới
const getNewToken = async (refreshToken: string) => {
    const newToken = await axiosInstance.get('/auth/refresh-token', {
        headers: {
            Authorization: `Bearer ${refreshToken}`
        }
    })
    return newToken.data
}

axiosInstance.interceptors.response.use(response => {
    return response.data
},
    async (error) => {
        const refreshToken = Cookies.get('rt')
        const originalRequest = error.config;
        if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true
            const { access_token } = await getNewToken(refreshToken)
            Cookies.set('at', access_token)
            originalRequest.headers['Authorization'] = `Bearer ${access_token}`
            return axiosInstance(originalRequest);
        } else if ((error.response.status === 401 && originalRequest._retry) || (error.response.status === 401 && !refreshToken && Cookies.get('user'))) {
            Cookies.remove('at')
            Cookies.remove('rt')
            Cookies.remove('user')
            alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại')
            window.location.reload();
        } else {
            return Promise.reject(error.response.data);
        }
    }
)

export default axiosInstance;
