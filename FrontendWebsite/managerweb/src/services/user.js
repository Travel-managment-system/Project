import axios from 'axios';
import { createURL,createError } from './utils';
export async function register(firstName, lastName, email, password) {
    try{
const url = createURL('register');
console.log("url",url);


const body = {
    firstName,
    lastName,
    email,
    password
}

const response =  await axios.post(url,body )
// debugger
return response.data;
    }
    catch(error){
       return createError(error);
    }
}