<template>
  <div id="page">
      <div class="container" id="main">
          <div class="welcome">
              <h1>Welcome to Dating App</h1>
          </div>
          <div class="signUpLogIn clearfix">
              <button class="login" v-on:click="showLogInForm">Log in</button>
              <button class="signup" v-on:click="showSignUpForm">Sign up</button>
          </div>
          <div v-if="logIn" class="form">
              <form>
                  <div class="input">
                      <label>E-mail</label>
                      <input type="text" v-model="userLogIn.email" class="bigInput" placeholder="E-mail">
                  </div>

                  <div class="input">
                      <label>Your password</label>
                      <input type="password" v-model="userLogIn.password" class="bigInput" placeholder="Your password">
                  </div>
              </form>

              <div class="register">
                  <button v-on:click="enter" class="button">Enter</button>
              </div>

          </div>
          <div v-if="signUp" class="form">
              <form>
                  <div class="nearFields clearfix">
                      <div class="firstName">
                          <label>First name</label>
                          <input type="text" class="smallInput" v-model="userRegister.name" placeholder="First name">
                      </div>
                      <div class="lastName">
                          <label>Last name</label>
                          <input type="text" class="smallInput" v-model="userRegister.surname" placeholder="Last name">
                      </div>
                  </div>

                  <div class="input">
                      <label>Your birthday</label>
                      <input type="date"  data-date-format="YYYY-MM-DD" class="bigInput" v-model="userRegister.birth" placeholder="yyyy-mm-dd">
                  </div>

                  <div class="nearFields clearfix">
                      <div class="country">
                          <label>Country</label>
                          <select v-model="userRegister.country" class="selectOption smallInput" >
                              <option class="disabled" value="" disabled selected>Select country</option>
                              <option class="selectOption" v-for="(value, key) in Countries" :key="key">{{ key }} </option>
                          </select>
                      </div>

                      <div class="city">
                          <label>City</label>
                          <select v-model="userRegister.city" class="selectOption smallInput">
                              <option class="disabled" value="" disabled selected>Select city</option>
                              <option class="selectOption" v-for="cities in getCities()" :key="cities" v-on:click="checkCity()">{{ cities }} </option>
                          </select>
                      </div>
                  </div>

                  <div class="gender">
                      <label>Gender</label>
                      <input type="radio" value="FEMALE" class="styled" v-model="userRegister.gender">Female<br>
                      <input type="radio" value="MALE" class="styled" v-model="userRegister.gender">Male<br>
                  </div>

                  <div class="input">
                      <label>E-mail</label>
                      <input type="text" class="bigInput"  v-model="userRegister.email" placeholder="E-mail">
                  </div>

                  <div class="input">
                      <label>Your password</label>
                      <input type="password" class="bigInput" v-model="userRegister.password" placeholder="Your password">
                  </div>

                  <div class="input">
                      <label>Repeat your password</label>
                      <input type="password"  class="bigInput" v-model="userRegister.password2" placeholder="Your password">
                  </div>
              </form>

              <div class="register">
                  <button v-on:click="register" class="button">Register</button>
              </div>

          </div>
          <div>
              <div>
                  <error-modal v-show="errorModal" :errors="error" @close="closeErrorModal"></error-modal>
              </div>
          </div>
      </div>
      <footer>
          <div class="wrapper">
              <div class="menu">
                  <a class="footerLink">About</a>
                  <a class="footerLink">Press</a>
                  <a class="footerLink">Blog</a>
                  <a class="footerLink">Privacy</a>
                  <a class="footerLink">Terms</a>
              </div>
          </div>
      </footer>
  </div>
</template>

<script>
    import Countries from '../resources/countries.json'
    import {AXIOS} from './http-config'
    import errorModal from './ErrorModal.vue'

    export default {
        name: 'DatingApp',
        components: {
            errorModal,
        },
        computed: {
            send: function() {
                return this.error
            }
        },
        data () {
            return {
                logIn: false,
                signUp: false,
                error: [],
                user: {},
                errorModal: false,
                userLogIn: {
                    email: "",
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
            showLogInForm: function() {
                this.logIn = true;
                this.signUp = false;
            },
            showSignUpForm: function() {
                this.logIn = false;
                this.signUp = true;
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
                        this.$router.push('Home')
                    }).catch(error => {
                        this.error = error.response.data.errors;
                        this.errorModal = true;
                });
            },
            enter: function() {
                this.error = [];
                AXIOS.post('/login', this.userLogIn)
                    .then(response => {
                        this.user = response.data;
                        this.$router.push('Home')
                    }).catch(error => {
                        let err = {
                            defaultMessage: error.response.data['message']
                        };
                        this.error.push(err);
                        this.errorModal = true;
                });
            },
            closeErrorModal: function() {
                this.errorModal = false;
            },
        }
    }
</script>


<style src="../style/MainStyle.css">
</style>
