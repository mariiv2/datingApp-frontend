<template>
    <div>
        <Header></Header>

        <div class="container align-items-center justify-content-center text-center">
            <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-4 styled">
                    <a v-for="user in matches">
                        <div class="row rowStyle1"
                             v-on:click="getAllMessages(user)">
                            <div class="col colStyle1"><img v-bind:src="user.image[0].name"
                                                              class="favimg rounded-circle"></div>
                            <div class="col">
                                <div class="row">{{user.name}} {{user.surname}}</div>
                                <div class="row rowStyle2">{{user.lastMessage}}</div>
                            </div>
                        </div>
                    </a>
                    <!--<hr v-for="user in matches">-->
                </div>
                <div v-if="chatSelected" class="col-sm-6 colored">
                    <div style="margin-top: 10px"></div>
                    <div v-for="m in messages">
                        <div v-if="m.fromUserId === user.id" class="row">
                            <div class="col">
                                <div class="colStyle2">
                                    <span>{{m.message}}</span>
                                </div>
                                <span class="span">{{m.dateSent}}</span>
                            </div>
                            <div class="col">
                                <img v-bind:src="user.image[0].name" class="chatimg rounded-circle">
                            </div>
                        </div>
                        <div v-else class="row">
                            <div class="col">
                                <img v-bind:src="friend.image[0].name" class="chatimg rounded-circle">
                            </div>
                            <div class="col">
                                <div class="colStyle2">
                                    <span>{{m.message}}</span>
                                </div>
                                <span class="span">{{m.dateSent}}</span>

                            </div>
                            <div class="col-sm-6"></div>
                        </div>
                    </div>
                    <div class="row rowStyle3">
                        <div class="col-11">
                            <input type="text" class="form-control" v-model="messageView.message"
                                   placeholder="Enter your message">
                        </div>
                        <div class="col-1" v-if="messageView.message !== ''">
                            <a v-on:click="sendMessage">
                                <font-awesome-icon icon="paper-plane" class="fa-2x"/>
                            </a>
                        </div>

                    </div>
                </div>
                <div v-else class="col-sm-6 colored">
                    <span>SELECT CHAT</span>
                </div>
                <div class="col-sm-1"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {AXIOS} from '../resources/http.config'
    import Header from '../navigation/Header.vue'

    export default {
        components: {
            Header
        },
        data() {
            return {
                interval: null,
                matches: [],
                unseen: [],
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
                    });
                AXIOS.get('/match/unseen')
                    .then(response => {
                        this.unseen = response.data();
                        console.log(this.unseen)
                    })
            },
            logOut: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push("DatingApp");
                    })
            },
            getAllMessages: function (friend) {
                if (this.friend !== friend) {
                    clearTimeout(this.interval);
                }
                this.friend = friend;
                this.messageView.fromUserId = this.user.id;
                this.messageView.toUserId = friend.id;
                this.chatSelected = true;
                AXIOS.get('messages/all/' + friend.id)
                    .then(response => {
                        this.messages = response.data;
                        console.log(this.messages);
                        this.interval = setTimeout(function () {
                            this.getAllMessages(friend)
                        }.bind(this), 100)
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

<style scoped>
    .styled {
        background-color: #DCDCDC;
        padding-right: 0;
        padding-left: 0
    }

    .rowStyle1 {
        max-width: 75rem !important;
        margin: 1.25rem auto !important;
        border-bottom: 1px solid #cacaca;
    }

    .rowStyle2 {
        margin-top: 2vh !important;
        color: grey
    }

    .rowStyle3 {
        margin-top: 3ch !important;
    }

    .colStyle1 {
        margin-bottom: 1vh !important;
    }

    .colored {
        background-color: #F4F4F4;
    }

    .colStyle2 {
        background: #DCDCDC;
        border-radius: 5px;
    }

    .fa-2x {
        color: #bd1651;
        float: right;
    }

    .span {
        color: grey;
        font-size: 10px
    }
</style>