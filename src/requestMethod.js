import axios from 'axios'
import { useSelector } from 'react-redux';
import store from './redux/store';


const BASE_URL = "https://vicishop.herokuapp.com/api"
const TOKEN = ""


export const publicRequest = axios.create({
    baseURL : BASE_URL
})
export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers: {token : "beare " + TOKEN}
})