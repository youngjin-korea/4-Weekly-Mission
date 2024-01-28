//이메일 유효성 검사 메서드
export function emailFormatCheck(email) {
  const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return email_regex.test(email);
}

/*파랑(focus), 빨강(error), 그레이(default) 색으로 border변경,
  각 상태에 따라서 error msg block,none 결정 매서드 */
export function inputBorderBlue(element) {
  element.style.outline = 'none';
  element.style.border = '1px solid #6d6afe';
}
export function inputBorderRed(inputElement, errorElement) {
  inputElement.style.border = '1px solid var(--Linkbrary-red,#FF5B56)';
  errorElement.style.display = 'block';
}
export function inputBorderGray(inputElement, errorElement) {
  inputElement.style.border = '1px solid var(--Linkbrary-gray20, #CCD5E3)';
  errorElement.style.display = 'none';
}

//로그인 기능 매서드
export function signIn(emailInput, pwInput, emailError, pwError, pwOnOffImg) {
  if (emailInput.value == 'test@codeit.com' && pwInput.value == 'codeit101') {
    window.location.href = './folder.html';
  } else {
    emailError.innerHTML = '이메일을 확인해 주세요.';
    pwError.innerHTML = '비밀번호를 확인해 주세요.';
    inputBorderRed(emailInput, emailError);
    pwOnOffImg.style.bottom = '2.9375rem';
    inputBorderRed(pwInput, pwError);
  }
}

// 이메일 에러 검사 메서드

// 1. 작성 되었는지, 유효한 이메일인지 검사
export function emailErrorCheck(inputElement, errorElement) {
  const emailValue = inputElement.value;
  if (!emailValue) {
    errorElement.innerHTML = '이메일을 입력해 주세요.';
    inputBorderRed(inputElement, errorElement);
  } else if (emailFormatCheck(emailValue) === false) {
    errorElement.innerHTML = '올바른 이메일 주소가 아닙니다.';
    inputBorderRed(inputElement, errorElement);
  } else {
    inputBorderGray(inputElement, errorElement);
  }
}
// 2. 회원가입에서 사용중인 이메일인지 검사(1번 내용 포함)
export function usingEmailCheck(emailInput, emailError) {
  const emailValue = emailInput.value;
  if (!emailValue) {
    emailError.innerHTML = '이메일을 입력해 주세요.';
    inputBorderRed(emailInput, emailError);
  } else if (emailFormatCheck(emailValue) === false) {
    emailError.innerHTML = '올바른 이메일 주소가 아닙니다.';
    inputBorderRed(emailInput, emailError);
  } else if (emailInput.value === 'test@codeit.com') {
    emailError.innerHTML = '이미 사용중인 이메일 입니다.';
    inputBorderRed(emailInput, emailError);
  } else {
    inputBorderGray(emailInput, emailError);
  }
}

//로그인시 비밀번호 에러 확인 메서드
export function signinPasswordErrorCheck(pwInput, pwError, pwOnOffImg) {
  const pwValue = pwInput.value;

  if (!pwValue) {
    pwError.innerHTML = '비밀번호를 입력해 주세요.';
    pwOnOffImg.style.bottom = '2.9375rem';
    inputBorderRed(pwInput, pwError);
  } else {
    pwOnOffImg.style.bottom = '1.1875rem';
    inputBorderGray(pwInput, pwError);
  }
}

//비밀번호 보여주기 스위치 메서드
//1.로그인 페이지용
export function passwordVisibleSwitch(isPasswordVisible, pwOnOffImg, pwInput) {
  if (!isPasswordVisible[0]) {
    pwOnOffImg.src = './icons/eyeson.png';
    pwInput.type = 'none';
    isPasswordVisible[0] = true;
  } else {
    pwOnOffImg.src = './icons/eyesoff.png';
    pwInput.type = 'password';
    isPasswordVisible[0] = false;
  }
}
//2.회원가입 페이지용(한 클릭으로 두 input 모두 제어)
export function signupPasswordVisibleSwitch(
  isPasswordVisible,
  pwOnOffImg,
  pwInput,
  pwInputRepeat
) {
  if (!isPasswordVisible[0]) {
    pwOnOffImg[0].src = './icons/eyeson.png';
    pwOnOffImg[1].src = './icons/eyeson.png';
    pwInput.type = 'none';
    pwInputRepeat.type = 'none';
    isPasswordVisible[0] = true;
  } else {
    pwOnOffImg[0].src = './icons/eyesoff.png';
    pwOnOffImg[1].src = './icons/eyesoff.png';
    pwInput.type = 'password';
    pwInputRepeat.type = 'password';
    isPasswordVisible[0] = false;
  }
}

//회원가입 비밀번호 값 에러 확인 메서드
export function signupPasswordErrorCheck(pwInput, pwError, pwOnOffImg) {
  const pwValue = pwInput.value;
  if (pwValue.length < 8 || Number(pwValue) || /^[a-zA-Z]+$/.test(pwValue)) {
    pwError.innerHTML = '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.';
    pwOnOffImg.style.bottom = '2.9375rem';
    inputBorderRed(pwInput, pwError);
  } else {
    pwOnOffImg.style.bottom = '1.1875rem';
    inputBorderGray(pwInput, pwError);
  }
}

//회원가입 비밀번호확인 일치 여부 메서드
export function signupPasswordCorrectCheck(
  pwInput,
  pwInputRepeat,
  pwError,
  pwOnOffImg
) {
  if (pwInput.value !== pwInputRepeat.value) {
    pwError.innerHTML = '비밀번호가 일치하지 않아요.';
    pwOnOffImg.style.bottom = '2.9375rem';
    inputBorderRed(pwInputRepeat, pwError);
  } else {
    pwOnOffImg.style.bottom = '1.1875rem';
    inputBorderGray(pwInputRepeat, pwError);
  }
}

//회원가입 버튼 동작 메서드
export function signUp(
  emailInput,
  pwInput,
  pwInputRepeat,
  emailError,
  pwError,
  pwRepeatError,
  pwOnOffImg
) {
  const checkList = [true, true, true];
  if (
    !emailInput.value ||
    emailFormatCheck(emailInput.value) === false ||
    emailInput.value === 'test@codeit.com'
  ) {
    emailError.innerHTML = '이메일을 확인해 주세요.';
    inputBorderRed(emailInput, emailError);
    checkList[0] = false;
  }
  if (
    pwInput.value.length < 8 ||
    Number(pwInput.value) ||
    /^[a-zA-Z]+$/.test(pwInput.value)
  ) {
    pwError.innerHTML = '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.';
    pwOnOffImg[0].style.bottom = '2.9375rem';
    inputBorderRed(pwInput, pwError);
    checkList[1] = false;
  }
  if (pwInput.value !== pwInputRepeat.value) {
    pwRepeatError.innerHTML = '비밀번호가 일치하는지 확인해주세요.';
    pwOnOffImg[1].style.bottom = '2.9375rem';
    inputBorderRed(pwInputRepeat, pwRepeatError);
    checkList[2] = false;
  }

  if (!checkList.includes(false)) {
    window.location.href = './folder.html';
  }
}