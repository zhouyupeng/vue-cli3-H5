<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<style lang="scss">
@import "./node_modules/normalize.css/normalize";
@import "style/common.scss";
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    a {
        font-weight: bold;
        color: #2c3e50;
        font-size: 32px;
        &.router-link-exact-active {
            color: $color-main;
        }
    }
}
h3 {
    font-size: 18px;
}
a {
    // font-size: 64px;
}
</style>
