import { CLOSE_CREATE_COLLECTION,OPEN_CREATE_COLLECTION, CLOSE_CREATE_SUBMETER, OPEN_CREATE_SUBMETER } from '../constants/UIConstants';

const UIReducers = (state={createCollection:false},action)=>{
    switch(action.type){
        case CLOSE_CREATE_COLLECTION:
            return{
                createCollection:false
            }
        case OPEN_CREATE_COLLECTION:
            return{
                createCollection:true
            }
        case CLOSE_CREATE_SUBMETER:
            return{
                createSubmeter:false
            }
        case OPEN_CREATE_SUBMETER:
            return{
                createSubmeter:true
            }
        
        default:
            return state;
    }
}

export {UIReducers}