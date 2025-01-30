import axios from 'axios';
import { createURL,createError } from './utils';
export async function createPackage(city, description, image) {
    try{
        const token = sessionStorage.getItem('token');
const url = createURL('manager/create-packages');
console.log("url",url);


const body = {
    city,
    description,
    image
}
const headers = {
    token: token
};

const response =  await axios.post(url,body,{headers} )
// debugger
return response.data;
    }
    catch(error){
       return createError(error);
    }
}