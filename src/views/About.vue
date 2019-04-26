<template>
    <div class="about">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>
        <h1>用户名:{{ user.name}}</h1>
        <img :src="user.portrait" alt>
        <p class="msg">
            For a guide and recipes on how to configure / customize this project,
            <br>check out the
            <a
                href="https://cli.vuejs.org"
                target="_blank"
                rel="noopener"
            >vue-cli documentation</a>.
        </p>
        <h3>token:{{token}}</h3>
        <h3>{{1555851774 | formatTimer(true)}}</h3>
        <input type="text" value="1111">
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'about',
    props: {
        msg: String
    },
    created() {},
    computed: {
        // vuex modules 中的gettes,state获取方式，modules中要定义namespaced: true
        // ...mapGetters('login',['user','token']),
        ...mapState('login', ['user', 'token'])
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.about {
    @include ell();
}
h1 {
    font-size: 36px;
}
.msg {
    font-size: 32px;}
</style>
