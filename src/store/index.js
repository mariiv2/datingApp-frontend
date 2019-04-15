import Vue from 'vue'
import Vuex from 'vuex'
import {AXIOS} from "../components/resources/http.config";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : {}
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, user){
            state.status = 'success';
            state.token = token;
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = '';
            state.token = ''
        },
    },
    actions: {
        login({commit}, authUser){
            return new Promise((resolve, reject) => {
                commit('auth_request');
                let data = 'username='+authUser.username+'&password='+authUser.password;
                let headers = {
                    'Content-type': 'application/x-www-form-urlencoded'
                };
                AXIOS.post('/login', data, {
                    headers: headers
                })
                    .then(response => {
                        const token = response.headers.authorization;
                        const user  = authUser;
                        localStorage.setItem('token', token);
                        AXIOS.defaults.headers.common['Authorization'] = token;
                        commit('auth_success', token, user);
                        resolve(response)

                    }).catch(error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    delete AXIOS.defaults.headers.common['Authorization'];
                    reject(error)
                });
            })
        },
        register({commit}, regUser){
            return new Promise((resolve, reject) => {
                commit('auth_request');
                AXIOS.post('/register', regUser)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('token');
                delete AXIOS.defaults.headers.common['Authorization'];
                resolve();
            })
        }
    },
})