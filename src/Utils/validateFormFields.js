import validator from 'validator'

function validateEmail(email) {
    if(!validator.isEmail(email)){
        return true;
    }
}

function validatePassword(password) {
    if(!validator.isStrongPassword(password)){
        return true;
    }
}

export {validateEmail, validatePassword};