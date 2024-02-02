import { MASTER_ACCOUNT, REGEX, ERROR_MESSAGE, $ } from './constants.js';
import { addErrorMsgToDuplicateInput, addErrorMsgToMismatchConfirm, signUpHandler } from './signup.js';

const isMaster = (email, password) => email === MASTER_ACCOUNT.EMAIL && password === MASTER_ACCOUNT.PASSWORD;
const isValid = {
  email: (email) => REGEX.EMAIL.test(email),
  password: (password) => REGEX.PASSWORD.test(password)
};

// 비어있는 인풋에 에러메시지 추가
const addErrorMsgToBlankInput = (e) => {
  const errorMsg = $('.input-error-msg', e.target.parentNode);

  if(e.target.value !== '') {
    e.target.classList.remove('js-input-profile-error');
    errorMsg.classList.add('hidden') ;
    return;
  }

  e.target.classList.add('js-input-profile-error');
  errorMsg.classList.remove('hidden');

  // input이 email인지 password인지 체크
  if(e.target.getAttribute('id') === 'email') {
    errorMsg.textContent = ERROR_MESSAGE.EMAIL.BLANK;
  }
  else {
    errorMsg.textContent = ERROR_MESSAGE.PASSWORD.BLANK;
  }
}

const addErrorMsgToInvalidInput = (e) => {
  if(e.target.value === '') return;

  const errorMsg = $('.input-error-msg', e.target.parentNode);
  const inputType = e.target.getAttribute('id');  // emailInput id : 'email', passwordInput id : 'password'
  
  if(isValid[`${inputType}`](e.target.value)) {
    e.target.classList.remove('js-input-profile-error');
    errorMsg.classList.add('hidden');
    return;
  }

  e.target.classList.add('js-input-profile-error');
  errorMsg.classList.remove('hidden');
  errorMsg.textContent = ERROR_MESSAGE[`${inputType.toUpperCase()}`].INVALID;

}

const addErrorMsgToIncorrectInput = (input) => {
  const errorMsg = $('.input-error-msg', input.parentNode);
  input.classList.add('js-input-profile-error');
  errorMsg.classList.remove('hidden');     
  
  // input이 email인지 password인지 체크
  if(input.getAttribute('id') === 'email') {
    errorMsg.textContent = ERROR_MESSAGE.EMAIL.INCORRECT;
  }
  else {
    errorMsg.textContent = ERROR_MESSAGE.PASSWORD.INCORRECT;
  }
}

const loginHandler = (e) => {
  e.preventDefault();

  const emailInput = $('.email').value;
  const passwordInput = $('.password').value;

  // 마스터 계정이 아닌 경우 일단 다 차단
  if(isMaster(emailInput, passwordInput)) {
    window.location.href = './folder.html';
  }

  addErrorMsgToIncorrectInput($('.email'));
  addErrorMsgToIncorrectInput($('.password'));
}

const togglePasswordVisibility = (e) => {
  const passwordInput = $('.input-profile', e.target.parentNode);
  e.target.classList.toggle('visibility');

  if(e.target.classList.contains('visibility')) {
    e.target.setAttribute('src', 'images/eye-on.svg');
    passwordInput.setAttribute('type', 'text');
    return;
  }

  e.target.setAttribute('src', 'images/eye-off.svg');
  passwordInput.setAttribute('type', 'password');  
}

// sign-in && sign-up handler
const eyeIcons = document.querySelectorAll('.eye-icon');
eyeIcons.forEach((eyeIcon) => eyeIcon.addEventListener('click', togglePasswordVisibility));

$('.email').addEventListener('blur', addErrorMsgToBlankInput);
$('.password').addEventListener('blur', addErrorMsgToBlankInput);
$('.email').addEventListener('blur', addErrorMsgToInvalidInput);

// only sign-in handler
if($('.login-form').classList.contains('sign-in')) {
  $('.login-form').addEventListener('submit', loginHandler);
}

// only sign-up handler
if($('.login-form').classList.contains('sign-up')) {
  $('.email').addEventListener('blur', addErrorMsgToDuplicateInput);
  $('.password').addEventListener('blur', addErrorMsgToInvalidInput);
  $('.password-confirm').addEventListener('blur', addErrorMsgToMismatchConfirm);
  $('.login-form').addEventListener('submit', signUpHandler);
}
