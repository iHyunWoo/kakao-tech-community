window.onload = function () {
    addLoginButtonEventListener()
    addSignupButtonEventListener()
}

function addLoginButtonEventListener() {
    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();
        const emailAlert = document.getElementById('email-alert-message');
        const isValidEmail = validateEmail(email);

        if (isValidEmail) {
            emailAlert.style.visibility = 'hidden';
        } else {
            emailAlert.textContent = '올바른 이메일 주소 형식을 입력해주세요.';
            emailAlert.style.visibility = 'visible';
            return;
        }

        const password = document.getElementById('password').value.trim();
        const passwordAlert = document.getElementById('password-alert-message');
        const isValidPassword = validatePassword(password);

        if (password) {
            passwordAlert.style.visibility = 'hidden';
        } else {
            // 비밀번호가 비어있다면
            passwordAlert.textContent = '비밀번호를 입력해주세요';
            passwordAlert.style.visibility = 'visible';
            return;
        }

        if (isValidPassword) {
            passwordAlert.style.visibility = 'hidden';
        } else {
            passwordAlert.textContent = '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 특수문자를 각각 최소 1개씩 포함해야 합니다.';
            passwordAlert.style.visibility = 'visible';
            return;
        }

        // 후에 로그인 성공/실패 로직 추가
        if (true) {
            // 로그인 성공
            localStorage.setItem('isLoggedIn', true)
            window.location.href = '/pages/community/community.html'
        } else {
            passwordAlert.textContent = '아이디 또는 비밀번호를 확인해주세요.';
            passwordAlert.style.visibility = 'visible';
            return;
        }

    })
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,20}$/;
    return passwordRegex.test(password);
}

function addSignupButtonEventListener() {
    const signupButton = document.getElementById('signup-button');
    signupButton.addEventListener('click', function (event) {
        window.location.href = '/pages/signup/signup.html'
    })
}