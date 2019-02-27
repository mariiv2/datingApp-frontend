<template>
  <div id="page">
    <nav>
      <div class="wrapper">
        <div class="menu">
          <router-link to="/home" class="link" id="active">Home</router-link>
          <router-link to="/chat" class="link">Chats</router-link>
          <router-link to="/profile" class="link">My Profile</router-link>
          <router-link to="/browse" class="link">Browse</router-link>
          <router-link to="/stats" class="link">Stats</router-link>
          <img src="../images/gear.png" />
        </div>
      </div>
    </nav>

    <div class="container">
      <h1>Home</h1>
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
  export default {
    name: 'Home'
  }
</script>

<style src="../style/MainStyle.css" scoped>
</style>
