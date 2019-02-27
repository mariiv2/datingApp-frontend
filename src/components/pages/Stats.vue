<template>
    <div id="page">
        <nav>
            <div class="wrapper">
                <div class="menu">
                    <router-link to="/home" class="link">Home</router-link>
                    <router-link to="/chat" class="link" id="active">Chats</router-link>
                    <router-link to="/profile" class="link">My Profile</router-link>
                    <router-link to="/browse" class="link">Browse</router-link>
                    <router-link to="/stats" class="link">Stats</router-link>
                    <img src="../images/gear.png"/>
                </div>
            </div>
        </nav>

        <div class="container">
            <h1>STATS</h1>

            <div style="display: flex">

                <table class="tableDesign" style="width:45%">
                    <caption>Gender proportion</caption>
                    <tr class="tableDesign">
                        <th class="tableDesign thTdDesign">FEMALE</th>
                        <th class="tableDesign thTdDesign">MALE</th>
                    </tr>
                    <tr class="tableDesign">
                        <td class="tableDesign thTdDesign">{{ user[0] }}</td>
                        <td class="tableDesign thTdDesign">{{ user[1] }}</td>
                    </tr>
                </table>

                <table class="tableDesign" style="width:45%; margin-left: 10px">
                    <caption>Most likeable users</caption>
                    <tr class="tableDesign">
                        <th class="tableDesign thTdDesign">PHOTO</th>
                        <th class="tableDesign thTdDesign">NAME</th>
                        <th class="tableDesign thTdDesign">LIKES</th>
                    </tr>
                    <tr v-for="mostLikeableUser in mostLikeableUsers" class="tableDesign">
                        <td class="tableDesign thTdDesign">{{ }}</td>
                        <td class="tableDesign thTdDesign">{{ mostLikeableUser.name}}</td>
                        <td class="tableDesign thTdDesign">{{ mostLikeableUser.likes}}</td>
                    </tr>
                </table>

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

    /* eslint-disable */
    import {AXIOS} from './http-config'

    export default {
        name: 'stats',
        props: {
            activeUser: Object
        },
        // app initial state
        data() {
            return {
                info: [],
                editMode: false,
                user: {},
                mostLikeableUsers: [],
                id: 1
            }
        },
        created: function () {
            this.getMostLikeableUsers();
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

            getUser: function () {
                AXIOS.get('/stats/')
                    .then(response => {
                        this.user = response.data;
                        console.log(response.data)
                    })
            },

            getMostLikeableUsers: function () {
                AXIOS.get('/stats/likes')
                    .then(response => {
                        this.mostLikeableUsers = response.data;
                        console.log(response.data)
                    })
            }
        }
    }
</script>


<style src="../style/MainStyle.css" scoped>
</style>