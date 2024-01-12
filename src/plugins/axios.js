import axios from 'axios';

const axiosIns = axios.create({
    // You can add your headers here
    // ================================
    baseURL: 'http://localhost:8000',
    //baseURL: 'https://stage2.tbpo.net',
    // timeout: 1000,
})

axiosIns.interceptors.request.use(
    (config) => {
        let token = JSON.parse(localStorage.getItem(`token`))
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${ token }`
        }

        return config
    },

    (error) => {
        return Promise.reject(error)
    }
)

export default axiosIns
