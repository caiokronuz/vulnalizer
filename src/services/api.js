import axios from 'axios'

const api = axios.create({
    baseURL: "http://167.114.135.109/"
})

export default api;