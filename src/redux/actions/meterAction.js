import Axios from 'axios';
import Cookies, { get } from 'js-cookie';
import {
  COLLECTION_SAVE_REQUEST,
  COLLECTION_SAVE_SUCCESS,
  COLLECTION_SAVE_FAIL,
  SUBMETER_SAVE_SUCCESS,
  SUBMETER_SAVE_FAIL,
  SUBMETER_SAVE_REQUEST,
  SUBMETER_LIST_REQUEST,
  SUBMETER_LIST_SUCCESS,
  SUBMETER_LIST_FAIL,
  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_SUCCESS,
  COLLECTION_LIST_FAIL,
  COLLECTION_DETAIL_REQUEST,
  COLLECTION_DETAIL_SUCCESS,
  COLLECTION_DETAIL_FAIL,
  READINGS_SAVE_FAIL,
  READINGS_SAVE_REQUEST,
  READINGS_SAVE_SUCCESS,
  READINGSLIST_LOAD_REQUEST,
  READINGSLIST_LOAD_SUCCESS,
  READINGSLIST_LOAD_FAIL
} from '../constants/meterConstants';
import { CLOSE_CREATE_COLLECTION } from '../constants/UIConstants';

const loadCollectionList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await Axios.get(
      `${process.env.HOST_API_URL}/api/v1/collections?user=${userInfo.user._id}`,
    );

    dispatch({
      type: COLLECTION_LIST_SUCCESS,
      payload: data.collections,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_LIST_FAIL,
      payload: error.message,
    });
  }
};

const saveCollection = (collectionName) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_SAVE_REQUEST,
    });
    const {userLogin:{userInfo}}= getState();
    const body={
        name:collectionName,
        user:userInfo.user._id,
    }

    const config = {
        headers:{
            'Authorization':`Bearer ${userInfo.token}`
        }
    }
    const {data} =await Axios.post(`${process.env.HOST_API_URL}/api/v1/collections`,body,config)

    dispatch({
      type: COLLECTION_SAVE_SUCCESS,
      payload: data.collection,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_SAVE_FAIL,
      payload: error.message,
    });
  }
};


const getCollectionDetails = (collectionId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_DETAIL_REQUEST,
    });

    const { data } = await Axios.get(
      `${process.env.HOST_API_URL}/api/v1/collections?_id=${collectionId}`,
    );

    dispatch({
      type: COLLECTION_DETAIL_SUCCESS,
      payload: data.collections[0],
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_DETAIL_FAIL,
      payload: error.message,
    });
  }
};



const loadSubmeterList = (collectionId) => async (dispatch) => {
  try {
    dispatch({
      type: SUBMETER_LIST_REQUEST,
    });

    const { data } = await Axios.get(
      `${process.env.HOST_API_URL}/api/v1/submeters?collectionId=${collectionId}`);
    // console.log(JSON.stringify(data.submeters));

    dispatch({
      type: SUBMETER_LIST_SUCCESS,
      payload: data.submeters,
    });
  } catch (error) {
    dispatch({
      type: SUBMETER_LIST_FAIL,
      payload: error.message,
    });
  }
};

const saveSubmeter = (collectionId,meters) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBMETER_SAVE_REQUEST,
    });
    const {userLogin:{userInfo}}= getState();
    const config = {
      headers:{
          'Authorization':`Bearer ${userInfo.token}`
      }
  }
  // meters.forEach(async (element,index) => {
      const body={
        name:meters[0].meterName,
        collectionId,
    }
    const {data} =await Axios.post(`${process.env.HOST_API_URL}/api/v1/submeters`,body,config);

  // });
   
  dispatch({
    type: SUBMETER_SAVE_SUCCESS,
    payload:data
  });
   

  } catch (error) {
    dispatch({
      type: SUBMETER_SAVE_FAIL,
      payload: error.message,
    });
  }
};



const saveReadings = (submeterId,year,month,reading,unitPrice) => async (dispatch, getState) => {
  try {
    dispatch({
      type: READINGS_SAVE_REQUEST,
    });
    const {userLogin:{userInfo}}= getState();
    const config = {
      headers:{
          'Authorization':`Bearer ${userInfo.token}`
      }
  }
      const body={
        submeter:submeterId,
        readingsYear:year,
        readingsMonth:month,
        readings:reading,
        unitPrice,
    }
    const {data} =await Axios.post(`${process.env.HOST_API_URL}/api/v1/readings`,body,config);

  dispatch({
    type: READINGS_SAVE_SUCCESS,
    payload:data
  });
   

  } catch (error) {
    
    dispatch({
      type: READINGS_SAVE_FAIL,
      payload: error.response.data.message,
    });
  }
};


const loadReadings = ()=>async (dispatch,getState)=>{
  try {
    dispatch({
      type: READINGSLIST_LOAD_REQUEST,
    });
    const {userLogin:{userInfo}}= getState();
    const {submetersList:{submeterList}} = getState();

    let promises = [];
    submeterList.forEach(submeter => {
       promises.push(Axios.get(`${process.env.HOST_API_URL}/api/v1/readings?submeter=${submeter._id}`));
    });

    const res = await Promise.all(promises);

    let data = [];
    res.forEach((item)=>{
      data.push(item.data.readings)
    });

  dispatch({
    type: READINGSLIST_LOAD_SUCCESS,
    payload:data
  });
   

  } catch (error) {
    
    dispatch({
      type: READINGSLIST_LOAD_FAIL,
      payload: error.message,
    });
  }
}



export { saveCollection, loadCollectionList,getCollectionDetails,saveSubmeter,loadSubmeterList,saveReadings,loadReadings };
