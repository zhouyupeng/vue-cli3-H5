import { get, post } from '@/axios/http.js'
import { base } from '@/api/base.js'

function getIndex (params) {
    return get(base.$api.starred, params)
}
function login(params) {
    return post(base.$api.login, params)
}
export {
    getIndex,
    login
}
