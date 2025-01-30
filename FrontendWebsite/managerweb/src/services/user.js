import axios from 'axios';
import { createURL,createError } from './utils';
export async function register(firstName, lastName, gmail, password) {
    try{
const url = createURL('register');
console.log("url",url);


const body = {
    firstName,
    lastName,
    gmail,
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