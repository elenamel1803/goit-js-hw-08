import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('[name="email"]');
const message = document.querySelector('[name="message"]');
const LOCALSTORAGE_KEY = 'feedback-form-state';

const formData = {};

addForm();

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function addForm(e) {
    const savedMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (savedMessage) {
        if (savedMessage.email !== undefined) { 
            email.value = savedMessage.email;
        }
        if (savedMessage.message !== undefined) {
            message.value = savedMessage.message;
        }
    }
}
function onFormSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    console.log(formData);
}