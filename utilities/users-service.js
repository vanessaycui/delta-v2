// users-service.js

// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from 
import * as usersAPI from './users-api';

export async function signUp(userData) {
    // Delegate the network request code to the users-api.js API module
    // which will ultimately return a JSON Web Token (JWT)
    const token = await usersAPI.signUp(userData);

    localStorage.setItem('token', token)
    // Baby step by returning whatever is sent back by the server
    return getUser();
  }


export function getToken(){
  const token = localStorage.getItem('token')

  if (!token) return null;

  //split token by periods, you get second element, change string to base64, parse json to obj
  //payload is a JS object
  const payload = JSON.parse(atob(token.split('.')[1]));
  //Date.now() gives it to us in miliseconds. convert to seconds.
  if (payload.exp < Date.now()/1000){
    localStorage.removeItem('token')  //remove token from localStorage
    return null
  }

  return token
}


export function getUser() {
  const token = getToken();
  // If there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logout(){
  localStorage.removeItem('token')  //remove token from localStorage
}

export async function login(credentials){
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token)
  return getUser();
}

export async function checkToken(){
  
  return usersAPI.checkToken().then((dateStr)=> new Date(dateStr)); //turn string to like an actual date w/ time
}