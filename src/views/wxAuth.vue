<template>
  <div class="wxAuth">
    <p>&nbsp;&nbsp;正在登录</p>
  </div>
</template>

<script>
import { base } from '@/api/base'
export default {
    name: 'wxAuth',
    components: {
    },
    data () {
        return {
        }
    },
    created () {
        console.log('code---------');
    },
    methods: {
    },
    mounted () {
        const fullPath = this.$route.fullPath
        let query = this.$route.query || {}
        document.title = '';
        const VUE_APP_CURRENTMODE = process.env.VUE_APP_CURRENTMODE
        console.log('code---------', VUE_APP_CURRENTMODE);
        const code = VUE_APP_CURRENTMODE == 'dev' ? '061zPe000oIYyK1w68200sQEIQ1zPe0E' : query.code
        console.log('code', code);
        if (code) {
            this.$store.dispatch('login/wxLogin', {
                code,
                $router: this.$router,
                $route: this.$route
            })
        } else {
            const redirectUri = encodeURIComponent(base.$locationLinkWX + fullPath)
            console.log(base.$locationLinkWX + fullPath);
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${base.$weixinAppid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        }
    }
}
</script>
<style scoped lang="scss">
.wxAuth {
  padding-top: 40px;
  .p {
    font-size: 24px;
  }
}
</style>
