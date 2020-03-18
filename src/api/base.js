const base = {

}

base.$apiServer = {
    baseApi: process.env.VUE_APP_BASE_API,
    githubApi: process.env.VUE_APP_BASE_BASE2_API
}
base.$api = {
    starred: `${base.$apiServer.githubApi}/mock/users/zhou/starred`,
    login: `${base.$apiServer.baseApi}/mock/973ec681e817a650ec18f8fb17af90e8/user/login`
}
export {
    base
}
