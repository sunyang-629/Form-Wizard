let completedSteps = 0;
let remainingSteps = 2;
let currentPage = 1; 
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

const validator = () => {
    const inputs = $('form--stage')[completedSteps].getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].required && checkIsEmpty(inputs[i].value)) {
            message = inputs[i].name + ' is necessary';
            addClassName(inputs[i], ' invalid');
            return false;
        }
        else if (!checkFormatValid(inputs[i])) {
            console.log(inputs[i].name);
            message = inputs[i].name + ' is invalid';
            addClassName(inputs[i], ' invalid');
            return false
        }
        else {
            removeClassName(inputs[i], ' invalid')
        }
    }
    return true;
}

const checkIsEmpty = value => {
    if (value.trim() === '') {
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
        case 'snumber':
            return !isNaN(input.value) && checkPositiveIntegerValid(parseFloat(input.value))
        default:
            return true;
    }
}

const checkEmailValid = value => {
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailFormat.test(value);
}

const checkPostcodeValid = value => {
    return (value >= 800 && value <= 7999)
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
    personalDetails.firstName = $$('firstName').value;
    personalDetails.lastName = $$('lastName').value;
    personalDetails.email = $$('email').value;
    personalDetails.phone = $$('phone').value;
    personalDetails.streetNumber = $$('streetNumber').value;
    personalDetails.streetName = $$('streetName').value;
    personalDetails.streetType = $$('streetType').value;
    personalDetails.suburb = $$('suburb').value;
    personalDetails.postcode = $$('postcode').value;
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
    ele.className += className;
}

const removeClassName = (ele, className) => {
    ele.className = ele.className.replace(className, '');
}

// const initialPage = () => {
//     setProgressBar(completedSteps)
// }

// initialPage();