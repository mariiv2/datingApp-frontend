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
      <h1>Welcome!</h1>
      <h2>We help you to find someone special!</h2>
      <div class="getStarted1">
        <p>You can edit personal information in Profile.</p>
        <router-link to="/profile" class="button">Go to profile</router-link>
      </div>
      <div class="getStarted2">
        <p>To start searching a perfect date go to Browse.</p>
        <router-link to="/browse" class="button">Go to browse</router-link>
      </div>
      <div class="getStarted3">
        <p>Explore charts with most popular people in the app.</p>
        <router-link to="/stats" class="button">Go to stats</router-link>
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
  export default {
    name: 'Home'
  }
</script>

<style src="../style/MainStyle.css" scoped>
</style>
