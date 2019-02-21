import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: 'http://localhost:8081',
    responseType: 'json',
    // headers: {
    //     'Accept': '*/*',
    //     'Content-Type': '*/*',
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
    // }
})
