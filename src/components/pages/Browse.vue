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
            <div>
                <div class="imageContainer">
                    <img style="border: 15px solid #f93d7b;" src="../images/eva.png" />
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
                            <td class="capitalize">AGE:</td>
                            <td>21</td>
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
                            <td class="decorated">BIO</td>
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
            <div class="likeDislikeButtons">
                <button class="dislike">DISLIKE</button>
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
                id: 1
            }
        },
        created: function() {
            this.getUser()
        },
        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
        methods: {
            getUser: function () {
                AXIOS.get('/users/' + this.id)
                    .then(response => {
                        this.user = response.data
                    })
            },
            toLike: function () {
                this.user.likes = this.user.likes + 1;
                AXIOS.put('/users', this.user
            )}
        }
    }
</script>

<style src="../style/MainStyle.css">
</style>
