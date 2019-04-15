<template>
    <div style="background-color: #cfbad2">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top" style="background-color: #bd1651; color: white;">
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
                            <font-awesome-icon icon="sign-out-alt" style="margin-top: 1.7vh; margin-left: 2ch"
                                               v-on:click="logOut()"/>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container align-items-center justify-content-center text-center">
            <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-4" style="background-color: #DCDCDC; padding-right: 0; padding-left: 0">
                    <a v-for="user in matches">
                        <div class="row"
                             style="max-width: 75rem; margin: 1.25rem auto; border-bottom: 1px solid #cacaca; "
                             v-on:click="getAllMessages(user)">
                            <div class="col-4" style="margin-bottom: 1vh"><img v-bind:src="user.image[0].name"
                                                                               class="favimg rounded-circle"></div>
                            <div class="col-8">
                                <div class="row">{{user.name}} {{user.surname}}</div>
                                <div class="row" style="margin-top: 2vh; color: grey">Hello! How are you?</div>
                            </div>
                        </div>
                    </a>
                    <!--<hr v-for="user in matches">-->
                </div>
                <div v-if="chatSelected" class="col-sm-6" style="background-color: #F4F4F4">
                    <div style="margin-top: 10px"></div>
                    <div v-for="m in messages">
                        <div v-if="m.fromUserId === user.id" class="row">
                            <div class="col-sm-6"></div>
                            <div class="col-sm-4">
                                <div style="background: #DCDCDC; border-radius: 5px;">
                                    <span>{{m.message}}</span>
                                </div>
                                <span style="color: grey; font-size: 10px">{{m.dateSent}}</span>
                            </div>
                            <div class="col-sm-2">
                                <img v-bind:src="user.image[0].name" class="chatimg rounded-circle">
                            </div>
                        </div>
                        <div v-else class="row">
                            <div class="col-sm-2">
                                <img v-bind:src="friend.image[0].name" class="chatimg rounded-circle">
                            </div>
                            <div class="col-sm-4">
                                <div style="background: #DCDCDC; border-radius: 5px;">
                                    <span>{{m.message}}</span>
                                </div>
                                <span style="color: grey; font-size: 10px">{{m.dateSent}}</span>

                            </div>
                            <div class="col-sm-6"></div>
                        </div>
                    </div>
                    <div class="row" style="margin-top: 3ch">
                        <div class="col-11">
                            <input type="text" class="form-control" v-model="messageView.message"
                                   placeholder="Enter your message">
                        </div>
                        <div class="col-1">
                            <a v-on:click="sendMessage">
                                <font-awesome-icon icon="paper-plane" class="fa-2x"
                                                   style="color: #bd1651; float: right;"/>
                            </a>
                        </div>

                    </div>
                </div>
                <div v-else class="col-sm-6" style="background-color: #F4F4F4">
                    <span>SELECT CHAT</span>
                </div>
                <div class="col-sm-1"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {AXIOS} from '../resources/http.config'

    export default {
        data() {
            return {
                interval: null,
                matches: [],
                chatSelected: false,
                pic: 'http://localhost:8081/anonym',
                messages: [],
                messageView: {
                    fromUserId: {},
                    toUserId: {},
                    message: ''
                },
                user: {},
                friend: {}
            }
        },

        mounted() {
            if (localStorage.getItem('token')) {
                AXIOS.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                this.getMatches();
                this.getUser();
            }
        },
        methods: {
            getUser: function () {
                AXIOS.get('/users')
                    .then(response => {
                        this.user = response.data;
                    });
            },
            getMatches: function () {
                AXIOS.get('/match/all')
                    .then(response => {
                        this.matches = response.data;
                    })
            },
            logOut: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push("DatingApp");
                    })
            },
            getAllMessages: function (friend) {
                this.friend = friend;
                this.messageView.fromUserId = this.user.id;
                this.messageView.toUserId = friend.id;
                this.chatSelected = true;
                AXIOS.get('messages/all/' + friend.id)
                    .then(response => {
                        this.messages = response.data;
                        console.log(this.messages);
                        setTimeout(function () { this.getAllMessages(friend) }.bind(this), 100)
                    })
            },
            sendMessage: function () {
                AXIOS.post('/messages', this.messageView)
                    .then(response =>
                        this.messageView.message = '');
            }
        }
    }

</script>
