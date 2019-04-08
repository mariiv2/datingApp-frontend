<template>
    <div>
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
        <div v-if="loaded" class="container" style="margin-top: 5vh;">
            <div class="row">
                <div v-if="!noUsersLeft" class="col-sm-7 border" style="background-color: #F4F4F4; border-radius: 5px; border: #3b2b49">
                    <div class="row" style="margin-top: 5vh">
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
                            <div class="row" style="margin-top: 2vh;" >
                                <div class="col-sm">
                                    <label style="font-weight: bold; color: #bd1651">{{matchingPercentage}}%</label>
                                    <font-awesome-icon icon="hand-holding-heart" class="fa-2x" style="color: #bd1651"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm text-left">
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
                        </div>
                    </div>
                    <div class="row" style="margin-bottom: 5vh">
                        <div class="col-sm"></div>
                        <div class="col-sm" style="margin-top: 2vh">
                            <a v-on:click="getChoiceDislike"style="margin-right: 7ch">
                                <font-awesome-icon icon="thumbs-down" class="fa-4x" style="color: #bd1651"/>
                            </a>
                            <a v-on:click="getChoiceLike">
                                <font-awesome-icon icon="thumbs-up" class="fa-4x" style="color: #bd1651"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div v-else class="col-sm-7">
                    NO MORE USERS
                </div>
                <div class="col-sm-1"></div>
                <div class="col-sm-4" style="background-color: #F4F4F4; border-radius: 5px">
                    <div class="row" style="margin-top: 5vh">
                        <div class="col-sm text-right">
                            <a>
                                <font-awesome-icon icon="filter" class="fa-2x" style="color: #bd1651"/>
                            </a>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 2vh">
                        <div class="col-sm">
                            <div class="input-group" style="background-color: #fbeeff">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" style="background-color: #fbeeff">GENDER</label>
                                </div>
                                <select class="custom-select" v-model="filter.gender">
                                    <option>MALE</option>
                                    <option>FEMALE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 2vh">
                        <div class="col-sm">
                            <div class="input-group" style="background-color: #fbeeff">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" style="background-color: #fbeeff">COUNTRY</label>
                                </div>
                                <select class="custom-select" v-model="filter.country">
                                    <option v-for="(value, key) in Countries" :key="key">{{key}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 2vh">
                        <div class="col-sm">
                            <div class="input-group" style="background-color: #fbeeff">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" style="background-color: #fbeeff">CITY</label>
                                </div>
                                    <select class="custom-select" v-model="filter.city">
                                        <option v-for="cities in getCities()" :key="cities" v-on:click="checkCity()">
                                            {{cities}}
                                        </option>
                                    </select>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 2vh; margin-bottom: 2vh">
                        <div class="col-sm">
                            <button v-on:click="getAllUsers" type="button" class="btn"
                                    style="background-color: #bd1651; color: white; border-radius: 5px">GO!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BContainer from "bootstrap-vue/src/components/layout/container";
    import {AXIOS} from './http-config'

    import Countries from '../resources/countries.json'

    export default {
        components: {BContainer},
        name: "testpage",
        data() {
            return {
                loaded:false,
                users: [],
                user: {},
                images: [],
                firstImg: {},
                otherImg: [],
                n: 0,
                country: {},
                city: {},
                gender: {},
                matchingPercentage: {},
                noUsersLeft: false,
                filter: {
                    id: null,
                    city: "Tallinn",
                    country: "Estonia",
                    gender: "MALE"
                },
                choice: {
                    fromUserId: null,
                    toUserId: {},
                    likeValue: {}
                },
                Countries
            }
        },
        mounted: function() {
            if (localStorage.getItem('token')) {
                AXIOS.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                this.getClientId();
            }
        },
        methods: {
            getCities: function() {
                let country = this.filter.country;
                return Countries[country]
            },
            checkCity: function() {
                let country = this.filter.country;
                let city = this.filter.city;
                if (!Countries[country].includes(city)) this.filter.city = "";
            },
            getChoiceLike: function() {
                this.choice.toUserId = this.user.id;
                this.choice.likeValue = 1;
                this.sendChoice();
            },
            getChoiceDislike: function() {
                this.choice.toUserId = this.user.id;
                this.choice.likeValue = 0;
                this.sendChoice();
            },
            sendChoice: function () {
                AXIOS.post('/browse/grade', this.choice);
                this.n++;
                if (this.n === this.users.length){
                    this.noUsersLeft = true;
                }
                else if(this.users.length === 0){
                    this.noUsersLeft = true;
                }
                else {
                    this.noUsersLeft = false;
                    this.getUser();
                }
            },
            setLoaded: function() {
                setTimeout(() => this.loaded= true, 500);
            },
            getAllUsers: function () {
                AXIOS.get('/browse/all/?id=' + this.filter.id
                + '&city=' + this.filter.city
                + '&country=' + this.filter.country
                + '&gender=' + this.filter.gender)
                    .then(response => {
                        this.users = response.data;
                        this.n = 0;
                        if(this.users.length === 0){
                            this.noUsersLeft = true;
                        }
                        else{
                            this.noUsersLeft = false;
                            this.getUser();
                        }
                    })
            },
            getUser: function () {
                this.user = this.users[this.n];
                this.images = this.user.image;
                this.firstImg = this.user.image[0].name;
                this.otherImg = [];
                for (let i=1; i<this.user.image.length; i++){
                    this.otherImg.push(this.user.image[i].name);
                }
                AXIOS.get('stats/matchPercentage/' + this.user.id )
                    .then(response => {
                        this.matchingPercentage = response.data;
                        this.setLoaded();
                    })
            },
            getClientId: function() {
                AXIOS.get('/browse/id')
                    .then(response => {
                        this.choice.fromUserId = response.data;
                        this.filter.id = response.data;
                        this.getAllUsers();
                    })
            },
            logOut: function() {
                localStorage.removeItem("token");
                this.$router.push("DatingApp");
            }
        }
    }
</script>
