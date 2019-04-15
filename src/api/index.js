import { get } from '@/axios/http.js'
function getIndex (params) {
    return get('/mock/5cb48c7ed491cd741c54456f/base/index', params)
}

export default {
    getIndex
}
