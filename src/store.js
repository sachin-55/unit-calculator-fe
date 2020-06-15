import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import { userLoginReducer } from "./redux/reducers/userReducers";
import {
  submeterSaveReducer,
  collectionSaveReducer,
  collectionListReducer,
  collectionDetailsReducer,
  submeterListReducer,
} from "./redux/reducers/meterReducers";
import { UIReducers } from "./redux/reducers/UIreducers";

const userInfo = Cookie.getJSON("userInfo") || null;
const collectionList = [];
const initialState = {
  userLogin: { ...userInfo },
  UI: { createCollection: false },
};

const reducer = combineReducers({
  userLogin: userLoginReducer,
  submeterSave: submeterSaveReducer,
  submetersList:submeterListReducer,
  collectionSave: collectionSaveReducer,
  collectionList:collectionListReducer,
  collectionDetails:collectionDetailsReducer,
  UI: UIReducers,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
