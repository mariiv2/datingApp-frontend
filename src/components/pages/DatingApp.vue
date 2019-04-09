<template>
    <div style="background-color: #cfbad2">
        <div class="row">
            <div class="col-sm text-center" style="margin-top: 20px">
                <span style="font-weight: bold">WELCOME TO DATING APP</span>
            </div>
        </div>
        <div class="container align-items-center justify-content-center text-center">
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
                            <span class="text-danger small-text">{{this.errorName}}</span>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Last name</label>
                            <input type="text" class="form-control" placeholder="Last name" v-model="userRegister.surname" required>
                            <span class="text-danger small-text">{{this.errorSurname}}</span>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Email</label>
                            <input type="email" class="form-control" placeholder="Email" v-model="userRegister.email" required>
                            <span class="text-danger small-text">{{this.errorEmail}}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Your birthday</label>
                            <input type="date"  data-date-format="YYYY-MM-DD" placeholder="yyyy-mm-dd" v-model="userRegister.birth" required>
                            <span class="text-danger small-text">{{this.errorBirth}}</span>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Gender</label>
                            <input type="radio" value="FEMALE"  v-model="userRegister.gender">Female
                            <input type="radio" value="MALE" v-model="userRegister.gender">Male<br>
                            <span class="text-danger small-text">{{this.errorGender}}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Country</label>
                            <select v-model="userRegister.country">
                                <option class="disabled" value="" disabled selected>Select country</option>
                                <option class="selectOption" v-for="(value, key) in Countries" :key="key">{{ key }} </option>
                            </select>
                            <span class="text-danger small-text">{{this.errorCountry}}</span>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">City</label>
                            <select v-model="userRegister.city" class="selectOption smallInput">
                                <option class="disabled" value="" disabled selected>Select city</option>
                                <option class="selectOption" v-for="cities in getCities()" :key="cities" v-on:click="checkCity()">{{ cities }} </option>
                            </select>
                            <span class="text-danger small-text">{{this.errorCountry}}</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Password</label>
                            <input type="password" v-model="userRegister.password" placeholder="Your password">
                            <span class="text-danger small-text">{{this.errorPassword}}</span>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label style="font-weight: bold">Repeat password</label>
                            <input type="password" v-model="userRegister.password2" placeholder="Repeat your password">
                        </div>
                    </div>
                    <span class="text-danger small-text">{{this.errorMain}}</span>
                    <div class="w-100"></div>
                    <button class="btn" v-on:click="register" style="background-color: #bd1651; color: white; border-radius: 5px">Register</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    import errorModal from './ErrorModal.vue'
    import Countries from '../resources/countries.json'

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
                errorEmail: null,
                errorName: null,
                errorBirth: null,
                errorCity: null,
                errorCountry: null,
                errorSurname: null,
                errorPassword: null,
                errorGender: null,
                errorMain: null,
                user: {},
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
                this.updateErrors();
                this.error = [];
                this.$store.dispatch('register', this.userRegister)
                    .then(() => {
                        this.userLogIn.username = this.userRegister.email;
                        this.userLogIn.password = this.userRegister.password;
                        this.enter();

                    }).catch(error => {
                    this.error = error.response.data;

                    for (let e in this.error){
                        console.log(this.error[e]);
                        if (this.error[e].field === "email") {
                            this.errorEmail = this.error[e].defaultMessage;
                            console.log(this.errorEmail);
                        }
                        else if (this.error[e].field === "name") {
                            this.errorName = this.error[e].defaultMessage;
                        }
                        else if (this.error[e].field === "surname") {
                            this.errorSurname = this.error[e].defaultMessage;
                        }
                        else if (this.error[e].field === "birth") {
                            this.errorBirth = this.error[e].defaultMessage;
                        }
                        else if (this.error[e].field === "gender") {
                            this.errorGender = this.error[e].defaultMessage;
                        }
                        else if (this.error[e].field === "city") {
                            this.errorCity = this.error[e].defaultMessage;
                        }
                        else if (this.error[e].field === "country") {
                            this.errorCountry = this.error[e].defaultMessage;
                        }
                        else if (this.error[e].field === "password") {
                            this.errorPassword = this.error[e].defaultMessage;
                        }
                        else {
                            this.errorMain = this.error[e].defaultMessage;
                        }
                    }
                    console.log(error.response.data);
                });
            },
            enter: function() {
                this.$store.dispatch('login', this.userLogIn)
                    .then(() => {
                        this.$router.push('Profile');
                    })
                    .catch(error => {
                        this.error = error.response;
                        console.log(this.error);
                    });
            },
            updateErrors: function() {
                this.errorEmail = null;
                this.errorName = null;
                this.errorBirth = null;
                this.errorCity = null;
                this.errorCountry = null;
                this.errorSurname = null;
                this.errorPassword = null;
                this.errorGender = null;
                this.errorMain = null;
            }
        }
    }
</script>

<style src="../style/MainStyle.css">
</style>
