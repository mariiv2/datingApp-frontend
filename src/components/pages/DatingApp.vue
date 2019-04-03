<template>
    <div>
        <div class="row">
            <div class="col-sm text-center" style="margin-top: 20px">
                <span style="font-weight: bold">WELCOME TO DATING APP</span>
            </div>
        </div>
        <div class="container align-items-center justify-content-center text-center">
            <div>
                <div>
                    <error-modal v-show="errorModal" :errors="error" @close="closeErrorModal"></error-modal>
                </div>
            </div>
            <div class="row">
                <div class="col-sm" style="margin-top: 5vh">
                    <button v-on:click="getLogIn" style="border: none; outline: none;" ref="logIn">LOG IN</button>
                    <button v-on:click="getSignUp" style="outline: none; border: none" ref="signUp">SIGN UP</button>
                </div>
            </div><hr>
            <div v-if="logIn" class="row align-items-center justify-content-center text-left">
                <form>
                    <div class="form-group">
                        <label>Email address</label>
                        <input v-model="userLogIn.username" type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
                        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="userLogIn.password" type="password" class="form-control" placeholder="Password">
                    </div>
                    <button class="btn" v-on:click="enter" style="background-color: #bd1651; color: white; border-radius: 5px">Enter</button>
                </form>
            </div>
            <div v-if="signUp" class="row align-items-center justify-content-center text-left">
                <form class="needs-validation" novalidate>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">First name</label>
                            <input type="text" class="form-control" placeholder="First name" v-model="userRegister.name" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Last name</label>
                            <input type="text" class="form-control" placeholder="Last name" v-model="userRegister.surname" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Email</label>
                            <input type="email" class="form-control" placeholder="Email" v-model="userRegister.email" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Your birthday</label>
                            <input type="date"  data-date-format="YYYY-MM-DD" placeholder="yyyy-mm-dd" v-model="userRegister.birth" required>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Gender</label>
                            <input type="radio" value="FEMALE"  v-model="userRegister.gender">Female
                            <input type="radio" value="MALE" v-model="userRegister.gender">Male<br>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Country</label>
                            <select v-model="userRegister.country">
                                <option class="disabled" value="" disabled selected>Select country</option>
                                <option class="selectOption" v-for="(value, key) in Countries" :key="key">{{ key }} </option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">City</label>
                            <select v-model="userRegister.city" class="selectOption smallInput">
                                <option class="disabled" value="" disabled selected>Select city</option>
                                <option class="selectOption" v-for="cities in getCities()" :key="cities" v-on:click="checkCity()">{{ cities }} </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Password</label>
                            <input type="password" v-model="userRegister.password" placeholder="Your password">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Repeat password</label>
                            <input type="password" v-model="userRegister.password2" placeholder="Repeat your password">
                        </div>
                    </div>
                    <button class="btn" v-on:click="register" style="background-color: #bd1651; color: white; border-radius: 5px">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import {AXIOS} from './http-config'
    import errorModal from './ErrorModal.vue'
    import Countries from '../resources/countries.json'
    import {AUTH_REQUEST} from '../../store/constants.js'

    export default {
        // app initial state
        components: {
            errorModal,
        },
        computed: {
            send: function() {
                return this.error
            }
        },
        data() {
            return {
                logIn: false,
                signUp: false,
                error: [],
                user: {},
                errorModal: false,
                userLogIn: {
                    username: "",
                    password: ""
                },
                userRegister: {
                    name: "",
                    surname: "",
                    email: "",
                    password: "",
                    password2: "",
                    gender: "",
                    city: "",
                    country: "",
                    birth: "",
                },
                Countries
            }


        },
        methods: {
            getLogIn: function () {
                this.logIn = true;
                this.signUp = false;
                this.$refs.logIn.setAttribute("style", "font-weight:bold; outline: none; border: none");
                this.$refs.signUp.setAttribute("style", "font-weight:normal; outline: none; border: none");
            },
            getSignUp: function () {
                this.logIn = false;
                this.signUp = true;
                this.$refs.logIn.setAttribute("style", "font-weight:normal; outline: none; border: none");
                this.$refs.signUp.setAttribute("style", "font-weight:bold; outline: none; border: none");
            },
            getCities: function() {
                let country = this.userRegister.country;
                return Countries[country]
            },
            checkCity: function() {
                let country = this.userRegister.country;
                let city = this.userRegister.city;
                if (!Countries[country].includes(city)) this.userRegister.city = "";
            },
            register: function() {
                this.error = [];
                AXIOS.post('/', this.userRegister)
                    .then(response => {
                        this.user = response.data;
                        this.$router.push('Profile')
                    }).catch(error => {
                    this.error = error.response.data.errors;
                    this.errorModal = true;
                });
            },
            enter: function() {
                this.$store.dispatch(AUTH_REQUEST, this.userLogIn).then(() => {
                });
            },
            closeErrorModal: function() {
                this.errorModal = false;
            }
        }
    }
</script>

<style src="../style/MainStyle.css">
</style>
