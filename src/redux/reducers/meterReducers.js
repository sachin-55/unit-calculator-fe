/* eslint-disable no-case-declarations */
import {
    SUBMETER_SAVE_SUCCESS,
  SUBMETER_SAVE_FAIL,
  SUBMETER_SAVE_REQUEST,
  SUBMETER_CLEAR_LIST,
  COLLECTION_SAVE_SUCCESS,
  COLLECTION_SAVE_FAIL,
  COLLECTION_SAVE_REQUEST,
  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_SUCCESS,
  COLLECTION_LIST_FAIL,
  COLLECTION_DETAIL_REQUEST,
  COLLECTION_DETAIL_SUCCESS,
  COLLECTION_DETAIL_FAIL,
  SUBMETER_LIST_REQUEST,
  SUBMETER_LIST_SUCCESS,
  SUBMETER_LIST_FAIL
} from "../constants/meterConstants";

const submeterSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMETER_SAVE_REQUEST:
      return { loading: true };
    case SUBMETER_SAVE_SUCCESS:
      return {
        loading: false,
        success:true
      };
    case SUBMETER_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
        success:false
      };
    case SUBMETER_CLEAR_LIST:
      return {
        submeterList: [],
      };
    default:
      return state;
  }
};
const submeterListReducer = (state = {submeterList:[]}, action) => {
  switch (action.type) {
    case SUBMETER_LIST_REQUEST:
        
      return { loading: true };
    case SUBMETER_LIST_SUCCESS:
     
      return {
       loading:false,
       submeterList:action.payload
      };
    case SUBMETER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const collectionSaveReducer = (state = {collection:{}}, action) => {
  switch (action.type) {
    case COLLECTION_SAVE_REQUEST:
      return { loading: true };
    case COLLECTION_SAVE_SUCCESS:
      return {
       loading:false,
       collection:action.payload,
       success:true

      };
    case COLLECTION_SAVE_FAIL:
      return {
        loading: false,
        error: action.payload,
        success:false

      };

    default:
      return state;
  }
};


const collectionListReducer = (state = {collectionList:[]}, action) => {
    switch (action.type) {
      case COLLECTION_LIST_REQUEST:
          
        return { loading: true };
      case COLLECTION_LIST_SUCCESS:
       
        return {
         loading:false,
         collectionList:action.payload
        };
      case COLLECTION_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };

  const collectionDetailsReducer = (state = {collection:{}}, action) => {
    switch (action.type) {
      case COLLECTION_DETAIL_REQUEST:
          
        return { loading: true };
      case COLLECTION_DETAIL_SUCCESS:
       
        return {
         loading:false,
         collection:action.payload
        };
      case COLLECTION_DETAIL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
export { submeterSaveReducer,submeterListReducer, collectionSaveReducer,collectionListReducer,collectionDetailsReducer };
