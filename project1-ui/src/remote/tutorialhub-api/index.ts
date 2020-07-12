import axios from 'axios'

export const tutorialhubClient = axios.create({
    baseURL:'http://localhost:2006',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})