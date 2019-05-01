<template>
    <div class="bg">
        <Header></Header>
        <div class="container align-items-center justify-content-center text-center color1">
            <div class="row">
                <div class="col-sm margin1">
                    <button class="bold styled" v-on:click="getBasic" ref="basic">Basic</button>
                    <button class="styled" v-on:click="getActions" ref="actions">Actions</button>
                    <button class="styled" v-on:click="getAudience" ref="audience">Audience</button>
                </div>
            </div><hr>
            <div class="container" v-if="basic">
                <div class="row">
                    <div class="col-sm">
                        <p class="bold"> GENDER PROPORTION</p>
                        <pie-chart class="chart" v-if="loaded" :data="chartData"/>
                    </div>
                    <div class="col-sm">
                        <p class="bold"> COUNTRY PROPORTION</p>
                        <pie-chart class="chart" v-if="loaded" :data="chartData1"/>
                        <div v-if="loaded1">test</div>
                    </div>
                </div><hr>
                <div class="row margin2">
                    <div class="col-sm text-center">
                        <p class="bold">MOST POPULAR USERS</p>
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
    import {AXIOS} from '../resources/http.config'
    import PieChart from "../resources/PieChart.js";
    import LineChart from "../resources/LineChart.js";
    import Header from '../navigation/Header.vue'

    export default {
        components: {
            PieChart,
            LineChart,
            Header
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

<style scoped>
    .color1 {
        background-color: #F4F4F4;
        margin-top: 68px;
    }

    .bold {
        font-weight: bold;
    }

    .styled {
        border: none;
        outline: none;
    }

    .chart {
        width: 300px;
        margin: auto;
    }

    .margin1 {
        margin-top: 5vh;
    }

    .margin2 {
        width: 100%;
        margin-top: 5vh;
    }
</style>
