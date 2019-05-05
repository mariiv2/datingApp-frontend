<template>
    <div class="bg">
        <Header></Header>
        <div class="container align-items-center justify-content-center text-center base">
            <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-4 styled">
                    <a v-for="user in matches">
                        <div class="row rowStyle1" v-if="user.seen"
                             v-on:click="() => {getAllMessages(user); sendSeen(user);}">
                            <div class="col-4 colStyle1"><img
                                    v-bind:src="'data:image/jpeg;base64,' + user.image[0].name"
                                    class="favimg rounded-circle"></div>
                            <div class="col-8">
                                <div class="row">{{user.name}} {{user.surname}}</div>
                                <div class="row rowStyle2" v-if="user.lastMessage.messageSeen">
                                    {{user.lastMessage.message}}
                                </div>
                                <div class="row rowStyle2" style="font-weight: bold; color: black" v-else>
                                    {{user.lastMessage.message}}
                                </div>
                            </div>
                        </div>
                        <div class="row rowStyle1" v-else
                             style="background-color: #FFFF99"
                             v-on:click="() => {getAllMessages(user); sendSeen(user);}">
                            <div class="col-4 colStyle1"><img v-bind:src="'data:image/jpeg;base64,'+ user.image[0].name"
                                                              class="favimg rounded-circle"></div>
                            <div class="col-8">
                                <div class="row">{{user.name}} {{user.surname}}</div>
                                <div class="row rowStyle2" v-if="user.lastMessage.messageSeen">
                                    {{user.lastMessage.message}}
                                </div>
                                <div class="row rowStyle2" style="font-weight: bold;  color: black" v-else>
                                    {{user.lastMessage.message}}
                                </div>
                            </div>
                        </div>
                    </a>
                    <!--<hr v-for="user in matches">-->
                </div>
                <div ref="scroll" v-if="chatSelected"
                     class="col-sm-6 colored my-custom-scrollbar my-custom-scrollbar-primary
scrollbar-ripe-malinka"
                     v-chat-scroll="{always: false, smooth: true}">
                    <div style="margin-top: 10px"></div>
                    <div v-for="m in messages">
                        <div v-if="m.fromUserId === user.id" class="row">
                            <div class="col-sm-6"></div>
                            <div class="col">
                                <div class="colStyle3">
                                    <span>{{m.message}}</span>
                                </div>
                                <span class="span">{{m.dateSent}}</span>
                            </div>
                            <div v-if="m.myPhoto" class="col">
                                <img v-bind:src=" 'data:image/jpeg;base64,'+ user.image[0].name"
                                     class="chatimg rounded-circle">
                            </div>
                            <div class="col" v-else></div>
                        </div>
                        <div v-else class="row">
                            <div class="col" v-if="m.friendPhoto">
                                <img v-bind:src="'data:image/jpeg;base64,'+ friend.image[0].name"
                                     class="chatimg rounded-circle">
                            </div>
                            <div class="col" v-else></div>
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
                                   placeholder="Enter your message" v-on:keyup.enter="sendMessage">
                        </div>
                        <div class="col-1" v-if="messageView.message !== ''">
                            <a v-on:click="sendMessage" v-on:keyup.enter="sendMessage">
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
                intervalMain: null,
                myPhoto: true,
                friendPhoto: true,
                chatSelected: false,
                pic: 'http://localhost:8081/anonym',
                matches: [],
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
            sendSeen: function (friend) {
                AXIOS.get('/messages/' + friend.id).then(
                    console.log("here")
                )
            },
            getMatches: function () {
                AXIOS.get('/match/all')
                    .then(response => {
                        this.matches = response.data;
                        this.intervalMain = setTimeout(function () {
                            this.getMatches()
                        }.bind(this), 2000)
                    });
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
                this.friendPhoto = true;
                this.myPhoto = true;
                AXIOS.get('messages/all/' + friend.id)
                    .then(response => {
                        this.messages = response.data;
                        for (let m in this.messages) {
                            this.messages[m].dateSent = this.parseDate(this.messages[m].dateSent);
                            if (friend.id === this.messages[m].fromUserId) {
                                this.messages[m].friendPhoto = this.friendPhoto;
                                this.friendPhoto = false;
                                this.myPhoto = true;
                            }
                            else {
                                this.messages[m].myPhoto = this.myPhoto;
                                this.myPhoto = false;
                                this.friendPhoto = true;
                            }
                        }
                        this.interval = setTimeout(function () {
                            this.getAllMessages(friend)
                        }.bind(this), 2000)
                    });
            },
            sendMessage: function () {
                if (this.messageView.message !== '') {
                    AXIOS.post('/messages', this.messageView)
                        .then(response =>
                            this.messageView.message = '');
                }
            },
            parseDate: function (date) {
                date = date.toString();
                date = date.split('');
                date = date[5] + date[6] + '.' + date[8] + date[9] + ' ' + date[11] + date[12] + ':' + date[14] + date[15]
                return date
            },
            gotoBottom: function () {
                let scroll = this.$refs.scroll;
                scroll.scrollTop = scroll.scrollHeight;
            }
        }
    }

</script>


<style scoped>
    .base {
        margin-top: 68px;
    }

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
        background: #b3ffd9;
        border-radius: 5px;
    }

    .colStyle3 {
        background: #b3ecff;
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