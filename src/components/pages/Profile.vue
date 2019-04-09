<template>
    <div style="background-color: #cfbad2">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top" style="background-color: #bd1651; color: white; ">
            <a class="navbar-brand" href="#">DatingApp</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar" style="background-color: #bd1651">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/profile">MY PROFILE</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/browse">BROWSE</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/chat">CHATS</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/stats">STATS</router-link>
                    </li>
                    <li>
                        <a>
                            <font-awesome-icon icon="sign-out-alt" style="margin-top: 1.7vh; margin-left: 2ch" v-on:click="logOut()"/>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div v-if="!loaded" class="container align-items-center justify-content-center" style="margin-top: 5vh;">
            <img src="../images/load3.gif"/>
        </div>
        <div v-if="loaded" class="container align-items-center justify-content-center" style="margin-top: 5vh;">
            <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-10 border" style="background-color: #F4F4F4; border-radius: 5px; border: #3b2b49">
                    <div class="row" style="margin-top: 5vh; margin-bottom: 5vh">
                        <div class="col-sm">
                            <div id="demo" class="carousel slide" data-ride="carousel">
                                <!-- Indicators -->
                                <ol class="carousel-indicators">
                                    <li data-target="#demo" v-for="(img, index) in user.image" data-slide-to="$index"></li>
                                </ol>
                                <!-- The slideshow -->
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img class="profileImage" v-bind:src="firstImg" width="100">
                                    </div>
                                    <div class="carousel-item" v-for="img in otherImg">
                                        <img class="profileImage" v-bind:src="img" width="100">
                                    </div>
                                </div>
                                <!-- Left and right controls -->
                                <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                    <span class="carousel-control-prev-icon"></span>
                                </a>
                                <a class="carousel-control-next" href="#demo" data-slide="next">
                                    <span class="carousel-control-next-icon"></span>
                                </a>
                            </div>
                            <div>
                                <input class="no-border d-none" type="file" @change="onFileChanged" id="file"/>
                                <label class="btn" style="background-color: #bd1651; color: white; border-radius: 5px; margin-top: 2vh"
                                       for="file">CHANGE PHOTO</label>
                                <p v-if="errorMode" style="color: red">{{error}}</p>
                                <p v-if="fileChosen">{{file.name}}</p>
                                <button v-if="fileChosen" @click="onUpload" type="button" class="btn"
                                        style="background-color: #bd1651; color: white; border-radius: 5px">UPLOAD</button>
                            </div>
                        </div>
                        <div class="col-sm text-left" v-if="editMode">
                            <table class="box">
                                <tr>
                                    <td></td>
                                    <td>
                                        <a><font-awesome-icon v-on:click="changeMode" icon="chevron-right" class="fa-2x" style="color: #bd1651; float: right;"/></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="capitalize">NAME:</td>
                                    <td>
                                        <input type="text" maxlength="20" v-model="user.name"/>
                                        <span class="text-danger small-text">{{this.errorName}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="capitalize">SURNAME:</td>
                                    <td>
                                        <input type="text" maxlength="20" v-model="user.surname"/>
                                        <span class="text-danger small-text">{{this.errorSurname}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="capitalize">EMAIL:</td>
                                    <td>
                                        <input type="text" maxlength="30" v-model="user.email"/>
                                        <span class="text-danger small-text">{{this.errorEmail}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="capitalize">COUNTRY:</td>
                                    <td>
                                        <select v-model="user.country" class="selectOption" v-on:click="checkCity">
                                            <option class="disabled" value="" disabled selected>Select country</option>
                                            <option class="selectOption" v-for="(value, key) in Countries" :key="key">{{ key }} </option>
                                        </select>
                                        <span class="text-danger small-text">{{this.errorCountry}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="capitalize">CITY:</td>
                                    <td>
                                        <select v-model="user.city" class="selectOption" v-on:click="checkCity">
                                            <option class="disabled" value="" disabled selected>Select city</option>
                                            <option class="selectOption" v-for="cities in getCities()" :key="cities">{{ cities }} </option>
                                        </select>
                                        <span class="text-danger small-text">{{this.errorCity}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="capitalize">HOBBY:</td>
                                    <td>
                                        <input v-model="user.hobby" class="input" type="text" placeholder="#photography"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="decorated">BIO</td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <textarea v-model="user.bio" id="bio"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-center">
                                        <button style="background-color: #bd1651; color: white; border-radius: 5px"
                                                v-on:click="saveInfo">SAVE</button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-sm text-left" v-else>
                            <div class="row">
                                <span style="font-weight: bold; font-size: 2ch">{{user.name}} {{user.surname}}, {{user.age}}</span>
                                <div class="w-100"></div>
                                <span style="font-weight: bold"></span><span>{{user.city}}, {{user.country}}</span>
                            </div>
                            <div class="row" style="margin-top: 3vh">
                                <span style="color: #bd1651; font-size: 23px">{{user.likes}}</span>
                                <font-awesome-icon icon="heart" class="fa-2x" style="color: #bd1651; margin-left: 1ch"/>
                            </div>
                            <div class="row" style="margin-top: 3vh">
                                <span style="font-weight: bold">BIO</span>
                                <div class="w-100"></div>
                                <span>{{user.bio}}</span>
                            </div>
                            <div class="row" style="margin-top: 3vh">
                                <span style="background-color: #fbeeff; border-radius: 5px;">#photography</span>
                                <span style="background-color: #fbeeff; border-radius: 5px;"> #animals</span>
                                <span style="background-color: #fbeeff; border-radius: 5px;"> #travel</span>
                            </div>
                            <div class="row" style="margin-top: 3vh">
                                <span style="font-weight: bold">MEMBER SINCE: </span><span>{{user.registerDate}}</span>
                            </div>
                            <div class="row" style="margin-top: 2vh;" >
                                <div class="col-sm">
                                    <label style="font-weight: bold; color: #bd1651">{{matchingPercentage}}%</label>
                                    <font-awesome-icon icon="hand-holding-heart" class="fa-2x" style="color: #bd1651"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-1" style="margin-right: 2ch">
                            <a v-if="!editMode">
                                <font-awesome-icon v-on:click = "editHTML" icon="user-edit" class="fa-2x"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {AXIOS} from './http-config'
    import modal from './Modal.vue'
    import Countries from '../resources/countries.json'

    export default {
        name: "Profile",
        data() {
            return {
                errorEmail: null,
                errorName: null,
                errorCity: null,
                errorCountry: null,
                errorSurname: null,
                loaded:false,
                editMode: false,
                fileChosen: false,
                changePhotoMode: false,
                errorMode: false,
                error: {},
                user: {},
                id: 1,
                firstImg: {},
                otherImg: [],
                username: "",
                file: "",
                isModalVisible: false,
                matchingPercentage: {},
                Countries
            }
        },
        components:{
            modal
        },
        mounted: function() {
            if (localStorage.getItem('token')) {
                AXIOS.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                this.getUser();
            }
        },
        methods: {
            editHTML: function () {
                this.editMode = true
            },
            changeMode: function () {
                this.editMode = false
            },
            saveInfo: function () {
                this.updateErrors();
                this.checkCity();
                //Show popup if city does not match to selected country.
                if (this.user.city === "Select city") {
                    this.showModal();

                } else {
                    console.log(this.user.name);
                    AXIOS.put('/users', this.user)
                        .then(this.getUser)
                        .catch(error => {
                            this.error = error.response.data;
                            console.log(this.error);
                            for (let e in this.error) {
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
                                else if (this.error[e].field === "city") {
                                    this.errorCity = this.error[e].defaultMessage;
                                }
                                else if (this.error[e].field === "country") {
                                    this.errorCountry = this.error[e].defaultMessage;
                                }
                            }
                        });
                }
            },
            getUser: function () {
                AXIOS.get('/users')
                    .then(response => {
                        this.user = response.data;
                        this.firstImg = this.user.image[0].name;
                        this.otherImg = [];
                        for (let i=1; i<this.user.image.length; i++){
                            this.otherImg.push(this.user.image[i].name);
                        }
                        this.username = this.user.name;
                        AXIOS.get('stats/matchPercentage/' + this.user.id )
                            .then(response => {
                                this.matchingPercentage = response.data;
                                this.setLoaded();
                                this.editMode = false;
                            });
                    });
            },
            setLoaded: function() {
                setTimeout(() => this.loaded= true, 500);
            },
            getCities: function() {
                let country = this.user.country;
                return Countries[country]
            },
            checkCity: function() {
                let country = this.user.country;
                let city = this.user.city;
                if (!Countries[country].includes(city) || city === "Select city" || country === "Select country") {
                    this.user.city = "Select city";
                }
            },
            showModal: function() {
                this.isModalVisible = true;
            },
            onFileChanged (event) {
                this.file = event.target.files[0];
                this.fileChosen= true;
            },
            onUpload() {
                this.errorMode = false;
                let fd = new FormData();

                fd.append('file', this.file);

                let config = {header : {'Content-Type' : 'multipart/form-data'}};
                AXIOS.post('/users/images', fd, config)
                    .then(this.getUser)
                    .catch(error => {
                        this.error = error.response.data[0].defaultMessage;
                        console.log(JSON.stringify(error.response.data[0].defaultMessage));
                        console.log(this.error);
                        this.errorMode = true;
                });

                this.fileChosen = false;
            },
            logOut: function() {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push("DatingApp");
                    })
            },
            updateErrors: function () {
                this.errorEmail = null;
                this.errorName = null;
                this.errorCity = null;
                this.errorCountry = null;
                this.errorSurname = null;
            }
        }
    }
</script>


