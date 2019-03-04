<template>
    <div id="page">
        <nav>
            <div class="wrapper">
                <div class="menu">
                    <router-link to="/home" class="link">Home</router-link>
                    <router-link to="/chat" class="link">Chats</router-link>
                    <router-link to="/profile" class="link" id="active">My Profile</router-link>
                    <router-link to="/browse" class="link">Browse</router-link>
                    <router-link to="/stats" class="link">Stats</router-link>
                    <img src="../images/gear.png" />
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="imageContainer">
                <!--<img style="border: 15px solid #f93d7b;" src="../images/eva.png" />-->
                <img style="border: 15px solid #f93d7b;" v-bind:src="'data:image/jpeg;base64,' + user.image"/>
                <div v-if="editMode" class="changePhoto">
                    <button class="photoButton">Change photo</button>
                </div>
            </div>
            <form method="POST" enctype="multipart/form-data" action="http://localhost:8081/users/images">
                <input type="file" name="file"/>
                <input type="submit" value="Upload"/>
            </form>
            <div class="info">
                <div class="infoBox" v-if="editMode">
                    <table class="box">
                        <tr>
                            <td class="decorated capitalize">{{user.name}}</td>
                        </tr>
                        <tr>
                            <td class="capitalize">NAME:</td>
                            <td>
                                <input class="input" type="text" v-model="user.name"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="capitalize">SURNAME:</td>
                            <td>
                                <input class="input" type="text" v-model="user.surname"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="capitalize">EMAIL:</td>
                            <td>
                                <input class="input" type="text" v-model="user.email"/>
                            </td>
                        </tr>
                        <tr>
                            <td class="capitalize">COUNTRY:</td>
                            <td>
                                <select v-model="user.country" class="selectOption">
                                    <option class="selectOption" v-for="(value, key) in Countries" :key="key">{{ key }} </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td class="capitalize">CITY:</td>
                            <td>
                                <select v-model="user.city" class="selectOption">
                                    <option class="selectOption" v-for="cities in getCities()" :key="cities" v-on:click="checkCity()">{{ cities }} </option>
                                </select>
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
                                <textarea v-model="user.bio" class="input" id="bio"></textarea>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="infoBox" v-else>
                    <table class="box">
                        <tr>
                            <td class="decorated capitalize">{{user.name}}</td>
                        </tr>
                        <tr>
                            <td class="capitalize">FULL NAME:</td>
                            <td>{{user.name}} {{user.surname}}</td>
                        </tr>
                        <tr>
                            <td class="capitalize">EMAIL:</td>
                            <td>{{user.email}}</td>
                        </tr>
                        <tr>
                            <td class="capitalize">AGE:</td>
                            <td>{{user.age}}</td>
                        </tr>
                        <tr>
                            <td class="capitalize">GENDER:</td>
                            <td>{{user.gender}}</td>
                        </tr>
                        <tr>
                            <td class="capitalize">CITY:</td>
                            <td>{{user.city}}</td>
                        </tr>
                        <tr>
                            <td class="capitalize">COUNTRY:</td>
                            <td>{{user.country}}</td>
                        </tr>
                        <tr>
                            <td class="capitalize">HOBBY:</td>
                            <td>#photography</td>
                        </tr>
                        <tr>
                            <td class="capitalize">MEMBER SINCE:</td>
                            <td>{{user.registerDate}}</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="decorated capitalize">Bio</td>
                        </tr>
                        <tr>
                            <td colspan="2">{{user.bio}}</td>
                        </tr>
                        <tr>
                            <td class="decorated">LIKES</td>
                        </tr>
                        <tr>
                            <td class="decoratedSmall">
                                <img src="../images/heart.png" class="heart"/>
                                {{user.likes}}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div v-if="!editMode" class="infoChange">
                <button v-on:click = "editHTML">EDIT</button>
            </div>
            <div v-else class="infoChange">
                <button v-on:click="saveInfo">SAVE</button>
            </div>
        </div>
        <div>
            <modal
                    v-show="isModalVisible"
                    @close="closeModal"
            />
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
    /* eslint-disable */
    import {AXIOS} from './http-config'
    import Countries from '../resources/countries.json'
    import modal from './Modal.vue'

    export default {
        name: 'profile',
        props: {
            activeUser: Object
        },
        components:{
            modal,
        },
        // app initial state
        data() {
            return {
                info: [],
                editMode: false,
                user: {},
                id: 1,
                isModalVisible: false,
                Countries
            }
        },

        created: function() {
            this.getUser();
        },
        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
        methods: {
            editHTML: function () {
                this.editMode = true
            },
            profileHTML: function () {
                this.editMode = false
            },
            saveInfo: function () {
                this.checkCity();
                //Show popup if city does not match to selected country.
                if (this.user.city === "") {
                    this.showModal();

                } else {
                    this.editMode = false;
                    AXIOS.put('/users/', this.user)
                }
            },
            getUser: function () {
                AXIOS.get('/users/' + this.id)
                    .then(response => {
                        this.user = response.data;
                        console.log(response.data)
                    })
            },
            getCities: function() {
                let country = this.user.country;

                return Countries[country]
            },
            checkCity: function() {
                let country = this.user.country;
                let city = this.user.city;
                if (!Countries[country].includes(city)) this.user.city = "";
            },
            showModal: function() {
                this.isModalVisible = true;
            },
            closeModal: function() {
                this.isModalVisible = false;
            }
        }
    }

</script>

<style src="../style/MainStyle.css">
</style>
