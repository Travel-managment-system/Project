function createError(error) {
return {status: 'error', error};
}

function createSuccess(data) {
return {status: 'success', data};
}

function createResult(data, error) {
if (error) 
    return createError(error);
else  
    return createSuccess(data);
}

module.exports = {
createError,
createSuccess,
createResult
};