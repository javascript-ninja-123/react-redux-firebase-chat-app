import {GET_GEO} from '../actions/type'

export default function(state={},action){
switch(action.type){
  case GET_GEO:
  return action.payload;
  default:
  return state;
}
}
