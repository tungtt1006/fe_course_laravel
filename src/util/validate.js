/* eslint-disable */ 
function validatePassword(password) {
    if ( 
        password.length >= 8 
        && password.length < 11 
        && password != ''
    ) {
        return true
    } 
    return false
    
}

function validateEmail(email) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (
        pattern.test(email)
        && email != ''
    ) {
        return true
    }
    return false
}

export {
    validatePassword,
    validateEmail
}