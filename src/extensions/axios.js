import axios from 'axios'

axios.defaults.baseURL = 'https://yourtestapi.com/api';

axios.interceptors.response.use(({ data }) => {
    return data
}, function (error) {
    return Promise.reject(error)
});