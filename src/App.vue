<template>
    <div id="app">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" class="router"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" class="router"></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    computed: {
    }
};
</script>
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
.router{
  width: 100%;
  height: 100%;
  height: 100vh;
  overflow: scroll;
  position: fixed;
  overflow: hidden !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  background: #f0f0f0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f2f2f2;
}
</style>
