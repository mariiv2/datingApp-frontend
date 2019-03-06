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
                      <input type="text" v-model="user.email" placeholder="E-mail">
                  </div>

                  <div class="input">
                      <label>Your password</label>
                      <input type="password" v-model="user.password" placeholder="Your password">
                  </div>

                  <div class="register">
                      <input type="submit" value="Enter" class="button">
                  </div>
              </form>
          </div>
          <div v-if="signUp" class="form">
              <form>
                  <div class="nearFields clearfix">
                      <div class="firstName">
                          <label>First name</label>
                          <input type="text" v-model="user.firstName" placeholder="First name">
                      </div>
                      <div class="lastName">
                          <label>Last name</label>
                          <input type="text" v-model="user.lastName" placeholder="Last name">
                      </div>
                  </div>

                  <div class="nearFields clearfix">
                      <div class="country">
                          <label>Country</label>
                          <select v-model="user.country" class="selectOption" >
                              <option class="disabled" value="" disabled selected>Select country</option>
                              <option class="selectOption" v-for="(value, key) in Countries" :key="key">{{ key }} </option>
                          </select>
                      </div>

                      <div class="city">
                          <label>City</label>
                          <select v-model="user.city" class="selectOption">
                              <option class="disabled" value="" disabled selected>Select city</option>
                              <option class="selectOption" v-for="cities in getCities()" :key="cities" v-on:click="checkCity()">{{ cities }} </option>
                          </select>
                      </div>
                  </div>

                  <div class="gender">
                      <label>Gender</label>
                      <input type="radio" value="Female" v-model="user.gender">Female<br>
                      <input type="radio" value="Male" v-model="user.gender">Male<br>
                  </div>

                  <div class="input">
                      <label>E-mail</label>
                      <input type="text" v-model="user.email" placeholder="E-mail">
                  </div>

                  <div class="input">
                      <label>Your password</label>
                      <input type="password" v-model="user.password" placeholder="Your password">
                  </div>

                  <div class="input">
                      <label>Repeat your password</label>
                      <input type="password" v-model="user.password2" placeholder="Your password">
                  </div>

                  <div class="register">
                      <input type="submit" value="Register" class="button">
                  </div>
              </form>
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
    //import modal from './Modal.vue'

    export default {
        name: 'DatingApp',
        data () {
            return {
                logIn: false,
                signUp: false,
                user: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    password2: "",
                    gender: "",
                    city: "",
                    country: ""
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
                let country = this.user.country;
                return Countries[country]
            },
            checkCity: function() {
                let country = this.user.country;
                let city = this.user.city;
                if (!Countries[country].includes(city)) this.user.city = "";
            }
        }
    }
</script>


<style src="../style/MainStyle.css">
</style>
