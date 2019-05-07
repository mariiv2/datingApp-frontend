import axios from 'axios'

export const AXIOS = axios.create({
  baseURL: 'http://localhost:8081',
  //baseURL: 'http://ec2-3-92-136-160.compute-1.amazonaws.com:8081',
    responseType: 'json'
});
