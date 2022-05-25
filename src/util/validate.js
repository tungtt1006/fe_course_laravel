/* eslint-disable */
function isPassword(password) {
    return password.length >= 8 && password.length < 11 && password != ''
}

function isEmail(email) {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return pattern.test(email) && email != ''
}

function validatePhoneNumber(phoneNumber) {
    const pattern = /^[0-9]+$/
    if (
        phoneNumber.length == 10
        && pattern.test(phoneNumber)
        && phoneNumber != ''
    ) {
        return true
    }
    return false

}

function validateName(name) {
    const pattern = /^[A-Za-z\s]+$/
    const str = removeAscent(name)
    if (
        pattern.test(str)
        && name != ''
    ) {
        return true
    }
    return false
}

function removeAscent (str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

export {
    isPassword,
    isEmail,
    validateName,
    validatePhoneNumber
}
