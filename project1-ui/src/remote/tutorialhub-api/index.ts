import axios from 'axios'
import { lbBaseUrl } from '../../environment'


export const tutorialhubClient = axios.create({
    baseURL:lbBaseUrl,
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})