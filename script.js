let completedSteps = 0;
let remainingSteps = 2;
let currentPage = 1; 
const personalDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetNumber: "",
    streetName: "",
    streetType: "",
    suburb: "",
    postcode: "",
} 

// const $$ = id => document.getElementById(id);
const $ = className => document.getElementsByClassName(className);

const handlePage = n => {
        $('form--stage')[completedSteps].className = $('form--stage')[completedSteps].className.replace('display', '');
        completedSteps += n;
        $('form--stage')[completedSteps].className += 'display';
}
// const handlePage = n => {
//     if (validator()) {
//         $('form--stage')[completedSteps].className = $('form--stage')[completedSteps].className.replace('active', '');
//         completedSteps += n;
//         $('form--stage')[completedSteps].className += 'display';
//     } else {
//         alert('wrong')
//     }
// }

// const validator = () => {
//     const inputs = $('form--stage')[completedSteps].getElementsByTagName('input');
//     for (let i = 0; i < inputs.length; i++){
//         if (inputs[i].required && inputs[i].value === "") {
//             return false;
//         }
//         // } else {
//         //     console.log(inputs[i]);
//         //     switch (inputs[i].name) {
//         //         case 'postcode':
//         //             console.log(inputs[i]);
//         //             if (inputs[i].value < 0800 || inputs[i].value > 7999) {
//         //                 return false;
//         //             }
//         //     }
//         // }
//         // return true;
//     }
//     console.log(inputs);
// }