import axios from 'axios'

export const resetClient = axios.create({
    baseURL: process.env.REACT_APP_RESET_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

resetClient.interceptors.request.use((response) => response, (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
})