export const validate = {
    validatePassword(password) {
        const pattern = /^-?[\d.]+(?:e-?\d+)?$/; //eslint-disable-line 
        if (
            pattern.test(password) 
            && password.length >= 8 
            && password.length < 11 
            && password != ''
        ) {
            return true
        } else {
            return false
        }
    }
}