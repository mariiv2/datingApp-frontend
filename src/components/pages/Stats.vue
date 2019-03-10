<template>
    <div id="page">
        <nav>
            <div class="wrapper">
                <div class="menu">
                    <router-link to="/home" class="link">Home</router-link>
                    <router-link to="/chat" class="link">Chats</router-link>
                    <router-link to="/profile" class="link">My Profile</router-link>
                    <router-link to="/browse" class="link">Browse</router-link>
                    <router-link to="/stats" class="link" id="active">Stats</router-link>
                    <img src="../images/gear.png"/>
                </div>
            </div>
        </nav>
        <div class="container">
            <h1>STATS</h1>
            <div style="text-align: center;">
                <button v-on:click="getBasic" style="border: none; font-weight:bold;" ref="basic">Basic</button>
                <button v-on:click="getActions" style="border: none" ref="actions">Actions</button>
                <button v-on:click="getAudience" style="border: none" ref="audience">Audience</button>
            </div><hr>

            <div v-if="basic" style="display: flex;">
                <div style="margin: 10px;">
                    <p style="font-weight:bold;"> GENDER PROPORTION</p>
                    <pie-chart :width="300" :height="300" :data="chartData"></pie-chart>
                </div>
                <div style="margin: 10px;">
                    <table class="tableDesign" style="width: 45%">
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
            <div v-if="actions">
                <line-chart :width="300" :height="300" :chart-data="lineChartData"></line-chart>
                <button @click="fillData()">Randomize</button>
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
    import PieChart from "./PieChart.js";
    import LineChart from "./LineChart.js";

    /* eslint-disable */
    import {AXIOS} from './http-config'


    export default {
        name: 'stats',
        props: {
            activeUser: Object
        },
        components: {
            PieChart,
            LineChart
        },
        // app initial state
        data() {
            return {
                info: [],
                user: {},
                mostLikeableUsers: [],
                id: 1,
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
                basic: true,
                actions: false,
                audience: false
                }


        },
        created: function () {
            this.getMostLikeableUsers();
            this.getUser();
        },
        mounted () {
            this.fillLineData();
        },
        // methods that implement data logic.
        // note there's no DOM manipulation here at all.
        methods: {
            getBasic: function () {
                this.basic = true;
                this.actions = false;
                this.audience = false;
                this.$refs.basic.setAttribute("style", "font-weight:bold; border: none");
                this.$refs.actions.setAttribute("style", "font-weight:normal; border: none");
                this.$refs.audience.setAttribute("style", "font-weight:normal; border: none");
            },
            getActions: function () {
                this.basic = false;
                this.actions = true;
                this.audience = false;
                this.$refs.basic.setAttribute("style", "font-weight:normal; border: none");
                this.$refs.actions.setAttribute("style", "font-weight:bold; border: none");
                this.$refs.audience.setAttribute("style", "font-weight:normal; border: none");
            },
            getAudience: function () {
                this.basic = false;
                this.actions = false;
                this.audience = true;
                this.$refs.basic.setAttribute("style", "font-weight:normal; border: none");
                this.$refs.actions.setAttribute("style", "font-weight:normal; border: none");
                this.$refs.audience.setAttribute("style", "font-weight:bold; border: none");
            },

            getUser: function () {
                AXIOS.get('/stats/')
                    .then(response => {
                        this.user = response.data;
                        console.log(PieChart);
                        this.chartData.datasets[0].data = [this.user[0], this.user[1]];
                        console.log(this.user[0])
                    })
            },
            getMostLikeableUsers: function () {
                AXIOS.get('/stats/likes')
                    .then(response => {
                        this.mostLikeableUsers = response.data;
                    })
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
            }
        }
    }

</script>




<style src="../style/MainStyle.css" scoped>
</style>