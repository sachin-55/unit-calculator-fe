const Axios = require("axios");
import { USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL } from "../constants/userContants";
import Cookie from 'js-cookie';

const login=(email,password)=>async (dispatch)=>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST,
            payload:{
                email,password
            }
        })

    const {data} = await Axios.post(`${process.env.HOST_API_URL}/api/v1/users/login`,{email,password});
    dispatch({
        type:USER_LOGIN_SUCCESS,
        payload:data,
    })
    const info={
        userInfo:data,
        loginStatus:true
    }
    Cookie.set('userInfo',JSON.stringify(info));

    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response.data.message,
        })

      
    }
   
}

const logout=()=>async (dispatch)=>{
    try {
        dispatch({
            type:USER_LOGOUT_REQUEST,
        })

    dispatch({
        type:USER_LOGOUT_SUCCESS,
    })
    Cookie.remove('userInfo');
    
    } catch (error) {
        dispatch({
            type:USER_LOGOUT_FAIL,
        })
    }
   
}


export {login,logout}