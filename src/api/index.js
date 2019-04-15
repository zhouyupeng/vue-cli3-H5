import { post } from '@/axios/http.js'
function getIndex (params = {}) {
    return post('/xianren/index/getIndex', params)
}

export default {
    getIndex
}
