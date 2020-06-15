import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL } from "../constants/userContants";

const userLoginReducer = (state={},action)=>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading:true}
        case USER_LOGIN_SUCCESS:

            return {
                loading:false,
                userInfo:action.payload,
                loginStatus:true
            }
        case USER_LOGIN_FAIL:
            
            return {
                loading:false,
                error:action.payload,
                loginStatus:false
            };

        case USER_LOGOUT_REQUEST:
            return {loading:true}

        case USER_LOGOUT_SUCCESS:
            return {
                loading:false,
                userInfo:"",
                loginStatus:false
            }
        case USER_LOGOUT_FAIL:
            return {
                loading:false,
                error:"Logout Error!!! Try Again",
                loginStatus:false

            };
        default:
            return state;
    }
}

const userLogoutReducer = (state={},action)=>{
    switch(action.type){
      
        default:
            return state;
    }
}


export {userLoginReducer}