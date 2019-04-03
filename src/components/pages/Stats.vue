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
                            <font-awesome-icon icon="sign-out-alt" style="margin-top: 1.7vh; margin-left: 2ch" v-on:click="logOut()"/>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container align-items-center justify-content-center text-center" style="background-color: #F4F4F4">
            <div class="row">
                <div class="col-sm" style="margin-top: 5vh">
                    <button v-on:click="getBasic" style="border: none; outline: none; font-weight:bold;" ref="basic">Basic</button>
                    <button v-on:click="getActions" style="outline: none; border: none" ref="actions">Actions</button>
                    <button v-on:click="getAudience" style="outline: none; border: none" ref="audience">Audience</button>
                </div>
            </div><hr>
            <div class="container" v-if="basic">
                <div class="row">
                    <div class="col-sm">
                        <p style="font-weight:bold;"> GENDER PROPORTION</p>
                        <pie-chart v-if="loaded" style="width: 300px; margin-left: 18%" :data="chartData"/>
                    </div>
                    <div class="col-sm">
                        <p style="font-weight:bold;"> COUNTRY PROPORTION</p>
                        <pie-chart v-if="loaded" style="width: 300px; margin-left: 18%" :data="chartData1"/>
                        <div v-if="loaded1">test</div>
                    </div>
                </div><hr>
                <div class="row" style="width: 100%; margin-top: 5vh">
                    <div class="col-sm text-center">
                        <p style="font-weight: bold;">MOST POPULAR USERS</p>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>NAME</th>
                                    <th>LIKES</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(mostLikeableUser, index) in mostLikeableUsers">
                                    <td>{{index}}</td>
                                    <td>{{ mostLikeableUser.name}}</td>
                                    <td>{{ mostLikeableUser.likes}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container" v-if="actions">
                <div class="row">
                    <div class="col-sm">
                        <line-chart :width="400" :height="100" :options="options" :data="lineChartData"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {AXIOS} from './http-config'
    import PieChart from "./PieChart.js";
    import LineChart from "./LineChart.js";

    export default {
        components: {
            PieChart,
            LineChart
        },
        // app initial state
        data() {
            return {
                info: [],
                countries: [],
                countriesAmount: [],
                user: {},
                mostLikeableUsers: [],
                id: 1,
                options: {
                    legend: {
                        display: false
                    }
                },
                loaded: false,
                loaded1: false,
                lineChartData: null,
                chartData: {
                    labels: ["FEMALE", "MALE"],
                    datasets: [
                        {
                            label: "Data One",
                            backgroundColor: ["#f93d7b", "#00D8FF"],
                            data: {}
                        }
                    ]
                },
                chartData1: {
                    labels: [],
                    datasets: [
                        {
                            label: "Data One",
                            backgroundColor: ["red", "green", "blue", "yellow", "pink", "orange", "violet", "brown", "black"],
                            data: []
                        }
                    ]
                },
                basic: true,
                actions: false,
                audience: false
            }


        },
        created: function () {
            this.getMostLikeableUsers();
        },

        mounted () {
            this.fillLineData();
            this.getUser();
        },
        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
        methods: {
            getBasic: function () {
                this.basic = true;
                this.actions = false;
                this.audience = false;
                this.$refs.basic.setAttribute("style", "font-weight:bold; outline: none; border: none");
                this.$refs.actions.setAttribute("style", "font-weight:normal; outline: none; border: none");
                this.$refs.audience.setAttribute("style", "font-weight:normal; outline: none; border: none");
            },
            getActions: function () {
                this.basic = false;
                this.actions = true;
                this.audience = false;
                this.$refs.basic.setAttribute("style", "font-weight:normal; outline: none; border: none");
                this.$refs.actions.setAttribute("style", "font-weight:bold; outline: none; border: none");
                this.$refs.audience.setAttribute("style", "font-weight:normal; outline: none; border: none");
            },
            getAudience: function () {
                this.basic = false;
                this.actions = false;
                this.audience = true;
                this.$refs.basic.setAttribute("style", "font-weight:normal; outline: none; border: none");
                this.$refs.actions.setAttribute("style", "font-weight:normal; outline: none; border: none");
                this.$refs.audience.setAttribute("style", "font-weight:bold; outline: none; border: none");
            },

            getUser: function () {
                AXIOS.get('/stats/')
                    .then(response => {
                        this.user = response.data;

                        //chart data
                        this.chartData.datasets[0].data = [this.user[0], this.user[1]];
                        this.getCountryProportion();
                    })
            },
            getMostLikeableUsers: function () {
                AXIOS.get('/stats/likes')
                    .then(response => {
                        this.mostLikeableUsers = response.data;
                    })
            },
            getCountryProportion: function () {
                AXIOS.get('/stats/userByCountry').then(response => {
                    // this.countries = response.data;
                    console.log(response.data);
                    var countriesDict = response.data;
                    for(var key in countriesDict){
                        var value = countriesDict[key];
                        this.countries.push(key);
                        this.countriesAmount.push(value);
                    }
                    this.chartData1.labels = this.countries;
                    this.chartData1.datasets[0].data = this.countriesAmount;
                    console.log(this.chartData1);
                    this.loaded = true;

                });
            },
            fillLineData () {
                this.lineChartData = {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [
                        {
                            backgroundColor: '#f87979',
                            data: [1, 2,1,4,2,4,5,1,6,8,4,3]
                        }
                    ]
                }
            },
            logOut: function() {
                localStorage.removeItem("token");
                this.$router.push("DatingApp");
            }
        }
    }
</script>
