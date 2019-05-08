<template>
    <div class="bg">
        <Header></Header>
        <div class="container align-items-center justify-content-center text-center base" v-if="loaded3">
            <div class="row">
                <div class="col-sm-1"></div>
                <div class="col-sm-4 styled" v-if="isMatches">
                    <a v-for="match in matches">
                        <div class="row rowStyle1" v-if="match.seen"
                             v-on:click="() => {getAllMessages(match); sendSeen(match);}">
                            <div class="col-4 colStyle1"><img
                                    v-bind:src="'data:image/jpeg;base64,' + match.image[0].name"
                                    class="favimg rounded-circle"></div>
                            <div class="col-8">
                                <div class="row">{{match.name}} {{match.surname}}</div>
                                <div class="row rowStyle2" v-if="match.lastMessage.messageSeen">
                                    <label>{{match.lastMessage.message}}</label>
                                </div>
                                <div class="row rowStyle2" v-else>
                                    <label v-if="match.lastMessage.fromUserId !== user.id"
                                           style="font-weight: bold; color: #1D1C1D">{{match.lastMessage.message}}
                                    </label>
                                    <label v-else>{{match.lastMessage.message}}</label>
                                </div>
                            </div>
                        </div>
                        <div class="row rowStyle1" v-else
                             style="background-color: #FFFF99"
                             v-on:click="() => {getAllMessages(match); sendSeen(match);}">
                            <div class="col-4 colStyle1"><img v-bind:src="'data:image/jpeg;base64,'+ match.image[0].name"
                                                              class="favimg rounded-circle"></div>
                            <div class="col-8">
                                <div class="row">{{match.name}} {{match.surname}}</div>
                                <div class="row rowStyle2" v-if="match.lastMessage.messageSeen">
                                    {{match.lastMessage.message}}
                                </div>
                                <div class="row rowStyle2" style="font-weight: bold;  color: black" v-else>
                                    {{match.lastMessage.message}}
                                </div>
                            </div>
                        </div>
                    </a>
                    <!--<hr v-for="user in matches">-->
                </div>
                <div v-if="chatSelected" class="col-sm-6">
                    <div class="row">
                        <a v-on:click="goBack()"> <- CLOSE CHAT</a>
                    </div>
                    <div class="row">
                        <div class=" col-sm-12
                             colored my-custom-scrollbar
                             my-custom-scrollbar-primary scrollbar-ripe-malinka"
                             v-chat-scroll="{always: false, smooth: true}">
                            <div style="margin-top: 50px"></div>
                            <div v-for="m in messages">
                                <div v-if="m.fromUserId === user.id" class="row">
                                    <div class="col-md-6 col-sm-6"></div>
                                    <div class="col-md-4 col-sm-4">
                                        <div class="colStyle3">
                                            <span>{{m.message}}</span>
                                        </div>
                                        <span class="span">{{m.dateSent}}</span>
                                    </div>
                                    <div v-if="m.myPhoto" class="col-md-2 col-sm-2">
                                        <img v-bind:src=" 'data:image/jpeg;base64,'+ user.image[0].name"
                                             class="chatimg rounded-circle">
                                    </div>
                                    <div class="col-md-2 col-sm-2" v-else></div>
                                </div>
                                <div v-else class="row">
                                    <div class="col-md-2 col-xs-2" v-if="m.friendPhoto">
                                        <img v-bind:src="'data:image/jpeg;base64,'+ friend.image[0].name"
                                             class="chatimg rounded-circle">
                                    </div>
                                    <div class="col-md-2 col-xs-2" v-else></div>
                                    <div class="col-md-4 col-xs-4">
                                        <div class="colStyle2">
                                            <span>{{m.message}}</span>
                                        </div>
                                        <span class="span">{{m.dateSent}}</span>
                                    </div>
                                    <div class="col-md-6 col-xs-6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row rowStyle3 desktopVersion" style="vertical-align: bottom;">
                        <div class="col-md-10 " style="margin-left: 10px; margin-right: 10px">
                            <input type="text" class="form-control" v-model="messageView.message"
                                   placeholder="Enter your message" v-on:keyup.enter="sendMessage">
                        </div>
                        <div class="col-md-1 " v-if="messageView.message !== ''">
                            <a v-on:click="sendMessage" v-on:keyup.enter="sendMessage">
                                <font-awesome-icon icon="paper-plane" class="fa-2x"/>
                            </a>
                        </div>
                    </div>
                    <div class="row rowStyle3 mobileVersion" style="vertical-align: bottom;">
                        <div class="col-xs-10 " style="margin-left: 10px; margin-right: 10px">
                            <input type="text" class="form-control" v-model="messageView.message"
                                   placeholder="Enter your message" v-on:keyup.enter="sendMessage">
                        </div>
                        <div class="col-xs-1 " v-if="messageView.message !== ''">
                            <a v-on:click="sendMessage" v-on:keyup.enter="sendMessage">
                                <font-awesome-icon icon="paper-plane" class="fa-2x"/>
                            </a>
                        </div>
                    </div>
                </div>
                <div v-else class="col-sm-6 colored" v-if="isNoChat">
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
                id: 0,
                loaded3: false,
                interval: null,
                intervalMain: null,
                myPhoto: true,
                friendPhoto: true,
                chatSelected: false,
                isMatches: true,
                isNoChat: true,
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
            if (this.isMobile()){
                this.isMatches = true;
                this.chatSelected = false;
                this.isNoChat = false;
            }
        },
        methods: {
            isMobile() {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            },
            goBack: function () {
                this.isMatches = true;
                this.chatSelected = false;
                this.isNoChat = false;
                clearTimeout(this.interval);
                if (!this.isMobile()){
                    this.isNoChat = true;
                }
            },
            getUser: function () {
                AXIOS.get('/users')
                    .then(response => {
                        this.user = response.data;
                        this.id = this.user.id;
                        this.loaded3 = true;
                    });
            },
            sendSeen: function (friend) {
                AXIOS.get('/messages/' + friend.id).then(
                );
                if (this.isMobile()){
                    this.isMatches = false;
                }
            },
            getMatches: function () {
                AXIOS.get('/match/all')
                    .then(response => {
                        this.matches = response.data;
                        this.intervalMain = setTimeout(function () {
                            this.getMatches()
                        }.bind(this), 200)
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
                this.isNoChat = false;
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
                        }.bind(this), 200)
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

    .mobileVersion{
        display: none;
    }

    @media only screen and (max-width: 400px){
        .chatimg{
            display: none;
        }

        .desktopVersion{
            display: none;
        }

        .mobileVersion{
            display: flex;
        }
    }


</style>