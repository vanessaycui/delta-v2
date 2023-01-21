import {getToken} from './users-service'
// users-api.js

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

// send-request.js create a new module for this in your project.
export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  //check if user is logged in (aka if there's a token)
  const token = getToken() 
  if (token) {
    //logical or assignment operator. if there are headers, dont overwrite with {}
    options.headers ||= {}
    //send token in the Authorization header. common practice
    //to preface it with Bearer
    options.headers.Authorization=`Bearer ${token}`
  }

  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}


export function signUp(userData) {
    return sendRequest(BASE_URL,'POST',userData)
}


export function login(credentials){
  return sendRequest(BASE_URL+"/login",'POST', credentials)
}

export function checkToken(){
  const exp = sendRequest(BASE_URL+'/check-token')
  return exp
}