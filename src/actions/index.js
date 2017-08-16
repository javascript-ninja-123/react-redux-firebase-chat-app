import {FETCH_FIREBASE,GET_GEO,GET_USER} from './type';
import firebase from 'firebase';
//firebase
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAZ1oFeK54pKbi7aPz0ERhc1c7odgn9d4o",
  authDomain: "lastchatbot-56472.firebaseapp.com",
  databaseURL: "https://lastchatbot-56472.firebaseio.com",
  projectId: "lastchatbot-56472",
  storageBucket: "lastchatbot-56472.appspot.com",
  messagingSenderId: "1048680501473"
};
firebase.initializeApp(config);
const rootRef = firebase.database().ref();


export function fetchFirebase(){
  return dispatch => {
    rootRef.on('value',snap => {
      let snapshot = snap.val();
      dispatch({
        type:FETCH_FIREBASE,
        payload:snapshot
      })
    })
  }
}
export function pushFirebase(data){
  return dispatch => rootRef.push(data)
}


export function getGeo(data){
  return dispatch => {
    dispatch({
      type:GET_GEO,
      payload:data
    })
  }
}

export function getName(user){
  return dispatch => {
    dispatch({
      type:GET_USER,
      payload:user
    })
  }
}
