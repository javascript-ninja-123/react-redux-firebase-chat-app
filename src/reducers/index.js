import { combineReducers } from 'redux';
import firebaseReducer from './reducer_firebase'
import GeoReducer from './reducer_geo';
import UserReducer from './reducer_user'
const rootReducer = combineReducers({
  texts:firebaseReducer,
  geos:GeoReducer,
  user:UserReducer
});

export default rootReducer;
