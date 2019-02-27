<template>
  <div id="page">
      <nav>
        <div class="wrapper">
          <div class="menu">
          <router-link to="/home" class="link">Home</router-link>
          <router-link to="/chat" class="link">Chats</router-link>
          <router-link to="/profile" class="link" id="active">My Profile</router-link>
          <router-link to="/browse" class="link">Browse</router-link>
          <router-link to="/stats" class="link">Stats</router-link>
          <img src="../images/gear.png" />
          </div>
        </div>
      </nav>
    <div class="container">
        <div class="imageContainer">
          <img style="border: 15px solid #f93d7b;" src="../images/eva.png" />
          <div v-if="editMode" class="changePhoto">
            <button class="photoButton">Change photo</button>
          </div>
        </div>
        <div class="info">
          <div class="infoBox" v-if="editMode">
            <table class="box">
              <tr>
                <td class="decorated">{{user.name}}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>
                  <input class="input" type="text" v-model="user.name"/>
                </td>
              </tr>
              <tr>
                <td>Surname:</td>
                <td>
                  <input class="input" type="text" v-model="user.surname"/>
                </td>
              </tr>
              <tr>
                <td>City:</td>
                <td>
                  <input class="input" type="text" v-model="user.city"/>
                </td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>
                  <input class="input" type="text" v-model="user.country"/>
                </td>
              </tr>
              <tr>
                <td>Hobby:</td>
                <td>
                  <input v-model="user.hobby" class="input" type="text" placeholder="#photography"/>
                </td>
              </tr>
              <tr>
                <td class="decorated">Bio</td>
              </tr>
              <tr>
                <td colspan="2">
                  <textarea v-model="user.bio" class="input" id="bio" placeholder="Lorem ispum is a dummy text!"></textarea>
                </td>
              </tr>
            </table>
          </div>
          <div class="infoBox" v-else>
            <table class="box">
              <tr>
                <td class="decorated">{{user.name}}</td>
              </tr>
              <tr>
                <td>Full name:</td>
                <td>{{user.name}} {{user.surname}}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>23</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{{user.gender}}</td>
              </tr>
              <tr>
                <td>City:</td>
                <td>{{user.city}}</td>
              </tr>
              <tr>
                <td>Country:</td>
                <td>{{user.country}}</td>
              </tr>
              <tr>
                <td>Hobby:</td>
                <td>#photography</td>
              </tr>
              <tr>
                <td class="decorated">Bio</td>
              </tr>
              <tr>
                <td colspan="2">Lorem ipsum is a dummy text!</td>
              </tr>
              <tr>
                <td class="decorated">Likes</td>
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
      <div v-if="!editMode" class="infoChange">
        <button v-on:click = "editHTML">EDIT</button>
      </div>
      <div v-else class="infoChange">
        <button v-on:click="saveInfo">SAVE</button>
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

<style src="../style/MainStyle.css">
</style>