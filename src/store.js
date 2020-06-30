import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { userLoginReducer, userRegisterReducer } from "./redux/reducers/userReducers";
import {
  submeterSaveReducer,
  collectionSaveReducer,
  collectionListReducer,
  collectionDetailsReducer,
  submeterListReducer,
  readingsSaveReducer,
  readingsLoadReducer,
  submeterRemoveReducer,
  collectionRemoveReducer,
  readingsRemoveReducer
} from "./redux/reducers/meterReducers";
import { UIReducers } from "./redux/reducers/UIreducers";

const userInfo = Cookie.getJSON("userInfo") || null;
const collectionList = [];
const initialState = {
  userLogin: { ...userInfo },
  userRegister:{ userInfo:null },
  submetersList:{submeterList:[]},
  UI: { createCollection: false },
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  submeterSave: submeterSaveReducer,
  submeterRemove:submeterRemoveReducer,
  submetersList:submeterListReducer,
  collectionSave: collectionSaveReducer,
  collectionList:collectionListReducer,
  collectionDetails:collectionDetailsReducer,
  collectionRemove:collectionRemoveReducer,
  UI: UIReducers,
  readingsSave:readingsSaveReducer,
  readingsList:readingsLoadReducer,
  readingsRemove:readingsRemoveReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
