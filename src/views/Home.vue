<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>
    <div @click='test2333()'>
        233333
    </div>
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        {{this.starred['id']}}
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { getIndex } from 'api/index';
import { Toast } from 'mint-ui'
export default {
    name: 'home',
    components: {
        HelloWorld
    },
    async created() {
        try {
            let _data = await getIndex();
            this.starred = _data.data[0]
        } catch (err) {
            Toast({
                message: '这里是home页面的error提示',
                position: 'bottom',
                duration: 2000
            });
        }
    },
    data() {
        return {
            starred: ''
        }
    },
    mounted() {
        // 这里是测试
        console.log('111');
    },
    methods: {
        async test2333() {
            try {
                await getIndex(); // 这个接口没有走统一返回码
            } catch (err) {
                // Toast({
                //     message: '这里是home页面状态码不为200的error提示',
                //     position: 'bottom',
                //     duration: 7000
                // });
                console.log('err', err);
            }
        }
    }
};
</script>
