<template>
    <form class="needs-validation" novalidate>
        <div class="form-row">
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">First name</label>
                <input type="text" class="form-control" placeholder="First name" v-model="userRegister.name" required>
                <span class="text-danger small-text" v-if="loaded">{{this.errors['name']}}</span>
            </div>
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">Last name</label>
                <input type="text" class="form-control" placeholder="Last name" v-model="userRegister.surname" required>
                <span class="text-danger small-text">{{this.errors['surname']}}</span>
            </div>
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">Email</label>
                <input type="email" class="form-control" placeholder="Email" v-model="userRegister.email" required>
                <span class="text-danger small-text">{{this.errors['email']}}</span>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">Your birthday</label>
                <input type="date" data-date-format="YYYY-MM-DD" placeholder="yyyy-mm-dd" v-model="userRegister.birth"
                       required>
                <span class="text-danger small-text">{{this.errors['birth']}}</span>
            </div>
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">Gender</label>
                <input type="radio" value="FEMALE" v-model="userRegister.gender">Female
                <input type="radio" value="MALE" v-model="userRegister.gender">Male<br>
                <span class="text-danger small-text">{{this.errors['gender']}}</span>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">Country</label>
                <select v-model="userRegister.country">
                    <option class="disabled" value="" disabled selected>Select country</option>
                    <option class="selectOption" v-for="(value, key) in Countries" :key="key">{{ key }}</option>
                </select>
                <span class="text-danger small-text">{{this.errors['country']}}</span>
            </div>
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">City</label>
                <select v-model="userRegister.city" class="selectOption smallInput">
                    <option class="disabled" value="" disabled selected>Select city</option>
                    <option class="selectOption" v-for="cities in getCities()" :key="cities" v-on:click="checkCity()">{{
                        cities }}
                    </option>
                </select>
                <span class="text-danger small-text">{{this.errors['city']}}</span>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">Password</label>
                <input type="password" v-model="userRegister.password" placeholder="Your password">
                <span class="text-danger small-text">{{this.errors['password']}}</span>
            </div>
            <div class="col-md-4 mb-3">
                <label style="font-weight: bold">Repeat password</label>
                <input type="password" v-model="userRegister.password2" placeholder="Repeat your password">
            </div>
        </div>
        <span class="text-danger small-text"></span>
        <div class="w-100"></div>
        <button class="btn" v-on:click="register" style="background-color: #bd1651; color: white; border-radius: 5px">
            Register
        </button>
    </form>
</template>

<script>
    import Countries from '../resources/countries.json'

    export default {
        name: "Registration",
        computed: {
            send: function () {
                return this.error
            }
        },
        data() {
            return {
                loaded: false,
                error: [],
                errors: {},
                user: {},
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
            getCities: function () {
                let country = this.userRegister.country;
                return Countries[country]
            },
            checkCity: function () {
                let country = this.userRegister.country;
                let city = this.userRegister.city;
                if (!Countries[country].includes(city)) this.userRegister.city = "";
            },
            register: function () {
                this.error = [];
                this.errors = [];
                this.$store.dispatch('register', this.userRegister)
                    .then(() => {
                        this.userLogIn.username = this.userRegister.email;
                        this.userLogIn.password = this.userRegister.password;
                        this.enter();

                    }).catch(error => {
                        console.log(error.response)
                    this.error = error.response.data;
                    console.log(this.error)
                    for (let e in this.error) {
                        this.errors[this.error[e].field] = this.error[e].defaultMessage;

                    }
                    console.log(this.errors);
                    this.loaded = true;
                    console.log(this.errors['name'])
                });
            },
            updateErrors: function () {
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

<style scoped>

</style>