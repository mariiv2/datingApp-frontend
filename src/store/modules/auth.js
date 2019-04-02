import {AUTH_REQUEST} from "../constants";
import {AXIOS} from '../../components/pages/http-config'

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST, user);
            resolve()
        })
    }
};

const mutations = {
    [AUTH_REQUEST]: (state, user) => {
        let data = 'username='+user.username+'&password='+user.password;
        let headers = {
            'Content-type': 'application/x-www-form-urlencoded'
        };
        AXIOS.post('/login', data, {
            headers: headers
        })
            .then(response => {
                localStorage.setItem('token', response.headers.authorization);
                AXIOS.defaults.headers.common['Authorization'] = response.headers.authorization;

            }).catch(error => {
            localStorage.removeItem('token');
            AXIOS.defaults.headers.common['Authorization'] = null;
        });
    }
};

export default {
    actions,
    mutations,
}