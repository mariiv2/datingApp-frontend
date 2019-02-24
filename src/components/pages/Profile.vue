<template>
  <div id="page">
    <div id="navigation">
      <nav class="nav">
        <div class="navContent">
          <router-link to="/home" class="link">HOME</router-link>
          <router-link to="/chat" class="link">CHATS</router-link>
          <router-link to="/profile" class="link">PROFILE</router-link>
          <router-link to="/browse" class="link">BROWSE</router-link>
          <router-link to="/stats" class="link">STATS</router-link>
          <img src="../images/gear.png" class="icon"/>
        </div>
      </nav>
    </div>
    <div class="container">
      <img src="../images/bg.png" style="width:100%;">
      <div class="centered">
        <div class="imageContainer">
          <div class="imageBorder"></div>
          <img src="../images/eva.png" class="photo"/>
          <div v-if="editMode">
            <button class="photoButton">
              <p class="buttonText">Change photo</p>
            </button>
            <button class="saveButton" v-on:click="saveInfo">
              <p class="buttonText">Save</p>
            </button>
            <!--<img class="arrowImg" v-on:click="profileHTML" src="../images/arrow.png"/>-->
          </div>
          <div v-else>
            <button class="buttonEdit" v-on:click = "editHTML">
              <p class="buttonText">Edit</p>
            </button>
          </div>
        </div>
        <div class="info">
          <div class="infoBox" v-if="editMode">
            <p class="capitalize">First name</p>
            <input type="text" v-model="user.name"/>
            <p class="capitalize">Last name</p>
            <input type="text" v-model="user.surname"/>
            <p class="capitalize">Gender</p>
            <input type="text" v-model="user.gender"/>
            <p class="capitalize">Country</p>
            <input type="text" v-model="user.country"/>
            <p class="capitalize">City</p>
            <input type="text" v-model="user.city"/>
            <p class="capitalize">Hobby</p>
            <input type="text" placeholder="Placeholder text" value="hobby here"/>
            <p class="boldText">BIO</p>
            <input type="text" v-model="user.bio"/>
          </div>
          <div class="infoBox" v-else>
            <p class="boldText capitalize">{{user.name}}</p>
            <p>FULL NAME: {{user.name}} {{user.surname}}</p>
            <p>AGE: 23</p>
            <p>GENDER: {{user.gender}}</p>
            <p>COUNTRY: {{user.country}}</p>
            <p>CITY: {{user.city}}</p>
            <p>HOBBY: #photography</p>
            <p class="boldText">BIO</p>
            <p> {{user.bio}}</p>
            <p class="boldText">LIKES</p>
            <img src="../images/heart.png" class="heart"/>
            <p class="likes">{{user.likes}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="navContent"><p class="footerText">About Press Blog Privacy Terms Contact</p></div>
    </div>
  </div>
</template>

<script>
    /* eslint-disable */
    import {AXIOS} from './http-config'
    export default {
        name: 'profile',
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
            editHTML: function () {
                this.editMode = true
            },
            profileHTML: function () {
                this.editMode = false
            },
            saveInfo: function () {
                this.editMode = false
                AXIOS.put('/users/', this.user)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    });

            },
            getUser: function () {
                AXIOS.get('/users/' + this.id)
                    .then(response => {
                    this.user = response.data
                console.log(response.data)
            })
            }
        }
    }
</script>

<style src="../style/MainStyle.css" scoped>
</style>