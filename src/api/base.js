const base = {

}
base.$weixinAppid = process.env.VUE_APP_APPID // 授权登录，开发者帐号appid
base.$locationLinkWX = process.env.VUE_APP_BASE_WEIXIN_URL // 域名
base.$apiServer = {
    baseApi: process.env.VUE_APP_BASE_API,
    githubApi: process.env.VUE_APP_BASE_BASE2_API
}
base.$api = {
    starred: `${base.$apiServer.githubApi}/mock/users/zhou/starred`,
    login: `${base.$apiServer.baseApi}/mock/973ec681e817a650ec18f8fb17af90e8/user/login`,
    wxLogin: `${base.$apiServer.baseApi}/mock/973ec681e817a650ec18f8fb17af90e8/user/wxLogin`
}
export {
    base
}
