const SERVER_URL = 'http://localhost:4000';

export function createURL(path) {
    return `${SERVER_URL}/${path}`;
}
export function createError(error) {

return{status:'error',error}
}

