<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { getIndex } from 'api/index';
export default {
    name: 'home',
    components: {
        HelloWorld
    },
    created() {
        getIndex({ pageSiza: 100, num: 10 });
    },
    mounted() {},

    methods: {}
};
</script>
