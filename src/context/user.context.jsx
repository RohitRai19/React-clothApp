import { onAuthStateChanged } from "firebase/auth";
import { createContext,useEffect,useState,Reducer, useReducer} from "react";
import { onAuthStateChangedListener,createUserDocumentFromAuth } from "../utils/firebase/firebase.utlis";
import { createAction } from "../utils/firebase/reducer/reducer.utils";


export const UserContext =createContext({
setCurrentUser:()=> null,
currentUser: null,
});

export const USER_ACTION_TYPES ={
  SET_CURRENT_USER:'SET_CURRENT_USER',
};


const userReducer = (state,action)=>{
  console.log("dispatched")
  console.log(action)
  const{type,payload}=action;
switch(type){
  case USER_ACTION_TYPES.SET_CURRENT_USER:
  return{
    ...state,
    currentUser:payload,
  }
  default:
    throw new Error(`Unhandled type${type} in userReducer`);
}
};
const INITIAL_STATE={
  currentUser:null,
};


export const UserProvider =({ children})=>{
// const[currentUser,setCurrentUser]= useState(null);
const [{currentUser},dispatch] =useReducer(userReducer,INITIAL_STATE)
console.log(currentUser)

const setCurrentUser = (user)=>{
  dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER,user));
};
const value = {currentUser,setCurrentUser};


useEffect(()=>{ const unsubcribe =onAuthStateChangedListener((user)=>{
  if(user){
    createUserDocumentFromAuth(user)
  }
 setCurrentUser(user);
}); return unsubcribe 
},[]); 
return <UserContext.Provider value={value}>{children}</UserContext.Provider> 

};