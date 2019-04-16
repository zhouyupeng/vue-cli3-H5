import * as type from './mutations_types'
import api from 'api/index'
export default {
    state: {
        token: localStorage.getItem("token") || '',
        user:JSON.parse(localStorage.getItem("token_user")) || {}
    },
    mutations:{
        
        [type.LOGIN](state,data){

        }
            
    },
    actions: {
        login(state){
                api.login().then((data)=>{
                
                state.commit(type.LOGIN,data);
            }).catch((error)=>{

            })
            
        }
        }

    
}
