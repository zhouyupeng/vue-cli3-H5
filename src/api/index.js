import {
    get,
    post
} from '@/axios/hppt';

function getIndex (params = {}) {
    return post('/xianren/index/getIndex', params);
}

export default {
    getIndex
}
