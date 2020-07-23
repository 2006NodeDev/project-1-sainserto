import axios from 'axios'
import { fmtBaseUrl } from '../../environment'


export const tutorialhubClient = axios.create({
    baseURL:fmtBaseUrl,
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})