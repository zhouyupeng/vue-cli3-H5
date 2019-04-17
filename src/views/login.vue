<template>
    <section class="login">
        <input type="text" placeholder="账号" v-model="username">
        <input type="password" placeholder="密码" v-model="password">
        <button @click="loginBtn">点我</button>
    </section>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
import { Toast } from 'mint-ui';
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    components: {},
    created() {},
    mounted() {
    },

    methods: {
        ...mapActions('login',['login']),
        loginBtn() {
            if (this.username === '' || this.password === '') {
                Toast({
                    message: '请输入账号或密码',
                    position: 'middle',
                    duration: 2000
                });
            } else {
                this.login({
                    username: this.username,
                    password: this.password,
                    $router: this.$router
                });
            }
        }
    }
};
</script>
