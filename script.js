let completedSteps = 0;
// let remainingSteps = 2;
// let currentPage = 1; 
const totalSteps = 2;
const personalDetails = {};
let message = '';

const $$ = id => document.getElementById(id);
const $ = className => document.getElementsByClassName(className);

const handlePage = n => {
    if (validator()) {
        removeClassName($('form--stage')[completedSteps],' display')
        completedSteps += n;
        addClassName($('form--stage')[completedSteps],' display')
        setProgressBar(completedSteps)
    } else {
        console.log(message);
    }
}

const validator = (e) => {
    const inputs = $('form--stage')[completedSteps].getElementsByTagName('input');
    deleteAllErrorSpans();
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].required && checkIsEmpty(inputs[i].name,inputs[i].value)) {
            addClassName(inputs[i], ' invalid');
            addMessageToInput(inputs[i].name, message);
            return false;
        }
        else if (!checkFormatValid(inputs[i])) {
            message = inputs[i].name + ' is invalid';
            addMessageToInput(inputs[i].name, message);
            addClassName(inputs[i], ' invalid');
            e.preventDefault();
            return false
        }
        else {
            removeClassName(inputs[i], ' invalid')
        }
    }
    return true;
}

const checkIsEmpty = (name,value) => {
    if (value.trim() === '') {
        message = name + ' is necessary'
        return true
    } return false
}

const checkFormatValid = input => {
    switch (input.name) {
        case 'email':
            return checkEmailValid(input.value)
        case 'postcode':
            return !isNaN(input.value) && checkPostcodeValid(parseInt(input.value, 10))
        case 'phone':
            return checkPhoneValid(input.value)
        case 'street-number':
            return !isNaN(input.value) && checkPositiveIntegerValid(parseFloat(input.value))
        default:
            return !checkMultipleSpace(input.value);
    }
}

const checkMultipleSpace = value => {
    const multipleSpace = /\s{2}/;
    return multipleSpace.test(value);
}

const checkEmailValid = value => {
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailFormat.test(value);
}

const checkPostcodeValid = value => {
    const postcodeFormat = /^(0[8][0-9]{2})$|(^[1-7][0-9]{3})$/;
    return postcodeFormat.test(value);
}

const checkPhoneValid = value => {
    const phoneFormat = /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[23478]\)|0[23478])?( ?-?[0-9]){7,9}$/;
    return !value || phoneFormat.test(value);
}

const checkPositiveIntegerValid = value => {
    console.log(value);
    return Number.isInteger(value) && value > 0
}

const results = () => {
    collectDetails();
    writeResults();
}

const collectDetails = () => {
    personalDetails.firstName = $$('firstName-input').value;
    personalDetails.lastName = $$('lastName-input').value;
    personalDetails.email = $$('email-input').value;
    personalDetails.phone = $$('phone-input').value;
    personalDetails.streetNumber = $$('streetNumber-input').value;
    personalDetails.streetName = $$('streetName-input').value;
    personalDetails.streetType = $$('streetType-input').value;
    personalDetails.suburb = $$('suburb-input').value;
    personalDetails.postcode = $$('postcode-input').value;
    console.log(personalDetails);
}

const writeResults = () => {
    document.write('<h2>fullName: ' + personalDetails.firstName + ' ' + personalDetails.lastName + '</h2>')
    document.write('<h2>email: ' + personalDetails.email + '</h2>')
    document.write('<h2>phone: ' + (personalDetails.phone || 'not given') + '</h2>')
    document.write('<h2>address: ' + personalDetails.streetNumber + ' ' + personalDetails.streetName + ' ' + personalDetails.streetType + ' ' + personalDetails.suburb + ' ' + personalDetails.postcode + '</h2>')

}

const setProgressBar = step => {
    const progress = step / totalSteps;
    $$('progress').value = progress * 100 || 2
    $$('progress').innerHTML = progress * 100 + "%"
}

const addClassName = (ele, className) => {
    if (ele.className.indexOf(className) === -1) {
        ele.className += className;
    }
}

const removeClassName = (ele, className) => {
    ele.className = ele.className.replace(className, '');
}

const addMessageToInput = (name, message) => {
    const span = document.createElement('SPAN'); 
    const error = document.createTextNode(message);
    const ele = $$(name)
    span.appendChild(error);
    addClassName(span, 'error');
    ele.appendChild(span)
}

const deleteAllErrorSpans = () => {
    document.querySelectorAll('.error').forEach(error => {
        error.remove()
    })
}

document.querySelectorAll('.field').forEach(field => {
    field.addEventListener('focus', e => validator(e));
    field.addEventListener('input', e => validator(e));
})
document.querySelectorAll('.number').forEach(number => {
    number.addEventListener('keypress', e => {
        const digitFormat = /[0-9]+/;
        if (!digitFormat.test(e.key)) {
            e.preventDefault();
        }
    });
})
