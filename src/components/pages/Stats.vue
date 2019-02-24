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

        <div>
            <h1>Stats</h1>
        </div>

        <div class="footer">
            <div class="navContent"><p class="footerText">About Press Blog Privacy Terms Contact</p></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Stats'
    }
</script>

<style src="../style/MainStyle.css" scoped>
</style>