let completedSteps = 0;
let remainingSteps = 2;
let currentPage = 1; 
// const personalDetails = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     streetNumber: "",
//     streetName: "",
//     streetType: "",
//     suburb: "",
//     postcode: "",
// } 

const $$ = id => document.getElementById(id);
const $ = className => document.getElementsByClassName(className);

const handlePage = n => {
    if (validator()) {
        $('form--stage')[completedSteps].className = $('form--stage')[completedSteps].className.replace('display', '');
        completedSteps += n;
        $('form--stage')[completedSteps].className += 'display';
    } else {
        console.log('object');
    }
}

const validator = () => {
    const inputs = $('form--stage')[completedSteps].getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].required && checkIsEmpty(inputs[i].value)) {
            return false;
        }
        else if (!checkFormatValid(inputs[i])) {
            return false
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
            return checkPostcodeValid(parseInt(input.value,10))
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

const results = () => {
    const firstName = $$('fname').value;

    document.write('<h2>First Name: ' + firstName);
}