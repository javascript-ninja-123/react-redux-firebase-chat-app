import {FETCH_FIREBASE} from '../actions/type';
export default function(state={},action){
switch(action.type){
  case FETCH_FIREBASE:
  return {...state, ...action.payload};
  default:
  return state;
}
}
