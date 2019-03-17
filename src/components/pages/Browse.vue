<template>
    <div id="page">
        <nav>
            <div class="wrapper">
                <div class="menu">
                    <router-link to="/home" class="link">Home</router-link>
                    <router-link to="/chat" class="link">Chats</router-link>
                    <router-link to="/profile" class="link">My Profile</router-link>
                    <router-link to="/browse" class="link" id="active">Browse</router-link>
                    <router-link to="/stats" class="link">Stats</router-link>
                    <img src="../images/gear.png" />
                </div>
            </div>
        </nav>
        <div class="container">
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
                <a class="carousel-control-prev" href="#demo" data-slide="prev" style="background: #f93d7b">
                    <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" href="#demo" data-slide="next" style="background: #f93d7b">
                    <span class="carousel-control-next-icon"></span>
                </a>
            </div>
                <div class="info">
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
            <div class="likeDislikeButtons">
                <button class="dislike" >DISLIKE</button>
                <button class="like" v-on:click="toLike">LIKE</button>
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
    import {AXIOS} from './http-config'
    export default {
        name: 'Browse',
        props: {
            activeUser: Object
        },
        // app initial state
        data() {
            return {
                info: [],
                editMode: false,
                user: {},
                firstImg: {},
                otherImg: [],
                n: 0,
                users: [],
                id: 1
            }
        },
        mounted: function() {
            this.getAllUsers();
        },
        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
        methods: {
            getUser: function () {
                this.user = this.users[this.n];
                console.log(this.user);
                this.firstImg = this.user.image[0].name;
                for (let i=1; i<this.user.image.length; i++){
                    this.otherImg.push(this.user.image[i].name);
                }

                // AXIOS.get('/users/' + this.id)
                //     .then(response => {
                //         this.user = response.data
                //     })
            },
            toLike: function () {
                this.n++;
                if (this.n === this.users.length){
                    this.user = {};
                }
                else {
                    this.getUser();
                }
                // this.user.likes = this.user.likes + 1;
                // AXIOS.put('/users', this.user)
            },

            getAllUsers: function () {
                AXIOS.get('/browse/all')
                    .then(response => {
                        this.users = response.data;
                        this.getUser();
                    })
            }
        }
    }
</script>

<style src="../style/MainStyle.css" scoped>
</style>
